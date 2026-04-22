package com.smartcampus.backend.repository;

import com.smartcampus.backend.entity.AuditLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditLogRepository extends MongoRepository<AuditLog, String> {
    
    List<AuditLog> findTop10ByOrderByTimestampDesc();
    
    List<AuditLog> findByAction(String action);
    
    List<AuditLog> findByPerformedBy(String performedBy);
    
    List<AuditLog> findByTargetUser(String targetUser);
    
    @Query("{ 'timestamp': { $gte: ?0, $lte: ?1 } }")
    List<AuditLog> findByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("{ 'action': { $regex: ?0, $options: 'i' } }")
    List<AuditLog> searchByAction(String action);
}