package com.smartcampus.backend.dto;

import java.util.Map;

public class DashboardMetricsDTO {
    private long totalUsers;
    private long pendingRequests;
    private long activeAdmins;
    private long deactivatedAccounts;
    private Map<String, Long> roleDistribution;
    private Map<String, Long> statusDistribution;
    
    // Constructors
    public DashboardMetricsDTO() {}
    
    public DashboardMetricsDTO(long totalUsers, long pendingRequests, long activeAdmins, long deactivatedAccounts) {
        this.totalUsers = totalUsers;
        this.pendingRequests = pendingRequests;
        this.activeAdmins = activeAdmins;
        this.deactivatedAccounts = deactivatedAccounts;
    }
    
    // Getters and Setters
    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }
    
    public long getPendingRequests() { return pendingRequests; }
    public void setPendingRequests(long pendingRequests) { this.pendingRequests = pendingRequests; }
    
    public long getActiveAdmins() { return activeAdmins; }
    public void setActiveAdmins(long activeAdmins) { this.activeAdmins = activeAdmins; }
    
    public long getDeactivatedAccounts() { return deactivatedAccounts; }
    public void setDeactivatedAccounts(long deactivatedAccounts) { this.deactivatedAccounts = deactivatedAccounts; }
    
    public Map<String, Long> getRoleDistribution() { return roleDistribution; }
    public void setRoleDistribution(Map<String, Long> roleDistribution) { this.roleDistribution = roleDistribution; }
    
    public Map<String, Long> getStatusDistribution() { return statusDistribution; }
    public void setStatusDistribution(Map<String, Long> statusDistribution) { this.statusDistribution = statusDistribution; }
}