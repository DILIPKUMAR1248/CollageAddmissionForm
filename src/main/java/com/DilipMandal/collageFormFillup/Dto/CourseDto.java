package com.DilipMandal.collageFormFillup.Dto;

import com.DilipMandal.collageFormFillup.entity.Applicant;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class CourseDto {

    private int id;
    private String courseName;
    private Applicant applicant;
    private  String priority;
    private String mode;
}
