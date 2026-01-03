package com.odoo_back.odoo_back.dto;


//import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayrollCreateRequest {

   // @NotNull(message = "Employee ID is required")
    private Long employeeId;

    //@NotNull(message = "Month is required")
   // @Min(value = 1, message = "Month must be between 1 and 12")
   // @Max(value = 12, message = "Month must be between 1 and 12")
    private Integer month;

   // @NotNull(message = "Year is required")
   // @Min(value = 2020, message = "Year must be 2020 or later")
    private Integer year;

    private Double bonuses;
    private Double deductions;
    private Integer workingDays;
    private Integer presentDays;
    private Integer leaveDays;
    private String remarks;
}