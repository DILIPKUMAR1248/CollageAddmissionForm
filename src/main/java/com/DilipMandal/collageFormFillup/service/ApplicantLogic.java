package com.DilipMandal.collageFormFillup.service;

import com.DilipMandal.collageFormFillup.Dto.ApplicantDto;
import com.DilipMandal.collageFormFillup.entity.Applicant;
import com.DilipMandal.collageFormFillup.repository.ApplicantRepository;
import com.DilipMandal.collageFormFillup.utility.ApplicantMappingUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service

public class ApplicantLogic {

    ApplicantRepository applicantRepository;

    @Autowired
    public ApplicantLogic(ApplicantRepository applicantRepository) {
        this.applicantRepository = applicantRepository;
    }

    public ApplicantDto save(ApplicantDto applicantDto) {
        ApplicantMappingUtility mappingUtility = new ApplicantMappingUtility();
        Applicant applicant = mappingUtility.toApplicant(applicantDto);
        Applicant savedApplicant = applicantRepository.save(applicant);
        return mappingUtility.toApplicantDto(savedApplicant);
    }

    public ApplicantDto getApplicant(int id) {
        Applicant applicant = applicantRepository.findById(id).orElse(null);
        if (applicant == null) {
            return null;
        }
        ApplicantMappingUtility mappingUtility = new ApplicantMappingUtility();
        return mappingUtility.toApplicantDto(applicant);
    }

    public void deleteApplicant(int id) {
        applicantRepository.deleteById(id);
    }
    public ApplicantDto updateApplicant(int id, ApplicantDto applicantDto) {
        Applicant applicant = applicantRepository.findById(id).orElse(null);
        if (applicant == null) {
            return null;
        }
        ApplicantMappingUtility mappingUtility = new ApplicantMappingUtility();
        Applicant updatedApplicant = mappingUtility.toApplicant(applicantDto);
        updatedApplicant.setId(id);
        Applicant savedApplicant = applicantRepository.save(updatedApplicant);
        return mappingUtility.toApplicantDto(savedApplicant);
    }

    public List<ApplicantDto> getAllApplicants(){
        List<Applicant> applicants=applicantRepository.findAll();
        List<ApplicantDto> applicantDtos = new ArrayList<>();
        ApplicantMappingUtility mappingUtility = new ApplicantMappingUtility();
        for(Applicant applicant:applicants){
            applicantDtos.add(mappingUtility.toApplicantDto(applicant));
        }
        return applicantDtos;
    }

    public ApplicantDto updateApplicantStatus(int id, String status) {
        Applicant applicant = applicantRepository.findById(id).orElse(null);
        if (applicant == null) {
            return null;
        }
        applicant.setStatus(status);
        Applicant savedApplicant = applicantRepository.save(applicant);
        ApplicantMappingUtility mappingUtility = new ApplicantMappingUtility();
        return mappingUtility.toApplicantDto(savedApplicant);
    }
}
