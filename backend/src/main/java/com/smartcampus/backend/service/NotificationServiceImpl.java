package com.smartcampus.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.smartcampus.backend.dto.NotificationResponse;
import com.smartcampus.backend.entity.Notification;
import com.smartcampus.backend.enums.NotificationType;
import com.smartcampus.backend.repository.NotificationRepository;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public NotificationResponse createNotification(String userId, String title, String message,
            NotificationType type, String referenceId, String actionUrl) {
        validateUserId(userId);

        Notification notification = Notification.builder()
                .userId(userId)
                .title(title == null ? null : title.trim())
                .message(message == null ? null : message.trim())
                .type(type)
                .referenceId(referenceId)
                .actionUrl(actionUrl)
                .read(false)
                .createdAt(new Date())
                .build();

        return mapToResponse(notificationRepository.save(notification));
    }

    @Override
    public List<NotificationResponse> getNotificationsForUser(String userId) {
        validateUserId(userId);
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public long getUnreadCount(String userId) {
        validateUserId(userId);
        return notificationRepository.countByUserIdAndReadFalse(userId);
    }

    @Override
    public NotificationResponse markAsRead(String userId, String notificationId) {
        validateUserId(userId);
        validateNotificationId(notificationId);

        Notification notification = notificationRepository.findByIdAndUserId(notificationId, userId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        if (!notification.isRead()) {
            notification.setRead(true);
            notification = notificationRepository.save(notification);
        }

        return mapToResponse(notification);
    }

    @Override
    public int markAllAsRead(String userId) {
        validateUserId(userId);

        List<Notification> unreadNotifications = notificationRepository
                .findByUserIdAndReadFalseOrderByCreatedAtDesc(userId);

        if (unreadNotifications.isEmpty()) {
            return 0;
        }

        unreadNotifications.forEach(notification -> notification.setRead(true));
        notificationRepository.saveAll(unreadNotifications);
        return unreadNotifications.size();
    }

    private NotificationResponse mapToResponse(Notification notification) {
        return new NotificationResponse(
                notification.getId(),
                notification.getTitle(),
                notification.getMessage(),
                notification.getType(),
                notification.getReferenceId(),
                notification.getActionUrl(),
                notification.isRead(),
                notification.getCreatedAt());
    }

    private void validateUserId(String userId) {
        if (userId == null || userId.isBlank()) {
            throw new RuntimeException("User id is required");
        }
    }

    private void validateNotificationId(String notificationId) {
        if (notificationId == null || notificationId.isBlank()) {
            throw new RuntimeException("Notification id is required");
        }
    }
}
