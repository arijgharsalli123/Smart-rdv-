package com.smartrdv.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IaScoreResponse {
    private String priority;
    private Integer score;
    private Double confidence;
    private String recommendation;
    private Boolean savedToDb;
}