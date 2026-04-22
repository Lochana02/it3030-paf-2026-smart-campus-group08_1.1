package com.smartcampus.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "bookings")
@CompoundIndex(name = "resource_date_time_idx", 
                def = "{'resourceId': 1, 'date': 1, 'startTime': 1, 'endTime': 1}")
public class Booking {
    
    @Id
    private String id;
    
    private String resourceId;
    private String resourceName;
    
    @Indexed
    private String userId;
    private String userEmail;
    private String userName;
    
    private LocalDate date;
    private String startTime;
    private String endTime;
    
    private String purpose;
    private Integer attendees;
    
    private String status;
    private String adminComment;
    private String rejectionReason;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public Booking() {}
    
    public Booking(String resourceId, String resourceName, String userId, 
                   String userEmail, String userName, LocalDate date, 
                   String startTime, String endTime, String purpose, 
                   Integer attendees, String status) {
        this.resourceId = resourceId;
        this.resourceName = resourceName;
        this.userId = userId;
        this.userEmail = userEmail;
        this.userName = userName;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.attendees = attendees;
        this.status = status;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters
    public String getId() { return id; }
    public String getResourceId() { return resourceId; }
    public String getResourceName() { return resourceName; }
    public String getUserId() { return userId; }
    public String getUserEmail() { return userEmail; }
    public String getUserName() { return userName; }
    public LocalDate getDate() { return date; }
    public String getStartTime() { return startTime; }
    public String getEndTime() { return endTime; }
    public String getPurpose() { return purpose; }
    public Integer getAttendees() { return attendees; }
    public String getStatus() { return status; }
    public String getAdminComment() { return adminComment; }
    public String getRejectionReason() { return rejectionReason; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    
    // Setters
    public void setId(String id) { this.id = id; }
    public void setResourceId(String resourceId) { this.resourceId = resourceId; }
    public void setResourceName(String resourceName) { this.resourceName = resourceName; }
    public void setUserId(String userId) { this.userId = userId; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public void setUserName(String userName) { this.userName = userName; }
    public void setDate(LocalDate date) { this.date = date; }
    public void setStartTime(String startTime) { this.startTime = startTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    public void setAttendees(Integer attendees) { this.attendees = attendees; }
    public void setStatus(String status) { this.status = status; }
    public void setAdminComment(String adminComment) { this.adminComment = adminComment; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}