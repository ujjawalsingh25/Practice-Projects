package com.hm.HospitalManagement.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hm.HospitalManagement.Entity.Admin;
import com.hm.HospitalManagement.Repository.AdminRepository;

@Service
public class AdminService {
	private static final Logger log = LoggerFactory.getLogger(AdminService.class);
    @Autowired
    private AdminRepository adminRepository;

    public Admin validateAdmin(String email, String password) {
    	log.info("Admin Method:{}",email,password);
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null && admin.getPassword().equals(password)) {
            return admin; // Return the admin object
        }
        return null;
    }
}