package com.odoo_back.odoo_back.controller;


import com.odoo_back.odoo_back.dto.ApiResponse;
import com.odoo_back.odoo_back.dto.EmployeeDTO;
import com.odoo_back.odoo_back.dto.EmployeeUpdateRequest;
import com.odoo_back.odoo_back.security.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Employee", description = "Employee profile management APIs")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/me")
    @Operation(summary = "Get my profile", description = "Get current logged-in user's profile")
    public ResponseEntity<ApiResponse<EmployeeDTO>> getMyProfile() {
        // EmployeeDTO employee = employeeService.getEmployeeById(employeeService);
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully",null));
    }

    @GetMapping("/{employeeId}")
    @Operation(summary = "Get employee by ID", description = "Get employee profile by ID (Admin/HR or own profile)")
    public ResponseEntity<ApiResponse<EmployeeDTO>> getEmployeeById(@PathVariable Long employeeId) {
        EmployeeDTO employee = employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(ApiResponse.success("Employee retrieved successfully", employee));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    @Operation(summary = "Get all employees", description = "Get list of all employees (Admin/HR only)")
    public ResponseEntity<ApiResponse<List<EmployeeDTO>>> getAllEmployees() {
        List<EmployeeDTO> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(ApiResponse.success("Employees retrieved successfully", employees));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    @Operation(summary = "Search employees", description = "Search employees by name or employee ID (Admin/HR only)")
    public ResponseEntity<ApiResponse<List<EmployeeDTO>>> searchEmployees(@RequestParam String keyword) {
        //List<EmployeeDTO> employees = employeeService.searchEmployees(keyword);
        return ResponseEntity.ok(ApiResponse.success("Search results retrieved", null
        ));
    }

    @PutMapping("/{employeeId}")
    @Operation(summary = "Update employee profile", description = "Update employee profile (limited fields for employees, all fields for Admin/HR)")
    public ResponseEntity<ApiResponse<EmployeeDTO>> updateEmployee(
            @PathVariable Long employeeId,
            @Valid @RequestBody EmployeeUpdateRequest request) {
        EmployeeDTO employee = employeeService.updateEmployee(employeeId, request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", employee));
    }

    @DeleteMapping("/{employeeId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    @Operation(summary = "Delete employee", description = "Deactivate employee account (Admin/HR only)")
    public ResponseEntity<ApiResponse<String>> deleteEmployee(@PathVariable Long employeeId) {
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok(ApiResponse.success("Employee deactivated successfully", null));
    }
}