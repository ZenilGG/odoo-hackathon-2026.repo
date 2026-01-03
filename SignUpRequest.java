package com.odoo_back.odoo_back.dto;


import com.odoo_back.odoo_back.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpRequest {

    //@NotBlank(message = "Employee ID is required")
    //@Size(min = 3, max = 50, message = "Employee ID must be between 3 and 50 characters")
    private String employeeId;

    //@NotBlank(message = "Email is required")
   // @Email(message = "Invalid email format")
    private String email;

   // @NotBlank(message = "Password is required")
  //  @Size(min = 8, message = "Password must be at least 8 characters")
  //  @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$",
        //    message = "Password must contain at least one digit, one lowercase, one uppercase, and one special character")
    private String password;

   //@NotNull(message = "Role is required")
    private User.Role role;

   // @NotBlank(message = "First name is required")
    private String firstName;

    //@NotBlank(message = "Last name is required")
    private String lastName;
}