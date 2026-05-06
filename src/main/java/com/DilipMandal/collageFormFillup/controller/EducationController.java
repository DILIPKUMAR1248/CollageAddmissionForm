package com.DilipMandal.collageFormFillup.controller;

import com.DilipMandal.collageFormFillup.service.EducationLogic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/8080/education")
public class EducationController {

    EducationLogic educationLogic;
    @Autowired
    public EducationController(EducationLogic educationLogic) {
        this.educationLogic = educationLogic;
    }
}
