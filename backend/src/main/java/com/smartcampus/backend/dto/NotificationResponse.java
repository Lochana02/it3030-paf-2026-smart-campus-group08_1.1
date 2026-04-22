package com.smartcampus.backend.dto;

import java.util.Date;

import com.smartcampus.backend.enums.NotificationType;

public class NotificationResponse {

    private String id;
    private String title;
    private String message;
    private NotificationType type;
    private String referenceId;
    private String actionUrl;
    private boolean read;
    private Date createdAt;

    public NotificationResponse() {
    }

    public NotificationResponse(String id, String title, String message, NotificationType type,
            String referenceId, String actionUrl, boolean read, Date createdAt) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.type = type;
        this.referenceId = referenceId;
        this.actionUrl = actionUrl;
        this.read = read;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public NotificationType getType() {
        return type;
    }

    public String getReferenceId() {
        return referenceId;
    }

    public String getActionUrl() {
        return actionUrl;
    }

    public boolean isRead() {
        return read;
    }

    public Date getCreatedAt() {
        return createdAt;
    }
}
