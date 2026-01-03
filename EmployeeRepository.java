package com.odoo_back.odoo_back.repo;

import com.odoo_back.odoo_back.entity.Employee;
import com.odoo_back.odoo_back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByUser(User user);

    Optional<Employee> findByUserId(Long userId);

    List<Employee> findByDepartment(String department);

    @Query("SELECT e FROM Employee e WHERE LOWER(e.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(e.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(e.user.employeeId) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Employee> searchEmployees(String keyword);

    boolean existsByNationalId(String nationalId);
}