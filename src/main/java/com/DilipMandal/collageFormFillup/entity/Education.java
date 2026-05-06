package com.DilipMandal.collageFormFillup.entity;


import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "education")
public class Education {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
     @ManyToOne
     @JoinColumn(name = "applicant_id")
     private  Applicant applicant;
     private LocalDate startDate;
     private LocalDate endDate;
     private String CollageName;
     private String degree;
     private String fieldOfStudy;
     private String grade;
     private String description;
}
