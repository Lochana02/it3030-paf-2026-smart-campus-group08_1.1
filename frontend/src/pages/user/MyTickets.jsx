// src/pages/user/MyTickets.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ticketService from '../../services/ticketService';

function MyTickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const userId = 1;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await ticketService.getMyTickets(userId);
        setTickets(response.data);
      } catch (err) {
        console.error('Failed to fetch tickets:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = searchTerm === '' ||
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || ticket.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalTickets = tickets.length;
  const activeIssues = tickets.filter(t => t.status === 'OPEN' || t.status === 'IN_PROGRESS').length;
  const resolvedCount = tickets.filter(t => t.status === 'RESOLVED' || t.status === 'CLOSED').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'OPEN': return 'bg-red-100 text-red-700';
      case 'IN_PROGRESS': return 'bg-amber-100 text-amber-700';
      case 'RESOLVED': return 'bg-blue-100 text-blue-700';
      case 'CLOSED': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'IT': return 'wifi_off';
      case 'Electrical': return 'ac_unit';
      case 'Parking': return 'local_parking';
      case 'Cleaning': return 'cleaning_services';
      case 'Transport': return 'directions_bus';
      case 'Network': return 'wifi';
      case 'Academic': return 'school';
      case 'Library': return 'local_library';
      default: return 'report_problem';
    }
  };

  const getIconBg = (category) => {
    switch (category) {
      case 'IT': return 'bg-indigo-100 text-indigo-600';
      case 'Electrical': return 'bg-red-100 text-red-600';
      case 'Plumbing': return 'bg-sky-100 text-sky-600';
      default: return 'bg-gray-100 text-gray-600';
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
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Side Navigation - hidden on mobile, visible on large screens */}
      <aside className="hidden lg:block h-screen w-64 fixed left-0 top-0 z-50 bg-white shadow-xl flex flex-col py-6">
        <div className="px-6 mb-8">
          <h1 className="font-black text-blue-900 uppercase tracking-wider text-lg">Operations Hub</h1>
          <p className="text-[10px] text-gray-500 font-medium uppercase mt-1">University Admin</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link to="/admin/tickets" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg mx-2 my-1 transition-all duration-200">
            <span className="material-symbols-outlined mr-3">dashboard</span>
            <span className="text-sm font-medium">Admin Ticket Details</span>
          </Link>
          <Link to="/my-tickets" className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg mx-2 my-1 shadow-sm transition-all duration-200">
            <span className="material-symbols-outlined mr-3">confirmation_number</span>
            <span className="text-sm font-medium">My Tickets</span>
          </Link>
          <Link to="/tickets/new" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg mx-2 my-1 transition-all duration-200">
            <span className="material-symbols-outlined mr-3">add_circle</span>
            <span className="text-sm font-medium">Create Ticket</span>
          </Link>
          <Link to="/admin/tickets" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg mx-2 my-1 transition-all duration-200">
            <span className="material-symbols-outlined mr-3">leaderboard</span>
            <span className="text-sm font-medium">Admin Ticket List</span>
          </Link>
        </nav>
        <div className="px-4 mb-6">
          <button
            onClick={() => navigate('/tickets/new')}
            className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            Report Incident
          </button>
        </div>
        <div className="mt-auto border-t border-gray-200 pt-4">
          <Link to="/support" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg mx-2 my-1 transition-all duration-200">
            <span className="material-symbols-outlined mr-3">headset_mic</span>
            <span className="text-sm font-medium">Support</span>
          </Link>
          <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg mx-2 my-1 w-full text-left transition-all duration-200">
            <span className="material-symbols-outlined mr-3">logout</span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content - no margin on mobile, margin on large screens */}
      <main className="min-h-screen lg:ml-64">
        {/* Top Bar */}
        <header className="w-full sticky top-0 z-40 bg-white/90 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 h-16 shadow-sm">
          <div className="flex items-center gap-4 sm:gap-6 flex-1">
            <div className="relative flex-1 max-w-xs sm:max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input
                type="text"
                placeholder="Search operations..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <span className="material-symbols-outlined">help_outline</span>
            </button>
            <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 ring-2 ring-white">
              <img
                alt="User Profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_QSwD3jBVkOLbt-X6b2lptEKIfIZsjOkPII0DnlNrYsxHD4EOpci1QirLptuZjngk8hEq00bB3l9PudMRzK_rrEaZEvNTKgXZ3uvcBELKjCYmWb8hhCWYXVhSPoTdNxrPB9Q6VhXhG0BzxgbC0uNg40S-f0nsE013m6_4fSuFxdT-XrA_nsl6ujhtmtF3eqvUnqS10xGXBj78m4F1D89sSy9enGeZrM88L-FkONqJTVaY4bMvq8B2Vzr4fQzp7Wz43zKjzpvGn86Y"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Metric Cards */}
          <div className="mb-10">
            <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tighter">Ticket Command</h2>
              <p className="text-sm text-gray-500 font-medium">Operational Status: <span className="text-green-600 font-bold">Stable</span></p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-600">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Tickets</span>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-5xl font-extrabold text-gray-800 tracking-tighter">{totalTickets}</span>
                  <span className="material-symbols-outlined text-gray-300 text-4xl">confirmation_number</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-amber-500">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Active Issues</span>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-5xl font-extrabold text-gray-800 tracking-tighter">{activeIssues}</span>
                  <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse mb-2"></div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Resolved Units</span>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-5xl font-extrabold text-gray-800 tracking-tighter">{resolvedCount}</span>
                  <span className="material-symbols-outlined text-gray-300 text-4xl">check_circle</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters & Actions */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
            <div className="col-span-1 md:col-span-8 bg-white rounded-2xl p-4 shadow-sm flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[180px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input
                  type="text"
                  placeholder="Search by title or description..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="IT">IT</option>
                <option value="Electrical">Electrical</option>
                <option value="Parking">Parking</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Transport">Transport</option>
                <option value="Network">Network</option>
                <option value="Academic">Academic</option>
                <option value="Library">Library</option>
                <option value="Other">Other</option>
              </select>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm">
                Export Logs
              </button>
            </div>
            <div className="col-span-1 md:col-span-4 bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between border border-gray-100">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">JD</div>
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">MK</div>
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">RW</div>
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">+12</div>
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-tighter">On-Site Dispatchers</p>
            </div>
          </div>

          {/* Tickets Table - with horizontal scroll on small screens */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 sm:px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Ticket ID</th>
                    <th className="px-4 sm:px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Issue Description</th>
                    <th className="px-4 sm:px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Location</th>
                    <th className="px-4 sm:px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Reported</th>
                    <th className="px-4 sm:px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedTickets.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-8 py-12 text-center text-gray-500">No tickets found.</td>
                  </tr>
                  ) : (
                    paginatedTickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="hover:bg-gray-50 transition-all duration-150 cursor-pointer group"
                        onClick={() => navigate(`/tickets/${ticket.id}`)}
                      >
                        <td className="px-4 sm:px-8 py-5 font-mono font-bold text-blue-600">#{ticket.id}</td>
                        <td className="px-4 sm:px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getIconBg(ticket.category)}`}>
                              <span className="material-symbols-outlined text-xl">{getCategoryIcon(ticket.category)}</span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{ticket.title}</p>
                              <p className="text-xs text-gray-400">{ticket.description.substring(0, 60)}…</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-5 text-sm text-gray-600">{ticket.location || 'Not specified'}</td>
                        <td className="px-4 sm:px-6 py-5 text-sm text-gray-500">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 sm:px-6 py-5 text-right">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {filteredTickets.length > 0 && (
              <div className="px-4 sm:px-6 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-gray-400">
                  Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredTickets.length)} of {filteredTickets.length}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                        currentPage === page
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Campus Map View</h3>
                <p className="text-blue-200 text-sm mb-6 max-w-xs">Visually locate all active maintenance requests.</p>
                <button className="bg-white text-blue-900 px-6 py-2.5 rounded-full text-xs font-bold hover:bg-gray-100 transition-all shadow-md">
                  Open Interactive Map
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl group-hover:scale-125 transition-transform"></div>
              <span className="material-symbols-outlined absolute top-8 right-8 text-white/20 text-8xl">map</span>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-amber-600">auto_awesome</span>
                  <span className="text-xs font-black uppercase tracking-wider text-gray-500">Maintenance Insight</span>
                </div>
                <p className="text-lg font-bold text-gray-800 mb-2">Predictive analysis suggests HVAC maintenance in East Hall within 72 hours.</p>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="h-1.5 flex-1 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-3/4 rounded-full"></div>
                </div>
                <span className="text-xs font-bold text-amber-600">75% Probability</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyTickets;