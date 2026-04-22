package com.smartcampus.backend.dto;

import java.util.List;

public class BulkRoleUpdateRequest {
    private List<String> userIds;
    private String role;
    private String performedBy;
    
    // Getters and Setters
    public List<String> getUserIds() { return userIds; }
    public void setUserIds(List<String> userIds) { this.userIds = userIds; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public String getPerformedBy() { return performedBy; }
    public void setPerformedBy(String performedBy) { this.performedBy = performedBy; }
}