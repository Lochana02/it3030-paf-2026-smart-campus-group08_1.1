package com.smartcampus.backend.controller;

import com.smartcampus.backend.dto.BookingRequestDTO;
import com.smartcampus.backend.dto.BookingStatusUpdateDTO;
import com.smartcampus.backend.entity.Booking;
import com.smartcampus.backend.service.BookingService;  // ← මේක තියෙනවද?
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    @GetMapping("/my")
    public ResponseEntity<?> getMyBookings() {
        String userId = "test-user-123";
        List<Booking> bookings = bookingService.getUserBookings(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("bookings", bookings);
        response.put("count", bookings.size());
        return ResponseEntity.ok(response);
    }
    
    @PostMapping
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingRequestDTO request) {
        String userId = "test-user-123";
        String userEmail = "test@example.com";
        String userName = "Test User";
        Booking booking = bookingService.createBooking(request, userId, userEmail, userName);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Booking created successfully");
        response.put("booking", booking);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("bookings", bookings);
        response.put("count", bookings.size());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/admin/status/{status}")
    public ResponseEntity<?> getBookingsByStatus(@PathVariable String status) {
        List<Booking> bookings = bookingService.getBookingsByStatus(status);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("bookings", bookings);
        response.put("count", bookings.size());
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/admin/{id}/status")
    public ResponseEntity<?> updateBookingStatus(
            @PathVariable String id,
            @Valid @RequestBody BookingStatusUpdateDTO update) {
        Booking booking = bookingService.updateBookingStatus(id, update, "admin-123", "admin@example.com");
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Booking " + update.getStatus().toLowerCase() + " successfully");
        response.put("booking", booking);
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable String id) {
        String userId = "test-user-123";
        String userRole = "USER";
        Booking cancelledBooking = bookingService.cancelBooking(id, userId, userRole);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Booking cancelled successfully");
        response.put("booking", cancelledBooking);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable String id) {
        String userId = "test-user-123";
        String userRole = "USER";
        Booking booking = bookingService.getBookingById(id, userId, userRole);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("booking", booking);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/admin/dashboard/stats")
    public ResponseEntity<?> getDashboardStats() {
        BookingService.DashboardStats stats = bookingService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }
}