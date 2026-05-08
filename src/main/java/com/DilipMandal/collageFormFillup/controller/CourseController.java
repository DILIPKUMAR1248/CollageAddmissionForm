package com.DilipMandal.collageFormFillup.controller;

import com.DilipMandal.collageFormFillup.Dto.CourseDto;
import com.DilipMandal.collageFormFillup.service.CourseLogic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/8080/v1/course")
public class CourseController {

    CourseLogic courseLogic;
    @Autowired
    public CourseController(CourseLogic courseLogic) {
        this.courseLogic = courseLogic;
    }

    @PostMapping("/save")
    public ResponseEntity<CourseDto> createCourse(@RequestBody CourseDto courseDto) {
        CourseDto savedCourse = courseLogic.saveCourse(courseDto);
        return new ResponseEntity<>(savedCourse, HttpStatus.CREATED);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<CourseDto> getCourse(@PathVariable int id) {
        CourseDto courseDto = courseLogic.getCourse(id);
        return new ResponseEntity<>(courseDto, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CourseDto> updateCourse(@PathVariable int id, @RequestBody CourseDto courseDto) {
        CourseDto updatedCourse = courseLogic.updateCourse(id, courseDto);
        return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable int id) {
        courseLogic.deleteCourse(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<CourseDto>> getAllCourses() {
        List<CourseDto> courseDtos = courseLogic.getAllCourses();
        return new ResponseEntity<>(courseDtos, HttpStatus.OK);
    }

}
