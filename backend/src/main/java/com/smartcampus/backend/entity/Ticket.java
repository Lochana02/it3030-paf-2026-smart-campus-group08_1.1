package com.smartcampus.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "tickets")
public class Ticket {
    @Id
    private String id;
    private String title;
    private String description;
    private String category;
    private String priority;
    private String status;
    private Long createdBy;
    private Long assignedTo;
    private String contactDetails;
    private String email;   // 🔁 email field එක එකතු කරන්න
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<Attachment> attachments = new ArrayList<>();
    private List<Comment> comments = new ArrayList<>();

    // Default constructor
    public Ticket() {}

    // Parameterized constructor (විකල්ප – අවශ්‍ය නම් email එකතු කරන්න)
    public Ticket(String title, String description, String category, String priority,
                  Long createdBy, String contactDetails, String email) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.priority = priority;
        this.status = "OPEN";
        this.createdBy = createdBy;
        this.contactDetails = contactDetails;
        this.email = email;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getCreatedBy() { return createdBy; }
    public void setCreatedBy(Long createdBy) { this.createdBy = createdBy; }

    public Long getAssignedTo() { return assignedTo; }
    public void setAssignedTo(Long assignedTo) { this.assignedTo = assignedTo; }

    public String getContactDetails() { return contactDetails; }
    public void setContactDetails(String contactDetails) { this.contactDetails = contactDetails; }

    public String getEmail() { return email; }              // 🔁 නිවැරදි getter
    public void setEmail(String email) { this.email = email; } // 🔁 නිවැරදි setter

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<Attachment> getAttachments() { return attachments; }
    public void setAttachments(List<Attachment> attachments) { this.attachments = attachments; }

    public List<Comment> getComments() { return comments; }
    public void setComments(List<Comment> comments) { this.comments = comments; }

    // Inner class Attachment (no changes)
    public static class Attachment {
        private String fileName;
        private String fileId;
        private LocalDateTime uploadedAt;

        public Attachment() {}
        public Attachment(String fileName, String fileId, LocalDateTime uploadedAt) {
            this.fileName = fileName;
            this.fileId = fileId;
            this.uploadedAt = uploadedAt;
        }

        public String getFileName() { return fileName; }
        public void setFileName(String fileName) { this.fileName = fileName; }
        public String getFileId() { return fileId; }
        public void setFileId(String fileId) { this.fileId = fileId; }
        public LocalDateTime getUploadedAt() { return uploadedAt; }
        public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
    }

    // Inner class Comment (no changes)
    public static class Comment {
        private String id;
        private Long userId;
        private String comment;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Comment() {}
        public Comment(String id, Long userId, String comment, LocalDateTime createdAt, LocalDateTime updatedAt) {
            this.id = id;
            this.userId = userId;
            this.comment = comment;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getComment() { return comment; }
        public void setComment(String comment) { this.comment = comment; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
        public LocalDateTime getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    }
}