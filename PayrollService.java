package com.odoo_back.odoo_back.service;

import com.odoo_back.odoo_back.dto.PayrollCreateRequest;
import com.odoo_back.odoo_back.dto.PayrollDTO;
import com.odoo_back.odoo_back.entity.Employee;
import com.odoo_back.odoo_back.entity.Payroll;
import com.odoo_back.odoo_back.entity.User;
import com.odoo_back.odoo_back.exception.ResourceNotFoundException;
import com.odoo_back.odoo_back.repo.EmployeeRepository;
import com.odoo_back.odoo_back.repo.PayrollRepository;
import com.odoo_back.odoo_back.security.CustomUserDetails;
import com.odoo_back.odoo_back.security.UnauthorizedException;
import com.odoo_back.odoo_back.util.EmailUtil;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PayrollService {

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

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

    private PayrollDTO convertToDTO(Payroll payroll) {
        return PayrollDTO.builder()
                .id(payroll.getId())
                .employeeId(payroll.getEmployee().getId())
                .employeeName(payroll.getEmployee().getFullName())
                .employeeIdCode(payroll.getEmployee().getUser().getEmployeeId())
                .month(payroll.getMonth())
                .year(payroll.getYear())
                .basicSalary(payroll.getBasicSalary())
                .allowances(payroll.getAllowances())
                .bonuses(payroll.getBonuses())
                .deductions(payroll.getDeductions())
                .grossSalary(payroll.getGrossSalary())
                .netSalary(payroll.getNetSalary())
                .workingDays(payroll.getWorkingDays())
                .presentDays(payroll.getPresentDays())
                .leaveDays(payroll.getLeaveDays())
                .isPaid(payroll.getIsPaid())
                .paymentDate(payroll.getPaymentDate())
                .remarks(payroll.getRemarks())
                .build();
    }

    // Create payroll (Admin/HR only)
    @Transactional
    public PayrollDTO createPayroll(PayrollCreateRequest request) {
//        if (!isAdminOrHR()) {
//            throw new UnauthorizedException("Only Admin/HR can create payroll");
//        }

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        // Check if payroll already exists for this month and year
        Optional<Payroll> existing = payrollRepository.findByEmployeeAndMonthAndYear(
                employee, request.getMonth(), request.getYear());
//
//        if (existing.isPresent()) {
//            throw new BadRequestException("Payroll already exists for this month and year");
//        }

        // Calculate net salary
        Double basicSalary = employee.getBasicSalary() != null ? employee.getBasicSalary() : 0.0;
        Double allowances = employee.getAllowances() != null ? employee.getAllowances() : 0.0;
        Double bonuses = request.getBonuses() != null ? request.getBonuses() : 0.0;
        Double deductions = request.getDeductions() != null ? request.getDeductions() : 0.0;

        Double netSalary = basicSalary + allowances + bonuses - deductions;

        Payroll payroll = Payroll.builder()
                .employee(employee)
                .month(request.getMonth())
                .year(request.getYear())
                .basicSalary(basicSalary)
                .allowances(allowances)
                .bonuses(bonuses)
                .deductions(deductions)
                .netSalary(netSalary)
                .workingDays(request.getWorkingDays())
                .presentDays(request.getPresentDays())
                .leaveDays(request.getLeaveDays())
                .isPaid(false)
                .remarks(request.getRemarks())
                .build();

        payroll = payrollRepository.save(payroll);

        // Send email notification
        try {
            String monthName = Month.of(request.getMonth()).name();
            emailUtil.sendPayrollNotification(
                    employee.getUser().getEmail(),
                    employee.getFullName(),
                    monthName,
                    request.getYear().toString()
            );
        } catch (Exception e) {
            System.err.println("Failed to send payroll notification: " + e.getMessage());
        }

        return convertToDTO(payroll);
    }

}