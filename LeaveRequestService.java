package com.odoo_back.odoo_back.service;

import com.odoo_back.odoo_back.dto.LeaveApprovalRequest;
import com.odoo_back.odoo_back.dto.LeaveRequestCreateRequest;
import com.odoo_back.odoo_back.dto.LeaveRequestDTO;
import com.odoo_back.odoo_back.entity.Employee;
import com.odoo_back.odoo_back.entity.LeaveRequest;
import com.odoo_back.odoo_back.entity.User;
import com.odoo_back.odoo_back.exception.ResourceNotFoundException;
import com.odoo_back.odoo_back.repo.EmployeeRepository;
import com.odoo_back.odoo_back.repo.LeaveRequestRepository;
import com.odoo_back.odoo_back.repo.UserRepository;
import com.odoo_back.odoo_back.security.CustomUserDetails;
import com.odoo_back.odoo_back.security.UnauthorizedException;
import com.odoo_back.odoo_back.util.EmailUtil;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailUtil emailUtil;

    private CustomUserDetails getCurrentUser() {
        return (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
    }

    private boolean isAdminOrHR() {
        CustomUserDetails userDetails = getCurrentUser();
        User.Role role = userDetails.getRole();
        return role == User.Role.ADMIN || role == User.Role.HR;
    }

    private LeaveRequestDTO convertToDTO(LeaveRequest leaveRequest) {
        return LeaveRequestDTO.builder()
                .id(leaveRequest.getId())
                .employeeId(leaveRequest.getEmployee().getId())
                .employeeName(leaveRequest.getEmployee().getFullName())
                .employeeIdCode(leaveRequest.getEmployee().getUser().getEmployeeId())
                .leaveType(leaveRequest.getLeaveType())
                .startDate(leaveRequest.getStartDate())
                .endDate(leaveRequest.getEndDate())
                .numberOfDays(leaveRequest.getNumberOfDays())
                .remarks(leaveRequest.getRemarks())
                .status(leaveRequest.getStatus())
                .approvedByName(leaveRequest.getApprovedBy() != null ?
                        leaveRequest.getApprovedBy().getEmail() : null)
                .adminComments(leaveRequest.getAdminComments())
                .approvedAt(leaveRequest.getApprovedAt())
                .createdAt(leaveRequest.getCreatedAt())
                .build();
    }

    // Apply for leave
    @Transactional
    public LeaveRequestDTO applyForLeave(LeaveRequestCreateRequest request) {
        CustomUserDetails userDetails = getCurrentUser();
        Employee employee = employeeRepository.findByUserId(userDetails.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        // Validate dates
//        if (request.getEndDate().isBefore(request.getStartDate())) {
//            throw new BadRequestException("End date cannot be before start date");
//        }

        // Check for overlapping leaves
        List<LeaveRequest> overlapping = leaveRequestRepository.findOverlappingLeaves(
                employee.getId(), request.getStartDate(), request.getEndDate());

//        if (!overlapping.isEmpty()) {
//            throw new BadRequestException("You already have a leave request for this period");
//        }

        LeaveRequest leaveRequest = LeaveRequest.builder()
                .employee(employee)
                .leaveType(request.getLeaveType())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .remarks(request.getRemarks())
                .status(LeaveRequest.LeaveStatus.PENDING)
                .build();

        leaveRequest = leaveRequestRepository.save(leaveRequest);
        return convertToDTO(leaveRequest);
    }

    // Get my leave requests
    public List<LeaveRequestDTO> getMyLeaveRequests() {
        CustomUserDetails userDetails = getCurrentUser();
        Employee employee = employeeRepository.findByUserId(userDetails.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        List<LeaveRequest> leaveRequests = leaveRequestRepository.findByEmployeeOrderByCreatedAtDesc(employee);

        return leaveRequests.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get all leave requests (Admin/HR only)
    public List<LeaveRequestDTO> getAllLeaveRequests(LeaveRequest.LeaveStatus status) {
//        if (!isAdminOrHR()) {
//            throw new UnauthorizedException("Only Admin/HR can view all leave requests");
//        }

        List<LeaveRequest> leaveRequests;
        if (status != null) {
            leaveRequests = leaveRequestRepository.findByStatusOrderByCreatedAtDesc(status);
        } else {
            leaveRequests = leaveRequestRepository.findAll();
        }

        return leaveRequests.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get pending leave requests (Admin/HR only)
    public List<LeaveRequestDTO> getPendingLeaveRequests() {
        return getAllLeaveRequests(LeaveRequest.LeaveStatus.PENDING);
    }

    // Approve or reject leave request (Admin/HR only)
    @Transactional
    public LeaveRequestDTO processLeaveRequest(Long leaveRequestId, LeaveApprovalRequest request) {
//        if (!isAdminOrHR()) {
//            throw new UnauthorizedException("Only Admin/HR can approve/reject leave requests");
//        }

        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveRequestId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found"));

//        if (leaveRequest.getStatus() != LeaveRequest.LeaveStatus.PENDING) {
//            throw new BadRequestException("Leave request has already been processed");
//        }

        CustomUserDetails userDetails = getCurrentUser();
//        User approver = userRepository.findById(userDetails.getUserId())
//                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        leaveRequest.setStatus(request.getStatus());
       // leaveRequest.setApprovedBy(approver);
        leaveRequest.setAdminComments(request.getAdminComments());
        leaveRequest.setApprovedAt(LocalDateTime.now());

        leaveRequest = leaveRequestRepository.save(leaveRequest);

        // Send email notification
        try {
            emailUtil.sendLeaveApprovalNotification(
                    leaveRequest.getEmployee().getUser().getEmail(),
                    request.getStatus().name(),
                    leaveRequest.getEmployee().getFullName()
            );
        } catch (Exception e) {
            System.err.println("Failed to send leave approval email: " + e.getMessage());
        }

        return convertToDTO(leaveRequest);
    }

    // Cancel leave request
    @Transactional
    public void cancelLeaveRequest(Long leaveRequestId) {
        CustomUserDetails userDetails = getCurrentUser();
        Employee employee = employeeRepository.findByUserId(userDetails.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveRequestId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found"));

        // Check if user owns this leave request
//        if (!leaveRequest.getEmployee().getId().equals(employee.getId()) && !isAdminOrHR()) {
//            throw new UnauthorizedException("You can only cancel your own leave requests");
//        }

//        if (leaveRequest.getStatus() != LeaveRequest.LeaveStatus.PENDING) {
//            throw new BadRequestException("Can only cancel pending leave requests");
//        }

        leaveRequestRepository.delete(leaveRequest);
    }
}
