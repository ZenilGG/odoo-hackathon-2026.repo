package com.odoo_back.odoo_back.repo;

import com.odoo_back.odoo_back.entity.Employee;
import com.odoo_back.odoo_back.entity.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PayrollRepository extends JpaRepository<Payroll, Long> {

    Optional<Payroll> findByEmployeeAndMonthAndYear(Employee employee, Integer month, Integer year);

    List<Payroll> findByEmployeeOrderByYearDescMonthDesc(Employee employee);

    List<Payroll> findByMonthAndYear(Integer month, Integer year);

    @Query("SELECT p FROM Payroll p WHERE p.employee.id = :employeeId ORDER BY p.year DESC, p.month DESC")
    List<Payroll> findByEmployeeIdOrderByDate(Long employeeId);

    @Query("SELECT p FROM Payroll p WHERE p.year = :year ORDER BY p.month DESC")
    List<Payroll> findByYear(Integer year);
}