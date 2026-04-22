package com.smartcampus.backend.service;

import com.smartcampus.backend.dto.TicketRequestDTO;
import com.smartcampus.backend.dto.TicketResponseDTO;
import com.smartcampus.backend.entity.Ticket;
import com.smartcampus.backend.repository.TicketRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final GridFsService gridFsService;

    public TicketService(TicketRepository ticketRepository, GridFsService gridFsService) {
        this.ticketRepository = ticketRepository;
        this.gridFsService = gridFsService;
    }

    public TicketResponseDTO createTicket(TicketRequestDTO request, List<MultipartFile> images) throws IOException {
        Ticket ticket = new Ticket();
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setCategory(request.getCategory());
        ticket.setPriority(request.getPriority());
        ticket.setStatus("OPEN");
        ticket.setCreatedBy(request.getCreatedBy());
        ticket.setContactDetails(request.getContactDetails());
        ticket.setEmail(request.getEmail()); 
        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setUpdatedAt(LocalDateTime.now());

        if (images != null && !images.isEmpty()) {
            int count = 0;
            for (MultipartFile img : images) {
                if (count >= 3) break;
                if (!img.isEmpty()) {
                    String fileId = gridFsService.saveFile(img);
                    Ticket.Attachment att = new Ticket.Attachment(img.getOriginalFilename(), fileId, LocalDateTime.now());
                    ticket.getAttachments().add(att);
                    count++;
                }
            }
        }
        return convertToDTO(ticketRepository.save(ticket));
    }

    public List<TicketResponseDTO> getAllTickets() {
        return ticketRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<TicketResponseDTO> getTicketsByUser(Long userId) {
        return ticketRepository.findByCreatedBy(userId).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public TicketResponseDTO getTicketById(String id) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));
        return convertToDTO(ticket);
    }

    public TicketResponseDTO updateStatus(String id, String status) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));
        ticket.setStatus(status);
        ticket.setUpdatedAt(LocalDateTime.now());
        return convertToDTO(ticketRepository.save(ticket));
    }

    public TicketResponseDTO assignTechnician(String id, Long technicianId) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));
        ticket.setAssignedTo(technicianId);
        ticket.setUpdatedAt(LocalDateTime.now());
        return convertToDTO(ticketRepository.save(ticket));
    }

    public void deleteTicket(String id) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));
        for (Ticket.Attachment att : ticket.getAttachments()) {
            gridFsService.deleteFile(att.getFileId());
        }
        ticketRepository.deleteById(id);
    }

    public TicketResponseDTO addComment(String ticketId, Long userId, String commentText) {
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow(() -> new RuntimeException("Ticket not found"));
        Ticket.Comment comment = new Ticket.Comment(UUID.randomUUID().toString(), userId, commentText, LocalDateTime.now(), LocalDateTime.now());
        ticket.getComments().add(comment);
        ticket.setUpdatedAt(LocalDateTime.now());
        return convertToDTO(ticketRepository.save(ticket));
    }

    public TicketResponseDTO updateComment(String commentId, String newComment, Long currentUserId, boolean isAdmin) {
        Ticket ticket = ticketRepository.findTicketByCommentId(commentId);
        if (ticket == null) throw new RuntimeException("Comment not found");
        for (Ticket.Comment c : ticket.getComments()) {
            if (c.getId().equals(commentId)) {
                if (!c.getUserId().equals(currentUserId) && !isAdmin) {
                    throw new RuntimeException("You can only edit your own comments");
                }
                c.setComment(newComment);
                c.setUpdatedAt(LocalDateTime.now());
                ticket.setUpdatedAt(LocalDateTime.now());
                return convertToDTO(ticketRepository.save(ticket));
            }
        }
        throw new RuntimeException("Comment not found");
    }

    public void deleteComment(String commentId, Long currentUserId, boolean isAdmin) {
        Ticket ticket = ticketRepository.findTicketByCommentId(commentId);
        if (ticket == null) throw new RuntimeException("Comment not found");
        boolean removed = ticket.getComments().removeIf(c -> c.getId().equals(commentId) && (c.getUserId().equals(currentUserId) || isAdmin));
        if (!removed) throw new RuntimeException("Comment not found or not authorized");
        ticket.setUpdatedAt(LocalDateTime.now());
        ticketRepository.save(ticket);
    }

    private TicketResponseDTO convertToDTO(Ticket ticket) {
        TicketResponseDTO dto = new TicketResponseDTO();
        dto.setId(ticket.getId());
        dto.setTitle(ticket.getTitle());
        dto.setDescription(ticket.getDescription());
        dto.setCategory(ticket.getCategory());
        dto.setPriority(ticket.getPriority());
        dto.setStatus(ticket.getStatus());
        dto.setCreatedBy(ticket.getCreatedBy());
        dto.setAssignedTo(ticket.getAssignedTo());
        dto.setContactDetails(ticket.getContactDetails());
        dto.setEmail(ticket.getEmail());
        dto.setCreatedAt(ticket.getCreatedAt());
        dto.setUpdatedAt(ticket.getUpdatedAt());

        List<TicketResponseDTO.AttachmentDTO> attDTOs = ticket.getAttachments().stream().map(a -> {
            TicketResponseDTO.AttachmentDTO adto = new TicketResponseDTO.AttachmentDTO();
            adto.setFileName(a.getFileName());
            adto.setFileId(a.getFileId());
            adto.setUploadedAt(a.getUploadedAt());
            return adto;
        }).collect(Collectors.toList());
        dto.setAttachments(attDTOs);

        List<TicketResponseDTO.CommentDTO> comDTOs = ticket.getComments().stream().map(c -> {
            TicketResponseDTO.CommentDTO cdto = new TicketResponseDTO.CommentDTO();
            cdto.setId(c.getId());
            cdto.setUserId(c.getUserId());
            cdto.setComment(c.getComment());
            cdto.setCreatedAt(c.getCreatedAt());
            cdto.setUpdatedAt(c.getUpdatedAt());
            return cdto;
        }).collect(Collectors.toList());
        dto.setComments(comDTOs);
        return dto;
    }
}