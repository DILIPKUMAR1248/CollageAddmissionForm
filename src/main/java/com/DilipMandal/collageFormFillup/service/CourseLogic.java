package com.DilipMandal.collageFormFillup.service;
import com.DilipMandal.collageFormFillup.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseLogic {

    CourseRepository courseRepository;
    @Autowired
    public CourseLogic(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }
}
