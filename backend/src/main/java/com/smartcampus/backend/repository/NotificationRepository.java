package com.smartcampus.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.smartcampus.backend.entity.Notification;

public interface NotificationRepository extends MongoRepository<Notification, String> {

    List<Notification> findByUserIdOrderByCreatedAtDesc(String userId);

    List<Notification> findByUserIdAndReadFalseOrderByCreatedAtDesc(String userId);

    long countByUserIdAndReadFalse(String userId);

    Optional<Notification> findByIdAndUserId(String id, String userId);
}
