package com.DilipMandal.collageFormFillup.controller;

import com.DilipMandal.collageFormFillup.service.PaymentLogic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/8080/payment")
public class PaymentController {

    PaymentLogic paymentLogic;
    @Autowired
    public PaymentController(PaymentLogic paymentLogic) {
        this.paymentLogic = paymentLogic;
    }
}
