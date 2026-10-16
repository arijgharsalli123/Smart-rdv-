package com.smartrdv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmartrdvApplication {
    public static void main(String[] args) {
        SpringApplication.run(SmartrdvApplication.class, args);
        System.out.println("🚀 SMART RDV Backend démarré sur http://localhost:8080");
    }
}