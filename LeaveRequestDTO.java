package com.odoo_back.odoo_back.dto;


import com.odoo_back.odoo_back.entity.LeaveRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveRequestDTO {

    private Long id;
    private Long employeeId;
    private String employeeName;
    private String employeeIdCode;
    private LeaveRequest.LeaveType leaveType;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long numberOfDays;
    private String remarks;
    private LeaveRequest.LeaveStatus status;
    private String approvedByName;
    private String adminComments;
    private LocalDateTime approvedAt;
    private LocalDateTime createdAt;
}

