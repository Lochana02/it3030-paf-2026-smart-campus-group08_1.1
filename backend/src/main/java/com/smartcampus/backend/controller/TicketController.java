package com.smartcampus.backend.controller;

import com.smartcampus.backend.dto.*;
import com.smartcampus.backend.service.TicketService;

import jakarta.validation.Valid;
import tools.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {

    private final TicketService ticketService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<TicketResponseDTO> createTicket(
            @RequestParam("ticket") String ticketJson,
            @RequestParam(value = "images", required = false) List<MultipartFile> images) throws Exception {
        
        TicketRequestDTO request = objectMapper.readValue(ticketJson, TicketRequestDTO.class);
        return new ResponseEntity<>(ticketService.createTicket(request, images), HttpStatus.CREATED);
    }

    @GetMapping
public ResponseEntity<String> handleGetRoot() {
    return ResponseEntity.ok("This endpoint supports POST only. Use the frontend form.");
}

    @GetMapping("/my")
    public List<TicketResponseDTO> getMyTickets(@RequestParam Long userId) {
        return ticketService.getTicketsByUser(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDTO> getTicketById(@PathVariable String id) {
        return ResponseEntity.ok(ticketService.getTicketById(id));
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<TicketResponseDTO> addComment(@PathVariable String id,
                                                        @Valid @RequestBody CommentRequestDTO request) {
        return ResponseEntity.ok(ticketService.addComment(id, request.getUserId(), request.getComment()));
    }

    @PutMapping("/comments/{commentId}")
    public ResponseEntity<TicketResponseDTO> updateComment(@PathVariable String commentId,
                                                           @RequestParam String newComment,
                                                           @RequestParam Long userId,
                                                           @RequestParam(required = false) boolean isAdmin) {
        return ResponseEntity.ok(ticketService.updateComment(commentId, newComment, userId, isAdmin));
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable String commentId,
                                              @RequestParam Long userId,
                                              @RequestParam(required = false) boolean isAdmin) {
        ticketService.deleteComment(commentId, userId, isAdmin);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/all")
    public List<TicketResponseDTO> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @PutMapping("/admin/{id}/status")
    public ResponseEntity<TicketResponseDTO> updateStatus(@PathVariable String id, @RequestParam String status) {
        return ResponseEntity.ok(ticketService.updateStatus(id, status));
    }

    @PutMapping("/admin/{id}/assign")
    public ResponseEntity<TicketResponseDTO> assignTechnician(@PathVariable String id, @RequestParam Long technicianId) {
        return ResponseEntity.ok(ticketService.assignTechnician(id, technicianId));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable String id) {
        ticketService.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/test")
    public String test() {
        return "Backend is working!";
    }

}