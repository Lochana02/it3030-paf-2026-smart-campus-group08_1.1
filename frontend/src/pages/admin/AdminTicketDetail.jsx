// src/pages/admin/AdminTicketDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ticketService from '../../services/ticketService';

function AdminTicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [techId, setTechId] = useState('');

  const loadTicket = useCallback(async () => {
    try {
      const response = await ticketService.getTicketById(id);
      setTicket(response.data);
    } catch (err) {
      console.error('Failed to load ticket', err);
      alert('Could not load ticket details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadTicket();
  }, [loadTicket]);

  const handleUpdateStatus = async () => {
    if (!newStatus) return;
    await ticketService.updateStatus(id, newStatus);
    setNewStatus('');
    loadTicket();
  };

  const handleAssignTechnician = async () => {
    if (!techId) return;
    await ticketService.assignTechnician(id, parseInt(techId));
    setTechId('');
    loadTicket();
  };

  // ✅ Apply both changes in one click
  const handleApplyChanges = async () => {
    if (newStatus) await ticketService.updateStatus(id, newStatus);
    if (techId) await ticketService.assignTechnician(id, parseInt(techId));
    setNewStatus('');
    setTechId('');
    loadTicket();
    alert('Changes applied successfully!');
  };

  const handleDeleteTicket = async () => {
    if (window.confirm('Delete this ticket permanently?')) {
      await ticketService.deleteTicket(id);
      navigate('/admin/tickets');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'OPEN': return 'bg-red-100 text-red-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'RESOLVED': return 'bg-blue-100 text-blue-800';
      case 'CLOSED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-blue-600 text-xl">Loading ticket...</div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-600 text-xl">Ticket not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/tickets')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to All Tickets
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900">Admin – Manage Ticket</h1>
        </div>

        {/* Ticket Info Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ticket ID</span>
                <h2 className="text-2xl font-black text-gray-900">#{ticket.ticketId || ticket.id}</h2>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusBadge(ticket.status)}`}>
                {ticket.status}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                <p className="text-gray-900 text-lg font-medium">{ticket.title}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <p className="text-gray-600 whitespace-pre-wrap">{ticket.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-bold text-gray-700 mb-1">Category</label><p className="text-gray-800">{ticket.category}</p></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">Priority</label><p className="text-gray-800">{ticket.priority}</p></div>
              </div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1">Contact Details</label><p className="text-gray-800">{ticket.contactDetails}</p></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1">Created By</label><p className="text-gray-800">User ID: {ticket.createdBy}</p></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1">Assigned To</label><p className="text-gray-800">{ticket.assignedTo ? `Technician ID: ${ticket.assignedTo}` : 'Not assigned'}</p></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1">Created</label><p className="text-gray-800">{new Date(ticket.createdAt).toLocaleString()}</p></div>
            </div>

            {/* Attachments */}
            {ticket.attachments && ticket.attachments.length > 0 && (
              <div className="mt-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Attachments</label>
                <div className="flex flex-wrap gap-3">
                  {ticket.attachments.map((att, idx) => (
                    <a
                      key={idx}
                      href={`/api/files/${att.fileId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm bg-blue-50 px-3 py-1 rounded-full transition"
                    >
                      <span className="material-symbols-outlined text-sm">attach_file</span>
                      {att.fileName}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Admin Actions Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Admin Actions</h3>

        {/* Status update row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
          <label className="block text-xs font-bold text-gray-500 mb-1">Change Status</label>
          <select
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          >
      <option value="">Select status</option>
      <option>OPEN</option><option>IN_PROGRESS</option><option>RESOLVED</option><option>CLOSED</option>
    </select>
  </div>
  <div className="flex items-end">
    <button
      onClick={handleUpdateStatus}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-32 text-center"
    >
      Update Status
    </button>
  </div>
</div>

 {/* Assign technician row */}
<div className="flex flex-col sm:flex-row gap-4 mb-4">
  <div className="flex-1">
    <label className="block text-xs font-bold text-gray-500 mb-1">Assign Technician (ID)</label>
    <input
      type="number"
      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500"
      placeholder="Enter technician ID"
      value={techId}
      onChange={(e) => setTechId(e.target.value)}
    />
  </div>
  <div className="flex items-end">
    <button
      onClick={handleAssignTechnician}
      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-32 text-center"
    >
      Assign
    </button>
  </div>
</div>

          {/* Apply both changes at once */}
          <div className="mb-4">
            <button
              onClick={handleApplyChanges}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition shadow-md"
            >
              ✅ Apply Changes (Status + Technician)
            </button>
          </div>

          {/* Delete ticket button */}
          <button
            onClick={handleDeleteTicket}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete Ticket
          </button>
        </div>

        {/* Comments Section (admin can delete any comment) */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">comment</span>
            Comments
          </h3>
          {ticket.comments && ticket.comments.length > 0 ? (
            <div className="space-y-4">
              {ticket.comments.map(comment => (
                <div key={comment.id} className="border-b border-gray-200 pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-gray-700">User {comment.userId}</span>
                      <span className="text-xs text-gray-400 ml-2">{new Date(comment.createdAt).toLocaleString()}</span>
                    </div>
                    <button
                      onClick={async () => {
                        if (window.confirm('Delete this comment?')) {
                          await ticketService.deleteComment(comment.id, 1);
                          loadTicket();
                        }
                      }}
                      className="text-red-600 text-xs hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-600 mt-1">{comment.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminTicketDetail;