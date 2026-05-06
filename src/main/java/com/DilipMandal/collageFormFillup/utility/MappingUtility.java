package com.DilipMandal.collageFormFillup.utility;

import com.DilipMandal.collageFormFillup.Dto.ApplicantDto;
import com.DilipMandal.collageFormFillup.entity.Applicant;

public class MappingUtility {


    // Entity to DTO
    public ApplicantDto toApplicantDto(Applicant applicant) {
        ApplicantDto dto = new ApplicantDto();
        dto.setId(applicant.getId());
        dto.setFirst_name(applicant.getFirst_name());
        dto.setLast_name(applicant.getLast_name());
        dto.setEmail(applicant.getEmail());
        dto.setPhone(applicant.getPhone());
        dto.setDateOfBirth(applicant.getDateOfBirth());
        dto.setGender(applicant.getGender());
        dto.setAddress(applicant.getAddress());
        dto.setCity(applicant.getCity());
        dto.setState(applicant.getState());
        dto.setZip(applicant.getZip());
        dto.setCountry(applicant.getCountry());
        dto.setNationality(applicant.getNationality());
        return dto;
    }

    // DTO to Entity
    public Applicant toApplicant(ApplicantDto applicantDto) {
        Applicant applicant = new Applicant();
        applicant.setId(applicantDto.getId());
        applicant.setFirst_name(applicantDto.getFirst_name());
        applicant.setLast_name(applicantDto.getLast_name());
        applicant.setEmail(applicantDto.getEmail());
        applicant.setPhone(applicantDto.getPhone());
        applicant.setDateOfBirth(applicantDto.getDateOfBirth());
        applicant.setGender(applicantDto.getGender());
        applicant.setAddress(applicantDto.getAddress());
        applicant.setCity(applicantDto.getCity());
        applicant.setState(applicantDto.getState());
        applicant.setZip(applicantDto.getZip());
        applicant.setCountry(applicantDto.getCountry());
        applicant.setNationality(applicantDto.getNationality());
        return applicant;
    }
}
