package com.DilipMandal.collageFormFillup.utility;

import com.DilipMandal.collageFormFillup.Dto.CourseDto;
import com.DilipMandal.collageFormFillup.entity.Course;

public class CourseMappingUtility {

    //Dto to Entity
    public static Course toCourse(CourseDto courseDto){
        Course course = new Course();
        course.setId(courseDto.getId());
        course.setCourseName(courseDto.getCourseName());
        course.setApplicant(courseDto.getApplicant());
        course.setPriority(courseDto.getPriority());
        course.setMode(courseDto.getMode());
        return course;
    }

    //Entity to Dto
    public static CourseDto toCourseDto(Course course){
        CourseDto courseDto = new CourseDto();
        courseDto.setId(course.getId());
        courseDto.setCourseName(course.getCourseName());
        courseDto.setApplicant(course.getApplicant());
        courseDto.setPriority(course.getPriority());
        courseDto.setMode(course.getMode());
        return courseDto;
    }

    //Entity to Dto with only id
    public static CourseDto toCourseDtoWithId(Course course){
        CourseDto courseDto = new CourseDto();
        courseDto.setId(course.getId());
        return courseDto;
    }
}
