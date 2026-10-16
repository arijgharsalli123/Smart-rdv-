package com.smartrdv.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Patient extends Utilisateur {
    private Integer age;
    @Column(columnDefinition = "TEXT")
    private String allergies;
    @Column(columnDefinition = "TEXT")
    private String antecedents;
    private String groupeSanguin;
    private String fcmToken;
}