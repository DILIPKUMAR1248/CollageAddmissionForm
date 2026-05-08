package com.DilipMandal.collageFormFillup.service;

import com.DilipMandal.collageFormFillup.Dto.CourseDto;
import com.DilipMandal.collageFormFillup.entity.Course;
import com.DilipMandal.collageFormFillup.repository.CourseRepository;
import com.DilipMandal.collageFormFillup.utility.CourseMappingUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class CourseLogic {

    CourseRepository courseRepository;
    @Autowired
    public CourseLogic(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public CourseDto saveCourse(CourseDto courseDto) {
        Course course = CourseMappingUtility.toCourse(courseDto);
        Course savedCourse = courseRepository.save(course);
        return CourseMappingUtility.toCourseDto(savedCourse);
    }

    public CourseDto getCourse(int id){
        Course course =courseRepository.findById(id).orElse(null);
        if(course == null){
            return null;
        }
        return CourseMappingUtility.toCourseDto(course);
    }

    public CourseDto updateCourse(int id, CourseDto courseDto) {
        Course course = courseRepository.findById(id).orElse(null);
        if (course == null) {
            return null;
        }
        Course updatedCourse = CourseMappingUtility.toCourse(courseDto);
        updatedCourse.setId(id);
        Course savedCourse = courseRepository.save(updatedCourse);
        return CourseMappingUtility.toCourseDto(savedCourse);
    }

    public void deleteCourse(int id) {
        courseRepository.deleteById(id);
    }

    public List<CourseDto> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        List<CourseDto> courseDtos = new ArrayList<>();
        for (Course course : courses) {
            courseDtos.add(CourseMappingUtility.toCourseDto(course));
        }
        return courseDtos;
    }



}
