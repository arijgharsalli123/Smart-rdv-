package com.smartrdv.service;

import com.smartrdv.dto.AuthResponse;
import com.smartrdv.dto.LoginRequest;
import com.smartrdv.dto.RegisterRequest;
import com.smartrdv.entity.Patient;
import com.smartrdv.entity.Utilisateur;
import com.smartrdv.repository.UtilisateurRepository;
import com.smartrdv.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    public AuthResponse register(RegisterRequest request) {
        if (utilisateurRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }

        Patient patient = new Patient();
        patient.setNom(request.getNom());
        patient.setPrenom(request.getPrenom());
        patient.setEmail(request.getEmail());
        patient.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        patient.setTelephone(request.getTelephone());
        patient.setRole(request.getRole() != null ? request.getRole() : "PATIENT");
        patient.setAge(request.getAge());
        patient.setAllergies(request.getAllergies());
        patient.setAntecedents(request.getAntecedents());

        utilisateurRepository.save(patient);

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtService.generateToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        return new AuthResponse(token, refreshToken, patient.getRole(), patient.getEmail(), patient.getNom(), patient.getPrenom());
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        Utilisateur utilisateur = utilisateurRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        String token = jwtService.generateToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        return new AuthResponse(token, refreshToken, utilisateur.getRole(), utilisateur.getEmail(), utilisateur.getNom(), utilisateur.getPrenom());
    }
}