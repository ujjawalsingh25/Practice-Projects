package com.hm.HospitalManagement.controller;

import com.hm.HospitalManagement.Entity.Doctor;
import com.hm.HospitalManagement.Entity.Patient;
import com.hm.HospitalManagement.Repository.DoctorRepository;
import com.hm.HospitalManagement.Service.DoctorLoginService;
import com.hm.HospitalManagement.Service.PatientService;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/doctor")
public class DoctorLoginController {

    @Autowired
    private DoctorLoginService doctorLoginService;

    @Autowired
    private DoctorRepository doctorRepository; 

    @Autowired
    private PatientService PatientService;

    @GetMapping("/login")
    public String showLoginPage() {
        return "doctor-login";
    }

    // added --------------------
    @GetMapping("/signup")
    public String showSignupPage() {
        return "doctor-signup";
    }

    @PostMapping("/signup")
    public String signup(@RequestParam String name,
                         @RequestParam String email,
                         @RequestParam String password,
                         @RequestParam String specialization,
                         @RequestParam String dateOfJoining,
                         @RequestParam int experience,
                         Model model) {
        // Add new doctor to the database
        Doctor doctor = new Doctor(name, specialization, LocalDate.parse(dateOfJoining), experience, email);
        // Doctor doctor = new Doctor(name, specialization, dateOfJoining, experience, email);
        doctorRepository.save(doctor);  // Save the doctor to the database
        return "redirect:/doctor/login";  // Redirect to login after successful signup
    }
    // -----------------------

    @PostMapping("/login")
    public String login(@RequestParam String email,
                        @RequestParam String password,
                        HttpSession session,
                        Model model) { 
        Doctor doctor = doctorLoginService.findByEmail(email);
        // Doctor doctor = doctorLoginService.findByEmail("ujjawaldoctor@gmail.com");

        if (doctor != null && doctor.getDateOfJoining().toString().equals(password)) {
        // if (doctor != null && doctor.getDateOfJoining().toString().equals("11111111")) {
            session.setAttribute("doctorEmail", doctor.getEmail());
            session.setAttribute("doctorName", doctor.getName());
            // session.setAttribute("doctorName", "Ujjawal");
            // session.setAttribute("doctorEmail", "ujjawaldoctor@gmail.com");
            return "redirect:/doctor/dashboard";
        } else {
            model.addAttribute("error", "Invalid email or password");
            return "doctor-login";
            // return "redirect:/doctor/dashboard";
        }
    }

    @GetMapping("/dashboard")
    public String showDashboard(HttpSession session, Model model, HttpServletResponse response) {
        String doctorName = (String) session.getAttribute("doctorName");
        String doctorEmail = (String) session.getAttribute("doctorEmail");
        
        Doctor doctor = doctorLoginService.findByEmail(doctorEmail);

        if (doctorName == null) {
            doctorName = "Ujjawal";
            // doctorEmail = "ujjawaldoctor@gmail.com";
            // return "redirect:/doctor/login";
            return "redirect:/doctor/login"; 
        }
        if (doctor == null) {
            System.out.println("Doctor not found with email: " + doctorEmail);
        } else {
            System.out.println("Doctor found: " + doctor.getEmail());
        }

        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "0");

        model.addAttribute("doctorMessage", "Welcome Dr. " + doctorName);
        List<Patient> patients = PatientService.findPatientsByDoctorEmail(doctorEmail);
        model.addAttribute("patientDetails", patients);

        return "doctor-dashboard";
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
