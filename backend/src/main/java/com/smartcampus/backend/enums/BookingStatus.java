package com.smartcampus.backend.enums;

public enum BookingStatus {
    PENDING("PENDING"),
    APPROVED("APPROVED"),
    REJECTED("REJECTED"),
    CANCELLED("CANCELLED");
    
    private final String value;
    
    BookingStatus(String value) {
        this.value = value;
    }
    
    public String getValue() {
        return value;
    }
    
    public static BookingStatus fromValue(String value) {
        for (BookingStatus status : BookingStatus.values()) {
            if (status.value.equalsIgnoreCase(value)) {
                return status;
            }
        }
        return PENDING;
    }
}