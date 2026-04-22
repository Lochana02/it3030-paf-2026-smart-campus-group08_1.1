// src/pages/user/TicketDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ticketService from '../../services/ticketService';

function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [isAdmin] = useState(false); // TODO: from auth
  const [newStatus, setNewStatus] = useState('');
  const [techId, setTechId] = useState('');
  const userId = 1; // TODO: from auth

  const loadTicket = useCallback(async () => {
    try {
      const response = await ticketService.getTicketById(id);
      setTicket(response.data);
    } catch (err) {
      console.error(err);
      alert('Could not load ticket details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadTicket();
  }, [loadTicket]);

  // Comment handlers
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await ticketService.addComment(id, userId, newComment);
      setNewComment('');
      loadTicket();
    } catch (err) {
      alert('Failed to add comment');
    }
  };

  const startEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditCommentText(comment.comment);
  };

  const handleUpdateComment = async (commentId) => {
    if (!editCommentText.trim()) return;
    try {
      await ticketService.updateComment(commentId, editCommentText, userId);
      setEditingCommentId(null);
      loadTicket();
    } catch (err) {
      alert('Failed to update comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Delete this comment?')) {
      try {
        await ticketService.deleteComment(commentId, userId);
        loadTicket();
      } catch (err) {
        alert('Failed to delete comment');
      }
    }
  };

  // Admin actions
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

  const handleDeleteTicket = async () => {
    if (window.confirm('Delete this ticket permanently?')) {
      await ticketService.deleteTicket(id);
      navigate('/my-tickets');
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
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!ticket) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">Ticket not found.</div>;
  }

  // SLA Timer calculation
  const createdTime = new Date(ticket.createdAt);
  const now = new Date();
  const hoursSince = Math.floor((now - createdTime) / (1000 * 60 * 60));
  const daysSince = Math.floor(hoursSince / 24);
  let slaTimeText = '';
  if (daysSince > 0) slaTimeText = `${daysSince} day(s) ${hoursSince % 24} hr(s)`;
  else slaTimeText = `${hoursSince} hour(s)`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/my-tickets')}
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6 transition font-medium"
        >
          ← Back to My Tickets
        </button>

        {/* Ticket Info Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex justify-between items-start flex-wrap gap-3">
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Ticket ID</span>
                <h2 className="text-2xl font-bold text-gray-800 font-mono">#{ticket.id}</h2>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm ${getStatusBadge(ticket.status)}`}>
                {ticket.status}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Title</h3>
              <p className="text-gray-800 text-lg font-semibold">{ticket.title}</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{ticket.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</h3>
                <p className="text-gray-800 font-medium">{ticket.category}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Priority</h3>
                <p className="text-gray-800 font-medium">{ticket.priority}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact Details</h3>
                <p className="text-gray-800">{ticket.contactDetails}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Created</h3>
                <p className="text-gray-800">{new Date(ticket.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {/* SLA Timer */}
            <div className="mt-2 pt-2 border-t border-gray-100">
              {ticket.status !== 'RESOLVED' && ticket.status !== 'CLOSED' ? (
                <div className="flex items-center gap-2 text-amber-600 text-sm bg-amber-50 px-3 py-2 rounded-lg">
                  <span className="material-symbols-outlined text-base">hourglass_top</span>
                  <span>⏳ Open for {slaTimeText}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 px-3 py-2 rounded-lg">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>✅ Resolved in {slaTimeText}</span>
                </div>
              )}
            </div>

            {ticket.assignedTo && (
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Assigned To</h3>
                <p className="text-gray-800">Technician ID: {ticket.assignedTo}</p>
              </div>
            )}

            {/* Attachments */}
            {ticket.attachments && ticket.attachments.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Attachments</h3>
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

        {/* Admin Actions (if admin) */}
        {isAdmin && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">admin_panel_settings</span>
              Admin Actions
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <select
                className="border border-gray-300 rounded-xl p-2 flex-1 focus:ring-2 focus:ring-blue-500"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="">Change status</option>
                <option>OPEN</option>
                <option>IN_PROGRESS</option>
                <option>RESOLVED</option>
                <option>CLOSED</option>
              </select>
              <button
                onClick={handleUpdateStatus}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition shadow-sm"
              >
                Update Status
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="number"
                placeholder="Technician ID"
                className="border border-gray-300 rounded-xl p-2 flex-1 focus:ring-2 focus:ring-green-500"
                value={techId}
                onChange={(e) => setTechId(e.target.value)}
              />
              <button
                onClick={handleAssignTechnician}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition shadow-sm"
              >
                Assign
              </button>
            </div>
            <button
              onClick={handleDeleteTicket}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition shadow-sm"
            >
              Delete Ticket
            </button>
          </div>
        )}

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">chat</span> Comments
            </h3>
          </div>

          {/* Add Comment Form */}
          <div className="p-6 bg-white border-b border-gray-100">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shadow-sm">
                  {userId}
                </div>
              </div>
              <div className="flex-1">
                <textarea
                  rows="3"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex justify-end mt-3">
                  <button
                    onClick={handleAddComment}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition shadow-md"
                  >
                    <span className="material-symbols-outlined text-sm">send</span>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="divide-y divide-gray-100">
            {ticket.comments && ticket.comments.length > 0 ? (
              ticket.comments.map((comment) => (
                <div key={comment.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold shadow-inner">
                        {comment.userId}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                        <div>
                          <span className="font-semibold text-gray-800">User {comment.userId}</span>
                          <span className="text-xs text-gray-400 ml-2">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        {comment.userId === userId && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(comment)}
                              className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-sm">edit</span> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span> Delete
                            </button>
                          </div>
                        )}
                      </div>
                      {editingCommentId === comment.id ? (
                        <div className="mt-2 space-y-2">
                          <textarea
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500"
                            rows="2"
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateComment(comment.id)}
                              className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingCommentId(null)}
                              className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-700 mt-1 leading-relaxed">{comment.comment}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500 italic">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;