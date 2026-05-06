package com.DilipMandal.collageFormFillup.controller;

import com.DilipMandal.collageFormFillup.service.CourseLogic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/8080/course")
public class CourseController {

    CourseLogic courseLogic;
    @Autowired
    public CourseController(CourseLogic courseLogic) {
        this.courseLogic = courseLogic;
    }
}
