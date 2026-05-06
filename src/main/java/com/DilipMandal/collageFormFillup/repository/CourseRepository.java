package com.DilipMandal.collageFormFillup.repository;

import com.DilipMandal.collageFormFillup.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course,Integer> {

}
