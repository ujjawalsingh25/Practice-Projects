package com.hm.HospitalManagement.Service;

import java.util.List;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hm.HospitalManagement.Entity.Patient;
import com.hm.HospitalManagement.Repository.PatientRepository;

@Service
public class PatientService {
	// private static final Logger log = LoggerFactory.getLogger(PatientService.class);
    @Autowired
    private PatientRepository patientRepository;

    // Register a new patient
    public void registerPatient(Patient patient) {
        patientRepository.save(patient);
    }

    public Patient findPatientByEmail(String email) {
        return patientRepository.findByEmail(email); // Make sure you have this method implemented
    }

    // Validate Patient Login
    public Patient validatePatient(String email, String password) {
        Patient patient = patientRepository.findByEmail(email);
        if (patient != null && patient.getPassword().equals(password)) {
            return patient;  // Login Successful
        }
        return null;  // Login Failed
    }

    public List<Patient> findPatientsByDoctorEmail(String doctorEmail) {
        return patientRepository.findByDoctorEmail(doctorEmail);
    }
}