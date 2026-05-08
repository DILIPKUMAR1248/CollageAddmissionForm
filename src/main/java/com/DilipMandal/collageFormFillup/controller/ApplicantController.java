package com.DilipMandal.collageFormFillup.controller;

import com.DilipMandal.collageFormFillup.Dto.ApplicantDto;
import com.DilipMandal.collageFormFillup.service.ApplicantLogic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/8080/v1/applicant")
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

    @PostMapping("/get/{id}")
    public ResponseEntity<ApplicantDto> getApplicant(@PathVariable int id) {
        ApplicantDto applicantDto1=applicantLogic.getApplicant(id);
        return new  ResponseEntity<>(applicantDto1,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteApplicant(@PathVariable int id) {
        applicantLogic.deleteApplicant(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApplicantDto> updateApplicant(@PathVariable int id, @RequestBody ApplicantDto applicantDto) {
        ApplicantDto applicantDto1 = applicantLogic.updateApplicant(id, applicantDto);
        return new ResponseEntity<>(applicantDto1, HttpStatus.OK);
    }


    @GetMapping("/get/all")
    public ResponseEntity<List<ApplicantDto>> getAllApplicants() {
        List<ApplicantDto> applicantDtos = applicantLogic.getAllApplicants();
        return new ResponseEntity<>(applicantDtos, HttpStatus.OK);

    }

    @PatchMapping("/status/{id}")
    public ResponseEntity<ApplicantDto> updateApplicantStatus(@PathVariable int id, @RequestBody String status) {
        ApplicantDto applicantDto1 = applicantLogic.updateApplicantStatus(id, status);
        return new ResponseEntity<>(applicantDto1, HttpStatus.OK);
    }









}
