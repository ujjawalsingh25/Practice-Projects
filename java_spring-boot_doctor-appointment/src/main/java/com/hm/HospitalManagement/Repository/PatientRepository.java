package com.hm.HospitalManagement.Repository;

import com.hm.HospitalManagement.Entity.Patient;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Patient findByEmail(String email);  // Find Patient by Email for Login
    
    List<Patient> findByDoctorEmail(String doctorEmail);
}
