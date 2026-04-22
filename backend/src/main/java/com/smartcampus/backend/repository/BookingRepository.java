package com.smartcampus.backend.repository;

import com.smartcampus.backend.entity.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {
    
    List<Booking> findByUserIdOrderByDateDescStartTimeDesc(String userId);
    
    List<Booking> findAllByOrderByCreatedAtDesc();
    
    List<Booking> findByResourceIdAndDateAndStatusIn(
        String resourceId, 
        LocalDate date, 
        List<String> statuses
    );
    
    List<Booking> findByStatus(String status);
    
    List<Booking> findByDate(LocalDate date);
    
    List<Booking> findByDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("{ 'resourceId': ?0, 'date': ?1, 'userId': ?2, 'status': { $in: ?3 } }")
    List<Booking> findExistingBookingsByUser(
        String resourceId, 
        LocalDate date, 
        String userId, 
        List<String> statuses
    );
    
    long countByStatus(String status);
}