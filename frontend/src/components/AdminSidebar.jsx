import React from 'react';
import { NavLink } from 'react-router-dom';

function AdminSidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-white shadow-lg flex flex-col py-6 z-40">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <span className="material-symbols-outlined">admin_panel_settings</span>
          </div>
          <div>
            <h2 className="text-lg font-black text-gray-800 leading-tight">Admin Console</h2>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Full Access</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        <NavLink 
          to="/admin/tickets" 
          className={({ isActive }) => 
            `flex items-center gap-4 px-6 py-3 rounded-r-full transition-all ${
              isActive ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <span className="material-symbols-outlined">confirmation_number</span> All Tickets
        </NavLink>
        <NavLink to="/admin/analytics" className="flex items-center gap-4 px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-r-full transition-all">
          <span className="material-symbols-outlined">leaderboard</span> Analytics
        </NavLink>
        <NavLink to="/admin/users" className="flex items-center gap-4 px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-r-full transition-all">
          <span className="material-symbols-outlined">group</span> Users
        </NavLink>
        <NavLink to="/admin/settings" className="flex items-center gap-4 px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-r-full transition-all">
          <span className="material-symbols-outlined">settings</span> Settings
        </NavLink>
      </nav>
      <div className="px-6 mt-auto pt-4">
        <button className="w-full bg-blue-600 text-white py-3 rounded-full font-bold text-sm shadow-lg hover:bg-blue-700 transition">
          + New Ticket
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;