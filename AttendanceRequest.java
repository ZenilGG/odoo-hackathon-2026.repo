package com.odoo_back.odoo_back.dto;

import com.odoo_back.odoo_back.entity.Attendance;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceRequest {

   // @NotNull(message = "Date is required")
    private LocalDate date;

    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;

    //@NotNull(message = "Status is required")
    private Attendance.AttendanceStatus status;

    private String remarks;
}
