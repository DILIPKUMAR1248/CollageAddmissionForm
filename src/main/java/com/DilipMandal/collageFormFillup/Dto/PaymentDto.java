package com.DilipMandal.collageFormFillup.Dto;

import com.DilipMandal.collageFormFillup.entity.Applicant;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;


@Data
public class PaymentDto {

    private int peymentId;
    private Applicant applicant;
    private String paymentStatus;
    private String paymentMethod;
    private String paymentDate;
    private String paymentAmount;
    private String paymentCurrency;
    private String paymentDescription;
    private String paymentReference;
    private String paymentNotes;
}
