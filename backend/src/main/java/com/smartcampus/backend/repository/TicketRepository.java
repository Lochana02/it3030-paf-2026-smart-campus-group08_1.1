package com.smartcampus.backend.repository;

import com.smartcampus.backend.entity.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface TicketRepository extends MongoRepository<Ticket, String> {
    List<Ticket> findByCreatedBy(Long userId);
    List<Ticket> findByAssignedTo(Long technicianId);
    List<Ticket> findByStatus(String status);
    @Query("{ 'comments.id': ?0 }")
    Ticket findTicketByCommentId(String commentId);
}
