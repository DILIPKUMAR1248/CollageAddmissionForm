package com.DilipMandal.collageFormFillup.controller;

import com.DilipMandal.collageFormFillup.Dto.EducationDto;
import com.DilipMandal.collageFormFillup.service.EducationLogic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/8080/v1/education")
public class EducationController {

    EducationLogic educationLogic;
    @Autowired
    public EducationController(EducationLogic educationLogic) {
        this.educationLogic = educationLogic;
    }

    @PostMapping("/save")
    public ResponseEntity<EducationDto> createEducation(@RequestBody EducationDto educationDto) {
        EducationDto savedEducation = educationLogic.saveEducation(educationDto);
        return new ResponseEntity<>(savedEducation, HttpStatus.CREATED);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<EducationDto> getEducation(@PathVariable int id) {
        EducationDto educationDto = educationLogic.getEducation(id);
        return new ResponseEntity<>(educationDto, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<EducationDto> updateEducation(@PathVariable int id, @RequestBody EducationDto educationDto) {
        EducationDto updatedEducation = educationLogic.updateEducation(id, educationDto);
        return new ResponseEntity<>(updatedEducation, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable int id) {
        educationLogic.deleteEducation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<EducationDto>> getAllEducation() {
        List<EducationDto> educationDtos = educationLogic.getAllEducation();
        return new ResponseEntity<>(educationDtos, HttpStatus.OK);
    }
}
