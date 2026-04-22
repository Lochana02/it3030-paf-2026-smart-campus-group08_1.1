// src/pages/admin/AdminTicketList.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ticketService from '../../services/ticketService';
import AdminSidebar from '../../components/AdminSidebar';

function AdminTicketList() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await ticketService.getAllTickets();
      setTickets(response.data);
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this ticket permanently?')) {
      await ticketService.deleteTicket(id);
      fetchTickets();
    }
  };

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = searchTerm === '' ||
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        <div className="text-blue-600 text-xl">Loading tickets...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      <main className="flex-1 ml-64 p-4 md:p-6 lg:p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">Admin – All Tickets</h1>
            <p className="text-gray-500 text-sm md:text-base mt-1">Manage all incident tickets across the campus</p>
          </div>

          {/* Filters & Create Button */}
          <div className="bg-white rounded-2xl p-4 mb-8 flex flex-wrap gap-4 items-center justify-between shadow-sm">
            <div className="flex flex-wrap gap-4 flex-1 min-w-[200px]">
              <div className="relative flex-1 min-w-[180px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input
                  type="text"
                  placeholder="Search by title or description..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <select
                  className="bg-white border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Status</option>
                  <option>OPEN</option>
                  <option>IN_PROGRESS</option>
                  <option>RESOLVED</option>
                  <option>CLOSED</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => navigate('/tickets/new')}
              className="bg-blue-600 text-white px-4 md:px-5 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2 shadow-sm whitespace-nowrap text-sm md:text-base"
            >
              <span className="material-symbols-outlined text-sm md:text-base">add_circle</span>
              Create Ticket
            </button>
          </div>

          {/* Ticket Cards Grid */}
          {paginatedTickets.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center text-gray-500 shadow-sm">
              No tickets found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {paginatedTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 flex flex-col"
                >
                  <div className="p-4 md:p-5 flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-bold text-gray-400">Ticket ID</span>
                        <p className="font-mono font-bold text-blue-600 text-base md:text-lg">#{ticket.id}</p>
                      </div>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold uppercase ${getStatusBadge(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-base md:text-lg mb-1 line-clamp-1">{ticket.title}</h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{ticket.description}</p>
                    <div className="flex justify-between text-xs text-gray-400 mb-4">
                      <span>User: {ticket.createdBy}</span>
                      <span>Priority: {ticket.priority}</span>
                      <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 p-4 pt-0 border-t border-gray-100">
                    <Link
                      to={`/admin/tickets/${ticket.id}`}
                      className="flex-1 text-center bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="flex-1 text-center bg-red-50 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-600 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredTickets.length > 0 && (
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400 order-2 sm:order-1">
                Showing {(currentPage-1)*itemsPerPage+1} - {Math.min(currentPage*itemsPerPage, filteredTickets.length)} of {filteredTickets.length}
              </p>
              <div className="flex gap-2 order-1 sm:order-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p-1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i+1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(p+1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminTicketList;