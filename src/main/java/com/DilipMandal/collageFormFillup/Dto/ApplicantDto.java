package com.DilipMandal.collageFormFillup.Dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApplicantDto {
    private int id;
    private String first_name;
    private String last_name;
    private String email;
    private String phone;
    private LocalDateTime dateOfBirth;
    private String gender;
    private String address;
    private String city;
    private String state;
    private String zip;
    private String country;
    private String nationality;
}
