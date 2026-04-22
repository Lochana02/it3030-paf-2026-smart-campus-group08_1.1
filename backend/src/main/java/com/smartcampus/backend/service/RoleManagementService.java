package com.smartcampus.backend.service;

import com.smartcampus.backend.entity.*;
import com.smartcampus.backend.repository.RoleManagementRepository;
import com.smartcampus.backend.repository.AuditLogRepository;
import com.smartcampus.backend.dto.DashboardMetricsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class RoleManagementService {
    
    @Autowired
    private RoleManagementRepository roleManagementRepository;
    
    @Autowired
    private AuditLogRepository auditLogRepository;
    
    public List<RoleManagement> getAllUsers() {
        return roleManagementRepository.findAll();
    }
    
    public Optional<RoleManagement> getUserById(String id) {
        return roleManagementRepository.findById(id);
    }
    
    public DashboardMetricsDTO getDashboardMetrics() {
        DashboardMetricsDTO metrics = new DashboardMetricsDTO();
        metrics.setTotalUsers(roleManagementRepository.count());
        metrics.setPendingRequests(roleManagementRepository.countByStatus(Status.PENDING));
        metrics.setActiveAdmins(roleManagementRepository.countByRoleAndStatus(Role.ADMIN, Status.ACTIVE));
        metrics.setDeactivatedAccounts(roleManagementRepository.countByStatus(Status.DISABLED));
        
        // Role distribution
        Map<String, Long> roleDistribution = new HashMap<>();
        for (Role role : Role.values()) {
            roleDistribution.put(role.toString(), roleManagementRepository.countByRole(role));
        }
        metrics.setRoleDistribution(roleDistribution);
        
        // Status distribution
        Map<String, Long> statusDistribution = new HashMap<>();
        for (Status status : Status.values()) {
            statusDistribution.put(status.toString(), roleManagementRepository.countByStatus(status));
        }
        metrics.setStatusDistribution(statusDistribution);
        
        return metrics;
    }
    
    public RoleManagement createUser(RoleManagement user) {
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        RoleManagement savedUser = roleManagementRepository.save(user);
        
        // Create audit log
        AuditLog auditLog = new AuditLog();
        auditLog.setAction("USER_CREATED");
        auditLog.setPerformedBy(user.getCreatedBy());
        auditLog.setTargetUser(user.getUserName());
        auditLog.setTargetUserEmail(user.getEmail());
        auditLog.setDetails("New user created with role: " + user.getRole());
        auditLog.setRoleAfter(user.getRole().toString());
        auditLogRepository.save(auditLog);
        
        return savedUser;
    }
    
    public RoleManagement updateUser(String id, RoleManagement userDetails) {
        RoleManagement user = roleManagementRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        String oldRole = user.getRole().toString();
        String oldStatus = user.getStatus().toString();
        
        user.setUserName(userDetails.getUserName());
        user.setEmail(userDetails.getEmail());
        user.setRole(userDetails.getRole());
        user.setStatus(userDetails.getStatus());
        user.setAvatarUrl(userDetails.getAvatarUrl());
        user.setUpdatedAt(LocalDateTime.now());
        user.setUpdatedBy(userDetails.getUpdatedBy());
        
        RoleManagement updatedUser = roleManagementRepository.save(user);
        
        // Create audit log
        AuditLog auditLog = new AuditLog();
        auditLog.setAction("USER_UPDATED");
        auditLog.setPerformedBy(userDetails.getUpdatedBy());
        auditLog.setTargetUser(user.getUserName());
        auditLog.setTargetUserEmail(user.getEmail());
        auditLog.setRoleBefore(oldRole);
        auditLog.setRoleAfter(user.getRole().toString());
        auditLog.setStatusBefore(oldStatus);
        auditLog.setStatusAfter(user.getStatus().toString());
        auditLog.setDetails("User role changed from " + oldRole + " to " + user.getRole());
        auditLogRepository.save(auditLog);
        
        return updatedUser;
    }
    
    public RoleManagement updateUserStatus(String id, Status status, String performedBy) {
        RoleManagement user = roleManagementRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        String oldStatus = user.getStatus().toString();
        user.setStatus(status);
        user.setUpdatedAt(LocalDateTime.now());
        user.setUpdatedBy(performedBy);
        
        RoleManagement updatedUser = roleManagementRepository.save(user);
        
        // Create audit log
        AuditLog auditLog = new AuditLog();
        auditLog.setAction("STATUS_CHANGED");
        auditLog.setPerformedBy(performedBy);
        auditLog.setTargetUser(user.getUserName());
        auditLog.setTargetUserEmail(user.getEmail());
        auditLog.setStatusBefore(oldStatus);
        auditLog.setStatusAfter(status.toString());
        auditLog.setDetails("Status changed from " + oldStatus + " to " + status);
        auditLogRepository.save(auditLog);
        
        return updatedUser;
    }
    
    public void deleteUser(String id, String performedBy) {
        RoleManagement user = roleManagementRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        // Create audit log before deletion
        AuditLog auditLog = new AuditLog();
        auditLog.setAction("USER_DELETED");
        auditLog.setPerformedBy(performedBy);
        auditLog.setTargetUser(user.getUserName());
        auditLog.setTargetUserEmail(user.getEmail());
        auditLog.setDetails("User permanently deleted");
        auditLogRepository.save(auditLog);
        
        roleManagementRepository.deleteById(id);
    }
    
    public List<RoleManagement> searchUsers(String keyword) {
        List<RoleManagement> byName = roleManagementRepository.searchByUserName(keyword);
        List<RoleManagement> byEmail = roleManagementRepository.searchByEmail(keyword);
        
        Set<RoleManagement> combined = new HashSet<>();
        combined.addAll(byName);
        combined.addAll(byEmail);
        
        return new ArrayList<>(combined);
    }
    
    public List<AuditLog> getRecentAuditLogs() {
        return auditLogRepository.findTop10ByOrderByTimestampDesc();
    }
    
    public RoleManagement approveUser(String id, String approvedBy) {
        return updateUserStatus(id, Status.ACTIVE, approvedBy);
    }
    
    public void bulkUpdateRoles(List<String> userIds, Role newRole, String performedBy) {
        for (String userId : userIds) {
            RoleManagement user = roleManagementRepository.findById(userId).orElse(null);
            if (user != null) {
                String oldRole = user.getRole().toString();
                user.setRole(newRole);
                user.setUpdatedAt(LocalDateTime.now());
                user.setUpdatedBy(performedBy);
                roleManagementRepository.save(user);
                
                // Create audit log for each user
                AuditLog auditLog = new AuditLog();
                auditLog.setAction("BULK_ROLE_UPDATE");
                auditLog.setPerformedBy(performedBy);
                auditLog.setTargetUser(user.getUserName());
                auditLog.setTargetUserEmail(user.getEmail());
                auditLog.setRoleBefore(oldRole);
                auditLog.setRoleAfter(newRole.toString());
                auditLog.setDetails("Bulk role update from " + oldRole + " to " + newRole);
                auditLogRepository.save(auditLog);
            }
        }
    }
    
    public List<RoleManagement> getUsersByRole(Role role) {
        return roleManagementRepository.findByRole(role);
    }
    
    public List<RoleManagement> getUsersByStatus(Status status) {
        return roleManagementRepository.findByStatus(status);
    }
}