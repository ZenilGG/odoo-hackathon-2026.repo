package com.odoo_back.odoo_back.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDTO {

    // For Admin/HR Dashboard
    private Long totalEmployees;
    private Long presentToday;
    private Long absentToday;
    private Long pendingLeaveRequests;

    // For Employee Dashboard
    private Integer totalLeavesThisYear;
    private Integer usedLeaves;
    private Integer remainingLeaves;
    private String lastAttendanceStatus;
    private Integer presentDaysThisMonth;
}