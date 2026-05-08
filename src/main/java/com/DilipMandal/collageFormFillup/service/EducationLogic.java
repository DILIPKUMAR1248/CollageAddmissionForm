package com.DilipMandal.collageFormFillup.service;

import com.DilipMandal.collageFormFillup.Dto.EducationDto;
import com.DilipMandal.collageFormFillup.entity.Education;
import com.DilipMandal.collageFormFillup.repository.EducationRepository;
import com.DilipMandal.collageFormFillup.utility.EducationMappingUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EducationLogic {

    EducationRepository educationRepository;
    @Autowired
    public EducationLogic(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    public EducationDto saveEducation(EducationDto educationDto) {
        Education education = EducationMappingUtility.toEducation(educationDto);
        Education savedEducation = educationRepository.save(education);
        return EducationMappingUtility.toEducationDto(savedEducation);
    }

    public EducationDto getEducation(int id) {
        Education education = educationRepository.findById(id).orElse(null);
        if (education == null) {
            return null;
        }
        return EducationMappingUtility.toEducationDto(education);
    }

    public EducationDto updateEducation(int id, EducationDto educationDto) {
        Education education = educationRepository.findById(id).orElse(null);
        if (education == null) {
            return null;
        }
        Education updatedEducation = EducationMappingUtility.toEducation(educationDto);
        updatedEducation.setId(id);
        Education savedEducation = educationRepository.save(updatedEducation);
        return EducationMappingUtility.toEducationDto(savedEducation);
    }

    public void deleteEducation(int id) {
        educationRepository.deleteById(id);
    }

    public List<EducationDto> getAllEducation() {
        List<Education> educations = educationRepository.findAll();
        List<EducationDto> educationDtos = new ArrayList<>();
        for (Education education : educations) {
            educationDtos.add(EducationMappingUtility.toEducationDto(education));
        }
        return educationDtos;
    }
}
