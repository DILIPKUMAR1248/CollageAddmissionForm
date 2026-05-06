package com.DilipMandal.collageFormFillup.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)

    private int peymentId;

    @ManyToOne
    @JoinColumn(name = "applicant_id")
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
