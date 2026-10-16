package com.smartrdv.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String refreshToken;
    private String role;
    private String email;
    private String nom;
    private String prenom;
}