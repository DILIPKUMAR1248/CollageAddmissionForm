package com.DilipMandal.collageFormFillup.service;

import com.DilipMandal.collageFormFillup.Dto.ApplicantDto;
import com.DilipMandal.collageFormFillup.entity.Applicant;
import com.DilipMandal.collageFormFillup.repository.ApplicantRepository;
import com.DilipMandal.collageFormFillup.utility.MappingUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service

public class ApplicantLogic {

    ApplicantRepository applicantRepository;

    @Autowired
    public ApplicantLogic(ApplicantRepository applicantRepository) {
        this.applicantRepository = applicantRepository;
    }

    public ApplicantDto save(ApplicantDto applicantDto) {
        MappingUtility mappingUtility = new MappingUtility();
        Applicant applicant = mappingUtility.toApplicant(applicantDto);
        Applicant savedApplicant = applicantRepository.save(applicant);
        return mappingUtility.toApplicantDto(savedApplicant);
    }




}
