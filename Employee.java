package com.odoo_back.odoo_back.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "employees")
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Column(length = 20)
    private String phone;

    @Column(length = 500)
    private String address;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "national_id", unique = true, length = 50)
    private String nationalId;

    @Column(name = "profile_picture_url", length = 500)
    private String profilePictureUrl;

    // Job Details
    @Column(length = 100)
    private String designation;

    @Column(length = 100)
    private String department;

    @Column(name = "joining_date")
    private LocalDate joiningDate;

    @Column(name = "employment_type", length = 50)
    private String employmentType; // Full-time, Part-time, Contract

    // Salary Structure (Read-only for employees)
    @Column(name = "basic_salary")
    private Double basicSalary;

    private Double allowances;

    private Double deductions;

    @Column(columnDefinition = "TEXT")
    private String documents; // JSON string storing document URLs

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Helper method to get full name
    public String getFullName() {
        return firstName + " " + lastName;
    }

    // Helper method to calculate gross salary
    public Double getGrossSalary() {
        double basic = basicSalary != null ? basicSalary : 0.0;
        double allow = allowances != null ? allowances : 0.0;
        return basic + allow;
    }

    // Helper method to calculate net salary
    public Double getNetSalary() {
        double gross = getGrossSalary();
        double deduct = deductions != null ? deductions : 0.0;
        return gross - deduct;
    }
}