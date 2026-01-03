package com.odoo_back.odoo_back.service;


import com.odoo_back.odoo_back.dto.AttendanceDTO;
import com.odoo_back.odoo_back.dto.AttendanceRequest;
import com.odoo_back.odoo_back.entity.Attendance;
import com.odoo_back.odoo_back.entity.Employee;
import com.odoo_back.odoo_back.entity.User;
import com.odoo_back.odoo_back.exception.ResourceNotFoundException;
import com.odoo_back.odoo_back.repo.AttendanceRepository;
import com.odoo_back.odoo_back.repo.EmployeeRepository;
import com.odoo_back.odoo_back.security.CustomUserDetails;
import com.odoo_back.odoo_back.security.UnauthorizedException;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    private CustomUserDetails getCurrentUser() {
        return (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
    }

    private boolean isAdminOrHR() {
        CustomUserDetails userDetails = getCurrentUser();
        User.Role role = userDetails.getRole();
        return role == User.Role.ADMIN || role == User.Role.HR;
    }

    private AttendanceDTO convertToDTO(Attendance attendance) {
        return AttendanceDTO.builder()
                .id(attendance.getId())
                .employeeId(attendance.getEmployee().getId())
                .employeeName(attendance.getEmployee().getFullName())
                .employeeIdCode(attendance.getEmployee().getUser().getEmployeeId())
                .date(attendance.getDate())
                .checkInTime(attendance.getCheckInTime())
                .checkOutTime(attendance.getCheckOutTime())
                .status(attendance.getStatus())
                .remarks(attendance.getRemarks())
                .build();
    }

    // Check-in for current user
    @Transactional
    public AttendanceDTO checkIn() {
        CustomUserDetails userDetails = getCurrentUser();
        Employee employee = employeeRepository.findByUserId(userDetails.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        LocalDate today = LocalDate.now();

        // Check if already checked in today
        Optional<Attendance> existing = attendanceRepository.findByEmployeeAndDate(employee, today);
//        if (existing.isPresent()) {
//            throw new BadRequestException("Already checked in today");
//        }

        Attendance attendance = Attendance.builder()
                .employee(employee)
                .date(today)
                .checkInTime(LocalDateTime.now())
                .status(Attendance.AttendanceStatus.PRESENT)
                .build();

        attendance = attendanceRepository.save(attendance);
        return convertToDTO(attendance);
    }

    // Check-out for current user
    @Transactional
    public AttendanceDTO checkOut() {
        CustomUserDetails userDetails = getCurrentUser();
        Employee employee = employeeRepository.findByUserId(userDetails.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        LocalDate today = LocalDate.now();

//        Attendance attendance = attendanceRepository.findByEmployeeAndDate(employee, today)
//                .orElseThrow(() -> new BadRequestException("No check-in found for today"));

//        if (attendance.getCheckOutTime() != null) {
//            throw new BadRequestException("Already checked out today");
//        }

//        attendance.setCheckOutTime(LocalDateTime.now());
//        attendance = attendanceRepository.save(attendance);

        return null;
    }

    // Mark attendance (Admin/HR only)
    @Transactional
    public AttendanceDTO markAttendance(Long employeeId, AttendanceRequest request) {
//        if (!isAdminOrHR()) {
//            throw new UnauthorizedException("Only Admin/HR can mark attendance");
//        }

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        // Check if attendance already exists for this date
        Optional<Attendance> existing = attendanceRepository.findByEmployeeAndDate(employee, request.getDate());
//        if (existing.isPresent()) {
//            throw new BadRequestException("Attendance already marked for this date");
//        }

        Attendance attendance = Attendance.builder()
                .employee(employee)
                .date(request.getDate())
                .checkInTime(request.getCheckInTime())
                .checkOutTime(request.getCheckOutTime())
                .status(request.getStatus())
                .remarks(request.getRemarks())
                .build();

        attendance = attendanceRepository.save(attendance);
        return convertToDTO(attendance);
    }

    // Get my attendance
    public List<AttendanceDTO> getMyAttendance(LocalDate startDate, LocalDate endDate) {
        CustomUserDetails userDetails = getCurrentUser();
        Employee employee = employeeRepository.findByUserId(userDetails.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        List<Attendance> attendances = attendanceRepository
                .findByEmployeeAndDateBetween(employee, startDate, endDate);

        return attendances.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get employee attendance (Admin/HR only)
    public List<AttendanceDTO> getEmployeeAttendance(Long employeeId, LocalDate startDate, LocalDate endDate) {
//        if (!isAdminOrHR()) {
//            throw new UnauthorizedException("Only Admin/HR can view other employees' attendance");
//        }

        List<Attendance> attendances = attendanceRepository
                .findEmployeeAttendanceInRange(employeeId, startDate, endDate);

        return attendances.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get all attendance for a date range (Admin/HR only)
    public List<AttendanceDTO> getAllAttendance(LocalDate startDate, LocalDate endDate) {
//        if (!isAdminOrHR()) {
//            throw new UnauthorizedException("Only Admin/HR can view all attendance");
//        }

        List<Attendance> attendances = attendanceRepository.findByDateBetween(startDate, endDate);

        return attendances.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Update attendance (Admin/HR only)
    @Transactional
    public AttendanceDTO updateAttendance(Long attendanceId, AttendanceRequest request) {
//        if (!isAdminOrHR()) {
//            throw new UnauthorizedException("Only Admin/HR can update attendance");
//        }

        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance record not found"));

        if (request.getCheckInTime() != null) {
            attendance.setCheckInTime(request.getCheckInTime());
        }
        if (request.getCheckOutTime() != null) {
            attendance.setCheckOutTime(request.getCheckOutTime());
        }
        if (request.getStatus() != null) {
            attendance.setStatus(request.getStatus());
        }
        if (request.getRemarks() != null) {
            attendance.setRemarks(request.getRemarks());
        }

        attendance = attendanceRepository.save(attendance);
        return convertToDTO(attendance);
    }

    // Delete attendance (Admin/HR only)
    @Transactional
    public void deleteAttendance(Long attendanceId) {
//        if (!isAdminOrHR()) {
//            throw new UnauthorizedException("Only Admin/HR can delete attendance");
//        }

        if (!attendanceRepository.existsById(attendanceId)) {
            throw new ResourceNotFoundException("Attendance record not found");
        }

        attendanceRepository.deleteById(attendanceId);
    }
}