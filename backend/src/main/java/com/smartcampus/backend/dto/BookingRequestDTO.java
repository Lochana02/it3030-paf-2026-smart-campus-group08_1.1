package com.smartcampus.backend.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class BookingRequestDTO {
    
    @NotBlank(message = "Resource ID is required")
    private String resourceId;
    
    @NotBlank(message = "Resource name is required")
    private String resourceName;
    
    @NotNull(message = "Date is required")
    @FutureOrPresent(message = "Date cannot be in the past")
    private LocalDate date;
    
    @NotBlank(message = "Start time is required")
    @Pattern(regexp = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$", message = "Invalid time format")
    private String startTime;
    
    @NotBlank(message = "End time is required")
    @Pattern(regexp = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$", message = "Invalid time format")
    private String endTime;
    
    @NotBlank(message = "Purpose is required")
    @Size(min = 3, max = 500, message = "Purpose must be between 3 and 500 characters")
    private String purpose;
    
    @Min(value = 1, message = "At least 1 attendee required")
    @Max(value = 500, message = "Maximum 500 attendees")
    private Integer attendees;
    
    // Getters
    public String getResourceId() { return resourceId; }
    public String getResourceName() { return resourceName; }
    public LocalDate getDate() { return date; }
    public String getStartTime() { return startTime; }
    public String getEndTime() { return endTime; }
    public String getPurpose() { return purpose; }
    public Integer getAttendees() { return attendees; }
    
    // Setters
    public void setResourceId(String resourceId) { this.resourceId = resourceId; }
    public void setResourceName(String resourceName) { this.resourceName = resourceName; }
    public void setDate(LocalDate date) { this.date = date; }
    public void setStartTime(String startTime) { this.startTime = startTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    public void setAttendees(Integer attendees) { this.attendees = attendees; }
}