package com.hm.HospitalManagement.controller;

import com.hm.HospitalManagement.Entity.Doctor;
import com.hm.HospitalManagement.Entity.Patient;
// import com.hm.HospitalManagement.Repository.DoctorRepository;
// import com.hm.HospitalManagement.Repository.DoctorRepository;
import com.hm.HospitalManagement.Repository.DoctorRepository;
import com.hm.HospitalManagement.Service.PatientService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

    // 
    @Autowired
    private DoctorRepository doctorRepository;
    // 

    @GetMapping("/signup")
    public String showSignupPage() {
        return "patient-signup";
    }

    @PostMapping("/signup")
    public String signup(@RequestParam String name,
                         @RequestParam int age,
                         @RequestParam String mobileNo,
                         @RequestParam String email,
                         @RequestParam String gender,
                         @RequestParam String guardianName,
                         @RequestParam String bloodGroup,
                         @RequestParam String password,
                         Model model) {
        Patient existingPatient = patientService.validatePatient(email, password);
        if (existingPatient != null) {
            model.addAttribute("error", "Email already exists!");
            return "patient-signup";
        }

        Patient patient = new Patient(name, age, mobileNo, email, gender, guardianName, bloodGroup, password);
        patientService.registerPatient(patient);
        return "redirect:/patient/login";
    }

    @GetMapping("/login")
    public String showLoginPage() {
        return "patient-login";
    }

    @PostMapping("/login")
    public String login(@RequestParam String email,
                        @RequestParam String password,
                        HttpSession session,
                        Model model) {
        Patient patient = patientService.validatePatient(email, password);

        if (patient != null) {
            session.setAttribute("patientName", patient.getName());
            return "redirect:/patient/dashboard";
        } else {
            model.addAttribute("error", "Wrong email or password");
            return "patient-login";
        }
    }

    @GetMapping("/dashboard")
    public String showDashboard(HttpSession session, Model model, HttpServletResponse response) {
        String patientName = (String) session.getAttribute("patientName");

        if (patientName == null) {
            return "redirect:/patient/login";
        }

        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "0");

        model.addAttribute("patientMessage", "Welcome " + patientName);
        // aaded ---------------------------
        List<Doctor> doctors = doctorRepository.findAll();
        model.addAttribute("doctors", doctors);
        // -------------------------------------------------

        return "patient-dashboard";
    }

    // @PostMapping("/book")
    // public String bookAppointment(@RequestParam String doctorEmail, HttpSession session, Model model) {
    //     String patientName = (String) session.getAttribute("patientName");
    //     if (patientName == null) {
    //         return "redirect:/patient/login";
    //     }

    //     // Fetch the doctor by email
    //     Doctor doctor = doctorRepository.findByEmail(doctorEmail);
    //     if (doctor == null) {
    //         model.addAttribute("error", "Doctor not found.");
    //         return "redirect:/patient/dashboard";
    //     }

    //     // Fetch patient details and display them to doctor
    //     Patient patient = patientService.findPatientByEmail(patientName);  // Ensure you have this method in PatientService
    //     model.addAttribute("patientDetails", patient);
    //     model.addAttribute("doctor", doctor);
            
    //     return "doctor-dashboard";
    // }
    @PostMapping("/book")
    public String bookAppointment(@RequestParam String doctorEmail, HttpSession session, Model model) {
        String patientName = (String) session.getAttribute("patientName");
        String patientEmail = (String) session.getAttribute("patientEmail");
        Patient patient = patientService.findPatientByEmail(patientEmail);

        if (patient != null) {
            patient.setDoctorEmail(doctorEmail);  // Associate the doctor with the patient
            patientService.registerPatient(patient);  // Update patient record
        }

        if (patientName == null) {
            return "redirect:/patient/login";
        }
    
        // Fetch the doctor by email
        Doctor doctor = doctorRepository.findByEmail(doctorEmail);
        if (doctor == null) {
            model.addAttribute("error", "Doctor not found.");
            return "redirect:/patient/dashboard";
        }
    
        // Fetch patient details and display them to the doctor
        // Patient patient = patientService.findPatientByEmail(patientName);  // Ensure you have this method in PatientService
        model.addAttribute("patientDetails", patient);
        model.addAttribute("doctor", doctor);
        
        // return "doctor-dashboard";    
        return "redirect:/patient/dashboard";
    }


    @GetMapping("/logout")
    public String logout(HttpSession session, HttpServletResponse response) {
        session.invalidate();

        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "0");

        return "redirect:/";
    }
}
