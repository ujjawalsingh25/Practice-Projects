package com.hm.HospitalManagement.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.hm.HospitalManagement.Entity.Admin;
import com.hm.HospitalManagement.Repository.AdminRepository;
import com.hm.HospitalManagement.Service.AdminService;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {

	@Mock
	private AdminRepository adminrepository;

	@InjectMocks
	private AdminService adminservice;

	@DisplayName("TEST- CREATE- ADMIN")
	@Test
	public void validateAdmin() {// arrange
		Admin admin = new Admin();

		admin.setId(1L);
		admin.setEmail("adminpph@gmail.com");
		admin.setPassword("pulsepoint@123");
		admin.setAdminName("Subhadip");

		// --------------------------------
		// when(adminrepository.save(admin)).thenReturn(admin);

		// // Act
		// Admin returnObject=this.adminservice.validateAdmin(admin.getAdminName(),admin.getPassword());
		// //Assert
		// // assertNotNull(returnObject);
		// assertEquals("1234",returnObject.getPassword());
		// --------------------------------

		// Mock the findByEmail method instead of save
		when(adminrepository.findByEmail("adminpph@gmail.com")).thenReturn(admin);

		// Act
		Admin returnObject = this.adminservice.validateAdmin(admin.getEmail(), admin.getPassword());

		// Assert
		assertNotNull(returnObject, "Admin should not be null when credentials are correct.");
		assertEquals("pulsepoint@123", returnObject.getPassword(), "Password should match the expected password.");
	}
}
