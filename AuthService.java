package com.odoo_back.odoo_back.service;

import com.odoo_back.odoo_back.dto.ApiResponse;
import com.odoo_back.odoo_back.dto.AuthRequest;
import com.odoo_back.odoo_back.dto.AuthResponse;
import com.odoo_back.odoo_back.dto.SignUpRequest;
import com.odoo_back.odoo_back.entity.Employee;
import com.odoo_back.odoo_back.entity.User;
import com.odoo_back.odoo_back.repo.EmployeeRepository;
import com.odoo_back.odoo_back.repo.UserRepository;
import com.odoo_back.odoo_back.security.CustomUserDetails;
import com.odoo_back.odoo_back.util.EmailUtil;
import com.odoo_back.odoo_back.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmailUtil emailUtil;

    @Transactional
    public AuthResponse signUp(SignUpRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return AuthResponse.builder()
                    .message("Email already registered")
                    .build();
        }

        if (userRepository.existsByEmployeeId(request.getEmployeeId())) {
            return AuthResponse.builder()
                    .message("Employee ID already exists")
                    .build();
        }

        String verificationToken = UUID.randomUUID().toString();

        User user = User.builder()
                .employeeId(request.getEmployeeId())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .isEmailVerified(false)
                .emailVerificationToken(verificationToken)
                .isActive(true)
                .build();

        //user = userRepository.save(user);

        Employee employee = Employee.builder()
                .user(user)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .build();

        employeeRepository.save(employee);

        try {
            emailUtil.sendVerificationEmail(user.getEmail(), verificationToken);
        } catch (Exception ignored) {
        }

        return AuthResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .employeeId(user.getEmployeeId())
                .role(user.getRole())
                .message("Registration successful")
                .build();
    }

    public AuthResponse signIn(AuthRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        User user = userDetails.getUser();

        if (!Boolean.TRUE.equals(user.getIsEmailVerified())) {
            return AuthResponse.builder()
                    .message("Email not verified")
                    .build();
        }

        String token = jwtUtil.generateToken(userDetails);

        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .userId(user.getId())
                .email(user.getEmail())
                .employeeId(user.getEmployeeId())
                .role(user.getRole())
                .message("Login successful")
                .build();
    }

    @Transactional
    public ApiResponse<String> verifyEmail(String token) {

//        Optional<User> optionalUser =
//                userRepository.findByEmailVerificationToken(token);
//
////        if (optionalUser.isEmpty()) {
////            return ApiResponse.failure("Invalid token");
////        }
//
//        User user = optionalUser.get();
//        user.setIsEmailVerified(true);
//        user.setEmailVerificationToken(null);
//        userRepository.save(user);

        return ApiResponse.success("Email verified", "You can sign in");
    }
}
