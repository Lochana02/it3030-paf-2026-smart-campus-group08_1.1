package com.smartcampus.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║   🚀 Smart Campus Backend Started      ║");
        System.out.println("║   📍 http://localhost:8081             ║");
        System.out.println("║   🗄️  MongoDB: smartcampus             ║");
        System.out.println("╚════════════════════════════════════════╝");
    }
}