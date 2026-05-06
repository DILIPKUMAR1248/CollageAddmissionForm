package com.DilipMandal.collageFormFillup.repository;

import com.DilipMandal.collageFormFillup.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Integer> {
}
