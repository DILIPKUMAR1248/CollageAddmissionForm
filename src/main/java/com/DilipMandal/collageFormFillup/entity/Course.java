package com.DilipMandal.collageFormFillup.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String courseName;

    @ManyToOne
    @JoinColumn(name = "applicant_id")
    private Applicant applicant;
    private  String priority;
    private String mode;


}
