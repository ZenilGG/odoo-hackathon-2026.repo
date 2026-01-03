package com.odoo_back.odoo_back.dto;


import com.odoo_back.odoo_back.entity.LeaveRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveApprovalRequest {

   // @NotNull(message = "Status is required")
    private LeaveRequest.LeaveStatus status;

    private String adminComments;
}