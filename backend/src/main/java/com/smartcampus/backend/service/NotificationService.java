package com.smartcampus.backend.service;

import java.util.List;

import com.smartcampus.backend.dto.NotificationResponse;
import com.smartcampus.backend.enums.NotificationType;

public interface NotificationService {

    NotificationResponse createNotification(String userId, String title, String message,
            NotificationType type, String referenceId, String actionUrl);

    List<NotificationResponse> getNotificationsForUser(String userId);

    long getUnreadCount(String userId);

    NotificationResponse markAsRead(String userId, String notificationId);

    int markAllAsRead(String userId);
}
