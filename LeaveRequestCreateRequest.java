package com.odoo_back.odoo_back.dto;

import com.odoo_back.odoo_back.entity.LeaveRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveRequestCreateRequest {

   // @NotNull(message = "Leave type is required")
    private LeaveRequest.LeaveType leaveType;

    //@NotNull(message = "Start date is required")
    private LocalDate startDate;

   // @NotNull(message = "End date is required")
    private LocalDate endDate;

    private String remarks;
}