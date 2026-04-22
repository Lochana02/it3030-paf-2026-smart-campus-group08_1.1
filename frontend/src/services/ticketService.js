// src/services/ticketService.js
import axios from 'axios';

const API_BASE = 'http://localhost:8081/api/tickets';

const ticketService = {
  // ========== USER ==========
  createTicket: async (formData) => {
    const response = await fetch(API_BASE, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    return response.json();
  },

  getMyTickets: (userId) => axios.get(`${API_BASE}/my?userId=${userId}`),
  getTicketById: (id) => axios.get(`${API_BASE}/${id}`),
  addComment: (ticketId, userId, comment) =>
    axios.post(`${API_BASE}/${ticketId}/comments`, { userId, comment }),
  updateComment: (commentId, newComment, userId) =>
    axios.put(`${API_BASE}/comments/${commentId}?newComment=${newComment}&userId=${userId}`),
  deleteComment: (commentId, userId) =>
    axios.delete(`${API_BASE}/comments/${commentId}?userId=${userId}`),
  getAllTickets: () => axios.get(`${API_BASE}/admin/all`),
  updateStatus: (ticketId, status) =>
    axios.put(`${API_BASE}/admin/${ticketId}/status?status=${status}`),
  assignTechnician: (ticketId, technicianId) =>
    axios.put(`${API_BASE}/admin/${ticketId}/assign?technicianId=${technicianId}`),
  deleteTicket: (ticketId) => axios.delete(`${API_BASE}/admin/${ticketId}`),
};

export default ticketService;