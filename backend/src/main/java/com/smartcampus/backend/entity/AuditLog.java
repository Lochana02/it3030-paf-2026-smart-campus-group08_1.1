package com.smartcampus.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "audit_logs")
public class AuditLog {
    
    @Id
    private String id;
    private String action;
    private String performedBy;
    private String performedByEmail;
    private String targetUser;
    private String targetUserEmail;
    private String details;
    private String roleBefore;
    private String roleAfter;
    private String statusBefore;
    private String statusAfter;
    private LocalDateTime timestamp;
    
    public AuditLog() {
        this.timestamp = LocalDateTime.now();
    }
    
    public AuditLog(String action, String performedBy, String targetUser, String details) {
        this.action = action;
        this.performedBy = performedBy;
        this.targetUser = targetUser;
        this.details = details;
        this.timestamp = LocalDateTime.now();
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    
    public String getPerformedBy() { return performedBy; }
    public void setPerformedBy(String performedBy) { this.performedBy = performedBy; }
    
    public String getPerformedByEmail() { return performedByEmail; }
    public void setPerformedByEmail(String performedByEmail) { this.performedByEmail = performedByEmail; }
    
    public String getTargetUser() { return targetUser; }
    public void setTargetUser(String targetUser) { this.targetUser = targetUser; }
    
    public String getTargetUserEmail() { return targetUserEmail; }
    public void setTargetUserEmail(String targetUserEmail) { this.targetUserEmail = targetUserEmail; }
    
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    
    public String getRoleBefore() { return roleBefore; }
    public void setRoleBefore(String roleBefore) { this.roleBefore = roleBefore; }
    
    public String getRoleAfter() { return roleAfter; }
    public void setRoleAfter(String roleAfter) { this.roleAfter = roleAfter; }
    
    public String getStatusBefore() { return statusBefore; }
    public void setStatusBefore(String statusBefore) { this.statusBefore = statusBefore; }
    
    public String getStatusAfter() { return statusAfter; }
    public void setStatusAfter(String statusAfter) { this.statusAfter = statusAfter; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}