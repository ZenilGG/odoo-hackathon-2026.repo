package com.odoo_back.odoo_back.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailUtil {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendVerificationEmail(String toEmail, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Email Verification - Dayflow HRMS");
        message.setText("Welcome to Dayflow HRMS!\n\n" +
                "Please verify your email by using this token: " + token + "\n\n" +
                "If you didn't create an account, please ignore this email.");

        mailSender.send(message);
    }

    public void sendLeaveApprovalNotification(String toEmail, String status, String employeeName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Leave Request " + status + " - Dayflow HRMS");
        message.setText("Dear " + employeeName + ",\n\n" +
                "Your leave request has been " + status.toLowerCase() + ".\n\n" +
                "Please check your dashboard for more details.\n\n" +
                "Best regards,\nDayflow HRMS Team");

        mailSender.send(message);
    }

    public void sendPayrollNotification(String toEmail, String employeeName, String month, String year) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Payroll Generated - " + month + " " + year);
        message.setText("Dear " + employeeName + ",\n\n" +
                "Your payroll for " + month + " " + year + " has been generated.\n\n" +
                "Please check your dashboard to view the details.\n\n" +
                "Best regards,\nDayflow HRMS Team");

        mailSender.send(message);
    }
}
