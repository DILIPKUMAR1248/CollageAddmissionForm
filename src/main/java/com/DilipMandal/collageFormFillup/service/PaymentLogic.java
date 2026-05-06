package com.DilipMandal.collageFormFillup.service;

import com.DilipMandal.collageFormFillup.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentLogic {
    PaymentRepository paymentRepository;
    @Autowired
    public PaymentLogic(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
}
