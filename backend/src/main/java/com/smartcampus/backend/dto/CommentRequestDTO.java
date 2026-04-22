package com.smartcampus.backend.dto;

public class CommentRequestDTO {
    private Long userId;
    private String comment;

    // Default constructor
    public CommentRequestDTO() {}

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}