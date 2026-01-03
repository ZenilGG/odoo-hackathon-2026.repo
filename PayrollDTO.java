package com.odoo_back.odoo_back.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayrollDTO {

    private Long id;
    private Long employeeId;
    private String employeeName;
    private String employeeIdCode;
    private Integer month;
    private Integer year;
    private Double basicSalary;
    private Double allowances;
    private Double bonuses;
    private Double deductions;
    private Double grossSalary;
    private Double netSalary;
    private Integer workingDays;
    private Integer presentDays;
    private Integer leaveDays;
    private Boolean isPaid;
    private LocalDateTime paymentDate;
    private String remarks;
}