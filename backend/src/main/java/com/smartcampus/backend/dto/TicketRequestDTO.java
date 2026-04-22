package com.smartcampus.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class TicketRequestDTO {
    @NotBlank
    private String title;
    private String description;
    private String category;
    private String priority;
    private Long createdBy;
    private String contactDetails;
    private String email;


    // Default constructor
    public TicketRequestDTO() {}

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public Long getCreatedBy() { return createdBy; }
    public void setCreatedBy(Long createdBy) { this.createdBy = createdBy; }
    public String getContactDetails() { return contactDetails; }
    public void setContactDetails(String contactDetails) { this.contactDetails = contactDetails; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
