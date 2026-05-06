package com.DilipMandal.collageFormFillup.service;

import com.DilipMandal.collageFormFillup.repository.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EducationLogic {

    EducationRepository educationRepository;
    @Autowired
    public EducationLogic(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }
}
