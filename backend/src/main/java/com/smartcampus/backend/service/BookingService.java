package com.smartcampus.backend.service;

import com.smartcampus.backend.dto.BookingRequestDTO;
import com.smartcampus.backend.dto.BookingStatusUpdateDTO;
import com.smartcampus.backend.entity.Booking;
import com.smartcampus.backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    public Booking createBooking(BookingRequestDTO request, String userId, 
                                  String userEmail, String userName) {
        Booking booking = new Booking(
            request.getResourceId(), request.getResourceName(), userId,
            userEmail, userName, request.getDate(), request.getStartTime(),
            request.getEndTime(), request.getPurpose(), request.getAttendees(), "PENDING"
        );
        return bookingRepository.save(booking);
    }
    
    public List<Booking> getUserBookings(String userId) {
        return bookingRepository.findByUserIdOrderByDateDescStartTimeDesc(userId);
    }
    
    public List<Booking> getAllBookings() {
        return bookingRepository.findAllByOrderByCreatedAtDesc();
    }
    
    public List<Booking> getBookingsByStatus(String status) {
        return bookingRepository.findByStatus(status);
    }
    
    public Booking updateBookingStatus(String bookingId, BookingStatusUpdateDTO update,
                                       String adminId, String adminEmail) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        booking.setStatus(update.getStatus());
        booking.setAdminComment(update.getComment());
        booking.setUpdatedAt(LocalDateTime.now());
        return bookingRepository.save(booking);
    }
    
    public Booking cancelBooking(String bookingId, String userId, String userRole) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        booking.setStatus("CANCELLED");
        booking.setUpdatedAt(LocalDateTime.now());
        return bookingRepository.save(booking);
    }
    
    public Booking getBookingById(String bookingId, String userId, String userRole) {
        return bookingRepository.findById(bookingId).orElseThrow();
    }
    
    public DashboardStats getDashboardStats() {
        DashboardStats stats = new DashboardStats();
        stats.totalPending = bookingRepository.countByStatus("PENDING");
        stats.totalApproved = bookingRepository.countByStatus("APPROVED");
        stats.totalRejected = bookingRepository.countByStatus("REJECTED");
        stats.totalCancelled = bookingRepository.countByStatus("CANCELLED");
        stats.totalBookings = stats.totalPending + stats.totalApproved + 
                              stats.totalRejected + stats.totalCancelled;
        return stats;
    }
    
    public static class DashboardStats {
        public long totalPending;
        public long totalApproved;
        public long totalRejected;
        public long totalCancelled;
        public long totalBookings;
    }
}