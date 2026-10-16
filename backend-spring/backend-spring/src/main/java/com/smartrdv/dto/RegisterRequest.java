package com.smartrdv.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String nom;
    private String prenom;
    private String email;
    private String password;
    private String telephone;
    private String role;
    private Integer age;
    private String allergies;
    private String antecedents;
}