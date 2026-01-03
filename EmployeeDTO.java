package com.odoo_back.odoo_back.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDTO {

    private Long id;
    private Long userId;
    private String employeeId;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private LocalDate dateOfBirth;
    private String nationalId;
    private String profilePictureUrl;

    // Job Details
    private String designation;
    private String department;
    private LocalDate joiningDate;
    private String employmentType;

    // Salary Structure (only for Admin/HR)
    private Double basicSalary;
    private Double allowances;
    private Double deductions;
    private Double netSalary;

    private String documents;
}
