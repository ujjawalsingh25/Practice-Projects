package com.hm.HospitalManagement.Service;
import com.hm.HospitalManagement.Entity.Doctor;
import com.hm.HospitalManagement.Repository.DoctorLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorLoginService {

	 @Autowired
	    private DoctorLoginRepository doctorLoginRepository;

	    public Doctor findByEmail(String email) {
	        return doctorLoginRepository.findByEmail(email);
	    }
}




