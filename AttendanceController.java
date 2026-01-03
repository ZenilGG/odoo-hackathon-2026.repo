package com.odoo_back.odoo_back.controller;


import com.odoo_back.odoo_back.dto.ApiResponse;
import com.odoo_back.odoo_back.dto.AttendanceDTO;
import com.odoo_back.odoo_back.dto.AttendanceRequest;
import com.odoo_back.odoo_back.service.AttendanceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Attendance", description = "Attendance tracking and management APIs")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/checkin")
    @Operation(summary = "Check-in", description = "Mark check-in for current user")
    public ResponseEntity<ApiResponse<AttendanceDTO>> checkIn() {
        AttendanceDTO attendance = attendanceService.checkIn();
        return ResponseEntity.ok(ApiResponse.success("Checked in successfully", attendance));
    }

    @PostMapping("/checkout")
    @Operation(summary = "Check-out", description = "Mark check-out for current user")
    public ResponseEntity<ApiResponse<AttendanceDTO>> checkOut() {
        AttendanceDTO attendance = attendanceService.checkOut();
        return ResponseEntity.ok(ApiResponse.success("Checked out successfully", attendance));
    }

    @PostMapping("/mark/{employeeId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    @Operation(summary = "Mark attendance", description = "Mark attendance for an employee (Admin/HR only)")
    public ResponseEntity<ApiResponse<AttendanceDTO>> markAttendance(
            @PathVariable Long employeeId,
            @Valid @RequestBody AttendanceRequest request) {
        AttendanceDTO attendance = attendanceService.markAttendance(employeeId, request);
        return ResponseEntity.ok(ApiResponse.success("Attendance marked successfully", attendance));
    }

    @GetMapping("/me")
    @Operation(summary = "Get my attendance", description = "Get attendance records for current user")
    public ResponseEntity<ApiResponse<List<AttendanceDTO>>> getMyAttendance(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        //List<AttendanceDTO> attendance = attendanceService.getMyAttendance(startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success("Attendance retrieved successfully", null));
    }

    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    @Operation(summary = "Get employee attendance", description = "Get attendance records for specific employee (Admin/HR only)")
    public ResponseEntity<ApiResponse<List<AttendanceDTO>>> getEmployeeAttendance(
            @PathVariable Long employeeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<AttendanceDTO> attendance = attendanceService.getEmployeeAttendance(employeeId, startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success("Attendance retrieved successfully", attendance));
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    @Operation(summary = "Get all attendance", description = "Get all attendance records for date range (Admin/HR only)")
    public ResponseEntity<ApiResponse<List<AttendanceDTO>>> getAllAttendance(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<AttendanceDTO> attendance = attendanceService.getAllAttendance(startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success("Attendance retrieved successfully", attendance));
    }

    @PutMapping("/{attendanceId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    @Operation(summary = "Update attendance", description = "Update attendance record (Admin/HR only)")
    public ResponseEntity<ApiResponse<AttendanceDTO>> updateAttendance(
            @PathVariable Long attendanceId,
            @Valid @RequestBody AttendanceRequest request) {
       // AttendanceDTO attendance = attendanceService.updateAttendance(attendanceId, request);
        return ResponseEntity.ok(ApiResponse.success("Attendance updated successfully", null));
    }

    @DeleteMapping("/{attendanceId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    @Operation(summary = "Delete attendance", description = "Delete attendance record (Admin/HR only)")
    public ResponseEntity<ApiResponse<String>> deleteAttendance(@PathVariable Long attendanceId) {
       // attendanceService.deleteAttendance(attendanceId);
        return ResponseEntity.ok(ApiResponse.success("Attendance deleted successfully", null));
    }
}