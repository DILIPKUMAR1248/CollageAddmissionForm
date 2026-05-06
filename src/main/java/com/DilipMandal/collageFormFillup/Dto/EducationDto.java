package com.DilipMandal.collageFormFillup.Dto;

import com.DilipMandal.collageFormFillup.entity.Applicant;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EducationDto {
    private int id;
    private Applicant applicant;
    private LocalDate startDate;
    private LocalDate endDate;
    private String CollageName;
    private String degree;
    private String fieldOfStudy;
    private String grade;
    private String description;
}
