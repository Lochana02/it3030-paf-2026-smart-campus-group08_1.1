package com.smartcampus.backend.enums;

public enum ResourceStatus {
    AVAILABLE,
    IN_USE,        // ✅ Add this line
    UNAVAILABLE,
    MAINTENANCE,
    BOOKED,
    ACTIVE,
    OUT_OF_SERVICE
}