package com.DilipMandal.collageFormFillup.repository;

import com.DilipMandal.collageFormFillup.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepository extends JpaRepository<Education,Integer> {
}
