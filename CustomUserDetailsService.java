package com.odoo_back.odoo_back.security;

import com.odoo_back.odoo_back.entity.User;
import com.odoo_back.odoo_back.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

      //  Optional<org.apache.catalina.User> optionalUser = userRepository.findByEmail(email);

//        if (optionalUser.isEmpty()) {
//            throw new UsernameNotFoundException("User not found: " + email);
//        }

//        User user = optionalUser.get();
      return null
              ;
    }
}
