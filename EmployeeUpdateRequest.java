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
public class EmployeeUpdateRequest {

    private String firstName;
    private String lastName;

   // @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String phone;

    private String address;
    private LocalDate dateOfBirth;
    private String profilePictureUrl;

    // Fields only Admin can update
    private String designation;
    private String department;
    private LocalDate joiningDate;
    private String employmentType;
    private Double basicSalary;
    private Double allowances;
    private Double deductions;
}