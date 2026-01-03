package com.odoo_back.odoo_back.security;

import com.odoo_back.odoo_back.dto.EmployeeDTO;
import com.odoo_back.odoo_back.dto.EmployeeUpdateRequest;
import com.odoo_back.odoo_back.entity.Employee;
import com.odoo_back.odoo_back.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    // ===== Dummy in-memory storage =====
    private final Map<Long, Employee> employeeStore = new HashMap<>();
    private final Map<Long, User> userStore = new HashMap<>();

    // ===== Constructor: preload dummy data =====
    public EmployeeService() {
        User admin = User.builder()
                .id(1L)
                .email("admin@test.com")
                //.role("ADMIN")
                .isActive(true)
                .build();

        Employee emp = Employee.builder()
                .id(1L)
                .firstName("John")
                .lastName("Doe")
                .designation("Developer")
                .department("IT")
                .basicSalary(50000.0)
                .user(admin)
                .build();

        userStore.put(1L, admin);
        employeeStore.put(1L, emp);
    }

    // ===== Fake current user =====
    private User getCurrentUser() {
        return userStore.get(1L); // always admin
    }

    private boolean isAdmin() {
        return "ADMIN".equals(getCurrentUser().getRole());
    }

    // ===== Convert to DTO =====
    private EmployeeDTO convertToDTO(Employee employee, boolean includeSalary) {
        EmployeeDTO dto = EmployeeDTO.builder()
                .id(employee.getId())
                .userId(employee.getUser().getId())
                .email(employee.getUser().getEmail())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .designation(employee.getDesignation())
                .department(employee.getDepartment())
                .build();

        if (includeSalary) {
            dto.setBasicSalary(employee.getBasicSalary());
        }

        return dto;
    }

    // ===== Get employee by ID =====
    public EmployeeDTO getEmployeeById(Long employeeId) {
        Employee employee = employeeStore.get(employeeId);
        if (employee == null) {
            return null;
        }
        return convertToDTO(employee, isAdmin());
    }

    // ===== Get all employees =====
    public List<EmployeeDTO> getAllEmployees() {
        return employeeStore.values().stream()
                .map(emp -> convertToDTO(emp, isAdmin()))
                .collect(Collectors.toList());
    }

    // ===== Update employee =====
    @Transactional
    public EmployeeDTO updateEmployee(Long employeeId, EmployeeUpdateRequest request) {
        Employee employee = employeeStore.get(employeeId);
        if (employee == null) {
            return null;
        }

        if (request.getFirstName() != null) {
            employee.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            employee.setLastName(request.getLastName());
        }
        if (request.getDesignation() != null) {
            employee.setDesignation(request.getDesignation());
        }
        if (request.getDepartment() != null) {
            employee.setDepartment(request.getDepartment());
        }

        employeeStore.put(employeeId, employee);
        return convertToDTO(employee, isAdmin());
    }

    // ===== Delete (soft) employee =====
    @Transactional
    public boolean deleteEmployee(Long employeeId) {
        Employee employee = employeeStore.get(employeeId);
        if (employee == null) {
            return false;
        }

        employee.getUser().setIsActive(false);
        return true;
    }
}
