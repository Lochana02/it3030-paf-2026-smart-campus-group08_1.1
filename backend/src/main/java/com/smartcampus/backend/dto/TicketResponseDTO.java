package com.smartcampus.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class TicketResponseDTO {
    private String id;
    private String title;
    private String description;
    private String category;
    private String priority;
    private String status;
    private Long createdBy;
    private Long assignedTo;
    private String contactDetails;
    private String email; 
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<AttachmentDTO> attachments;
    private List<CommentDTO> comments;

    // Default constructor
    public TicketResponseDTO() {}

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
    public LocalDateTime getCreatedAt() { return createdAt; }
    public String getEmail() { return email; }              // එකතු කරන්න
    public void setEmail(String email) { this.email = email; } // එකතු කරන්න
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public List<AttachmentDTO> getAttachments() { return attachments; }
    public void setAttachments(List<AttachmentDTO> attachments) { this.attachments = attachments; }
    public List<CommentDTO> getComments() { return comments; }
    public void setComments(List<CommentDTO> comments) { this.comments = comments; }

    // Inner DTOs
    public static class AttachmentDTO {
        private String fileName;
        private String fileId;
        private LocalDateTime uploadedAt;

        public AttachmentDTO() {}
        public String getFileName() { return fileName; }
        public void setFileName(String fileName) { this.fileName = fileName; }
        public String getFileId() { return fileId; }
        public void setFileId(String fileId) { this.fileId = fileId; }
        public LocalDateTime getUploadedAt() { return uploadedAt; }
        public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
    }

    public static class CommentDTO {
        private String id;
        private Long userId;
        private String comment;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public CommentDTO() {}
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
