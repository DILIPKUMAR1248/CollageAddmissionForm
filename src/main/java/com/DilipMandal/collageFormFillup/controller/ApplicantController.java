package com.DilipMandal.collageFormFillup.controller;

import com.DilipMandal.collageFormFillup.Dto.ApplicantDto;
import com.DilipMandal.collageFormFillup.service.ApplicantLogic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("8080/v1/api/applicant")
public class ApplicantController {

    ApplicantLogic applicantLogic;
    @Autowired
    public ApplicantController(ApplicantLogic applicantLogic) {
        this.applicantLogic = applicantLogic;
    }

    @PostMapping("/save")
    public ResponseEntity<ApplicantDto> saveApplicant(@RequestBody ApplicantDto applicantDto) {

        ApplicantDto applicantDto1=applicantLogic.save(applicantDto);
        return new  ResponseEntity<>(applicantDto1,HttpStatus.CREATED);
    }






}
