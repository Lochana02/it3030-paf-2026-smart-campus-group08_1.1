package com.smartcampus.backend.repository;

import com.smartcampus.backend.entity.RoleManagement;
import com.smartcampus.backend.entity.Role;
import com.smartcampus.backend.entity.Status;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoleManagementRepository extends MongoRepository<RoleManagement, String> {
    
    Optional<RoleManagement> findByUserId(String userId);
    
    Optional<RoleManagement> findByEmail(String email);
    
    List<RoleManagement> findByRole(Role role);
    
    List<RoleManagement> findByStatus(Status status);
    
    List<RoleManagement> findByRoleAndStatus(Role role, Status status);
    
    @Query("{ 'userName': { $regex: ?0, $options: 'i' } }")
    List<RoleManagement> searchByUserName(String userName);
    
    @Query("{ 'email': { $regex: ?0, $options: 'i' } }")
    List<RoleManagement> searchByEmail(String email);
    
    long countByStatus(Status status);
    
    long countByRole(Role role);
    
    long countByRoleAndStatus(Role role, Status status);
}