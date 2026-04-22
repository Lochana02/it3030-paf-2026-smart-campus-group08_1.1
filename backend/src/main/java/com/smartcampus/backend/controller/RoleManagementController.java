package com.smartcampus.backend.controller;

import com.smartcampus.backend.entity.*;
import com.smartcampus.backend.dto.*;
import com.smartcampus.backend.service.RoleManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/role-management")
@CrossOrigin(origins = "http://localhost:3000")
public class RoleManagementController {
    
    @Autowired
    private RoleManagementService roleManagementService;
    
    @GetMapping("/users")
    public ResponseEntity<List<RoleManagement>> getAllUsers() {
        return ResponseEntity.ok(roleManagementService.getAllUsers());
    }
    
    @GetMapping("/metrics")
    public ResponseEntity<DashboardMetricsDTO> getDashboardMetrics() {
        return ResponseEntity.ok(roleManagementService.getDashboardMetrics());
    }
    
    @GetMapping("/users/{id}")
    public ResponseEntity<RoleManagement> getUserById(@PathVariable String id) {
        return roleManagementService.getUserById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/users")
    public ResponseEntity<RoleManagement> createUser(@RequestBody RoleManagement user) {
        return new ResponseEntity<>(roleManagementService.createUser(user), HttpStatus.CREATED);
    }
    
    @PutMapping("/users/{id}")
    public ResponseEntity<RoleManagement> updateUser(@PathVariable String id, @RequestBody RoleManagement user) {
        return ResponseEntity.ok(roleManagementService.updateUser(id, user));
    }
    
    @PatchMapping("/users/{id}/status")
    public ResponseEntity<RoleManagement> updateUserStatus(
            @PathVariable String id, 
            @RequestParam Status status,
            @RequestParam String performedBy) {
        return ResponseEntity.ok(roleManagementService.updateUserStatus(id, status, performedBy));
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id, @RequestParam String performedBy) {
        roleManagementService.deleteUser(id, performedBy);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/users/search")
    public ResponseEntity<List<RoleManagement>> searchUsers(@RequestParam String keyword) {
        return ResponseEntity.ok(roleManagementService.searchUsers(keyword));
    }
    
    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLog>> getAuditLogs() {
        return ResponseEntity.ok(roleManagementService.getRecentAuditLogs());
    }
    
    @PostMapping("/users/{id}/approve")
    public ResponseEntity<RoleManagement> approveUser(
            @PathVariable String id, 
            @RequestParam String approvedBy) {
        return ResponseEntity.ok(roleManagementService.approveUser(id, approvedBy));
    }
    
    @PostMapping("/users/bulk-update-roles")
    public ResponseEntity<Void> bulkUpdateRoles(@RequestBody BulkRoleUpdateRequest request) {
        roleManagementService.bulkUpdateRoles(
            request.getUserIds(), 
            Role.valueOf(request.getRole()),
            request.getPerformedBy()
        );
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/users/role/{role}")
    public ResponseEntity<List<RoleManagement>> getUsersByRole(@PathVariable Role role) {
        return ResponseEntity.ok(roleManagementService.getUsersByRole(role));
    }
    
    @GetMapping("/users/status/{status}")
    public ResponseEntity<List<RoleManagement>> getUsersByStatus(@PathVariable Status status) {
        return ResponseEntity.ok(roleManagementService.getUsersByStatus(status));
    }
}