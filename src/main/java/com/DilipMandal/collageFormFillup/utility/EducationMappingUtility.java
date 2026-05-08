package com.DilipMandal.collageFormFillup.utility;

import com.DilipMandal.collageFormFillup.Dto.EducationDto;
import com.DilipMandal.collageFormFillup.entity.Education;

public class EducationMappingUtility {

    public static Education toEducation(EducationDto educationDto) {
        Education education = new Education();
        education.setId(educationDto.getId());
        education.setApplicant(educationDto.getApplicant());
        education.setStartDate(educationDto.getStartDate());
        education.setEndDate(educationDto.getEndDate());
        education.setCollageName(educationDto.getCollageName());
        education.setDegree(educationDto.getDegree());
        education.setFieldOfStudy(educationDto.getFieldOfStudy());
        education.setGrade(educationDto.getGrade());
        education.setDescription(educationDto.getDescription());
        return education;
    }

    public static EducationDto toEducationDto(Education education) {
        EducationDto educationDto = new EducationDto();
        educationDto.setId(education.getId());
        educationDto.setApplicant(education.getApplicant());
        educationDto.setStartDate(education.getStartDate());
        educationDto.setEndDate(education.getEndDate());
        educationDto.setCollageName(education.getCollageName());
        educationDto.setDegree(education.getDegree());
        educationDto.setFieldOfStudy(education.getFieldOfStudy());
        educationDto.setGrade(education.getGrade());
        educationDto.setDescription(education.getDescription());
        return educationDto;
    }
}
