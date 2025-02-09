package com.hm.HospitalManagement.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "doctors")
public class Doctor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String specialization;
    
    @Column(nullable = false)
    private String email;
    
    @Column(nullable = false)
    private LocalDate dateOfJoining; 
    // private String dateOfJoining; 
    
    @Column(nullable = false)
    private int experience;

    // Constructors
    public Doctor() {}

    public Doctor(String name, String specialization, LocalDate dateOfJoining, int experience, String email ) {
    // public Doctor(String name, String specialization, String dateOfJoining, int experience, String email ) {
        this.name = name;
        this.specialization = specialization;
        this.dateOfJoining = dateOfJoining;
        this.experience = experience;
        this.email=email;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public LocalDate getDateOfJoining() { return dateOfJoining; }
    public void setDateOfJoining(LocalDate dateOfJoining) { this.dateOfJoining = dateOfJoining; }
    // public String getDateOfJoining() { return dateOfJoining; }
    // public void setDateOfJoining(String dateOfJoining) { this.dateOfJoining = "11111111"; }

    public int getExperience() { return experience; }
    public void setExperience(int experience) { this.experience = experience; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
