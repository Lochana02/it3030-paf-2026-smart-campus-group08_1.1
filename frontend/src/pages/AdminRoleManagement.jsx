import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  ShieldCheck, 
  UserX, 
  Filter, 
  Download, 
  UserPlus, 
  Edit, 
  UserMinus, 
  CheckCircle, 
  Ban, 
  RefreshCw, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  History,
  ArrowRight,
  LayoutGrid,
  TrendingUp,
  Bell,
  Settings,
  Search,
  Home,
  BarChart3,
  Lock,
  Zap,
  Wrench,
  HelpCircle,
  LogOut,
  FileText
} from 'lucide-react';

const UserAvatar = ({ src, alt, className = "" }) => (
  <img 
    src={src} 
    alt={alt} 
    className={`w-10 h-10 rounded-full object-cover ${className}`}
  />
);

const StatusBadge = ({ status, type }) => {
  const styles = {
    ACTIVE: "bg-emerald-100 text-emerald-800",
    PENDING: "bg-amber-100 text-amber-800",
    DISABLED: "bg-red-100 text-red-800",
    ADMIN: "bg-blue-100 text-blue-800",
    TECHNICIAN: "bg-purple-100 text-purple-800",
    USER: "bg-gray-100 text-gray-800"
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-tight ${styles[type] || styles.USER}`}>
      {status}
    </span>
  );
};

const StatCard = ({ icon: Icon, title, value, badge, badgeColor, borderColor }) => (
  <div className={`bg-white p-6 rounded-xl border-l-4 ${borderColor} shadow-sm`}>
    <div className="flex justify-between items-start mb-4">
      <Icon className={`text-3xl ${borderColor.replace('border-', 'text-')}`} />
      {badge && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${badgeColor}`}>
          {badge}
        </span>
      )}
    </div>
    <div className="text-3xl font-bold font-['Manrope'] mb-1">{value}</div>
    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</div>
  </div>
);

const SidebarNav = () => {
  const navItems = [
    { icon: Home, label: "Overview", href: "#" },
    { icon: BarChart3, label: "Analytics", href: "#" },
    { icon: Lock, label: "Security", href: "#", active: true },
    { icon: Zap, label: "Energy", href: "#" },
    { icon: Wrench, label: "Maintenance", href: "#" }
  ];
  
  const bottomItems = [
    { icon: HelpCircle, label: "Support", href: "#" },
    { icon: LogOut, label: "Sign Out", href: "#" }
  ];

  return (
    <aside className="w-64 sticky top-16 bg-gray-100 flex flex-col py-6 gap-2 text-sm hidden lg:flex h-[calc(100vh-64px)]">
      <div className="px-6 mb-6">
        <h2 className="text-lg font-black tracking-tighter text-blue-600 font-['Manrope']">Operations</h2>
        <p className="text-xs text-gray-500">Main Campus</p>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:translate-x-1 ${
              item.active 
                ? "bg-white text-blue-600 font-bold shadow-sm" 
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="px-3 pt-6 border-t border-gray-200 space-y-1">
        {bottomItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:translate-x-1"
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
};

const UserTableRow = ({ user, onApprove, onReject, onEdit, onDeactivate, onReactivate, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const roleStyles = {
    ADMIN: "bg-blue-100 text-blue-800",
    TECHNICIAN: "bg-purple-100 text-purple-800",
    USER: "bg-gray-100 text-gray-800"
  };
  
  const statusStyles = {
    ACTIVE: "bg-emerald-100 text-emerald-800",
    PENDING: "bg-amber-100 text-amber-800",
    DISABLED: "bg-red-100 text-red-800"
  };

  return (
    <tr 
      className={`border-b border-gray-100 transition-colors ${user.status === 'DISABLED' ? 'bg-red-50/30' : 'hover:bg-gray-50'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <UserAvatar 
            src={user.avatar} 
            alt={user.name}
            className={user.status === 'DISABLED' ? "grayscale opacity-60" : ""}
          />
          <div>
            <div className={`font-bold text-gray-900 ${user.status === 'DISABLED' ? 'opacity-60' : ''}`}>
              {user.name}
            </div>
            <div className={`text-xs text-gray-500 ${user.status === 'DISABLED' ? 'opacity-60' : ''}`}>
              {user.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-tight ${roleStyles[user.role]}`}>
            {user.role}
          </span>
          {user.role === 'ADMIN' && <ShieldCheck size={14} className="text-blue-600" />}
        </div>
      </td>
      <td className="px-6 py-5">
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-tight ${statusStyles[user.status]}`}>
          {user.status}
        </span>
      </td>
      <td className="px-6 py-5 text-right">
        <div className={`flex items-center justify-end gap-2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {user.status === 'PENDING' && (
            <>
              <button 
                onClick={() => onApprove(user.id)}
                className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-md hover:bg-blue-700 transition-all"
              >
                APPROVE
              </button>
              <button 
                onClick={() => onReject(user.id)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Reject"
              >
                <Ban size={18} />
              </button>
            </>
          )}
          {user.status === 'DISABLED' && (
            <>
              <button 
                onClick={() => onReactivate(user.id)}
                className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-md hover:bg-emerald-700 transition-all"
              >
                RE-ACTIVATE
              </button>
              <button 
                onClick={() => onDelete(user.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Permanent"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
          {user.status === 'ACTIVE' && (
            <>
              <button 
                onClick={() => onEdit(user.id)}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit Role"
              >
                <Edit size={18} />
              </button>
              <button 
                onClick={() => onDeactivate(user.id)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Deactivate"
              >
                <UserMinus size={18} />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Elena Sterling",
      email: "e.sterling@campushub.edu",
      role: "ADMIN",
      status: "ACTIVE",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnTOk4jthJ8IFkG7e01Ws-ury8oemol8Gdp26vT9_OR5DHI_aMAsSkK5kV23mX6wc29QcWl1kMweaQcFCY_Ha6cfmnUs4EgScEqVJR4jilQKePT24aaw0gQQ7OR_z59kpyKaiS5lWXUl001OM4FqT7B7AZCpV2PnyzPWcciWWfJ__RW4HHI5JhWVFvs4m1SmUcMQ3w9BY2e2e7ekXRx_7i3K5N-F7rgBsq6lFjck2Vxqsst8BgHCDrAPyYSNjWQ-l8fc88RC4mW9E"
    },
    {
      id: 2,
      name: "Marcus Knight",
      email: "m.knight@campushub.edu",
      role: "TECHNICIAN",
      status: "ACTIVE",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD9X2f-5Pq4BjL5W5o3kH9E0Mtg_vvOzxd-jb2Yn6WW98qlAbCXwbwVPPEFqBCL8PPpGe7dvZbcl1Bbd8f49wG1shRBc0x5kQ-XjpX6UEdGQ4C3VnkL8nR6e8qLgu9QcuAossrZM-LN8B6egPu92VKMP0h12tZEf6g4A9qgRK_fDxt7Wyb4LXh9vrCZHYSVIEqHyMv6DsstpcGDdL9S1g95DqwPvkiKxzeE-Z0-i63SQnw4zJWz02glNrXconBYMQ1BnAI5HBWtjI"
    },
    {
      id: 3,
      name: "Julian Drake",
      email: "j.drake@campushub.edu",
      role: "USER",
      status: "PENDING",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqZG8ET2CZzStgfKEVM03ivyulchtbTmJu9LpqS3KZ5_gizQt2vguZlPsW4UogeVuDDpVO3fUgFmFwvLMADkZHLEeaJl7sREz-LoA0k39e-B4Oy9GcvK5NJnKYrefXT7isjgSsGhY0PN8K48d6u-u_MJXbjyxKhj2ZHjd0IbXj5HKD5joS8OPtmkSvaNSJWhvSDfyccjv_j607BvJEJRMF643TMuEWgwfZV1j8bqfC6o1fNBJ2vW44qaAUdBQgzt4d8vfuf7N4kJ0"
    },
    {
      id: 4,
      name: "Lydia Wells",
      email: "l.wells@campushub.edu",
      role: "USER",
      status: "DISABLED",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR0GuqqzkQQ2YPM-A8i4lSWF4ZKOTDOJJaHviDRpMs-irj1gZr4S6bh7PN7i-sG6KPtrEOZcXMPQm22gTWeAyeTjO0cCfOM6Kdd2zSU_i9dMVAtrdZ3loPHhgu75oX4msF29W-tcq8nayXU7dainxq1lO87jJdP6TzstiTkHWdpVeeZHq-ZJzWCEZsGrrdM_3HfHt_cT3Pw8siPH4nNHfJYnse6CeYIHqR_-yjeIyCf9vj40NnT3tfYZvJ0gSpLcBq8Ounj5CeC9U"
    }
  ]);

  const stats = [
    { icon: Users, title: "Total Users", value: "2,482", badge: "+12%", badgeColor: "bg-emerald-100 text-emerald-800", borderColor: "border-blue-600" },
    { icon: Clock, title: "Pending Requests", value: "18", badge: "Urgent", badgeColor: "bg-amber-100 text-amber-800", borderColor: "border-purple-600" },
    { icon: ShieldCheck, title: "Active Admins", value: "142", badge: null, badgeColor: "", borderColor: "border-emerald-600" },
    { icon: UserX, title: "Deactivated Accounts", value: "07", badge: null, badgeColor: "", borderColor: "border-red-600" }
  ];

  const handleApprove = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: "ACTIVE" } : user
    ));
  };

  const handleReject = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleDeactivate = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: "DISABLED" } : user
    ));
  };

  const handleReactivate = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: "ACTIVE" } : user
    ));
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEdit = (id) => {
    console.log("Edit user:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Navigation Bar */}
      <nav className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 flex justify-between items-center px-8 h-16 w-full shadow-sm">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-gray-900 font-['Manrope'] tracking-tight">Campus Hub</span>
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600 h-16 flex items-center">Admin</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors h-16 flex items-center">Directory</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors h-16 flex items-center">Audit Logs</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              className="bg-white border-none ring-1 ring-gray-200 rounded-full pl-10 pr-4 py-1.5 text-sm w-64 focus:ring-blue-500/50 transition-all"
              placeholder="Search administrators..." 
              type="text"
            />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Settings size={20} className="text-gray-600" />
          </button>
          <UserAvatar 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyo2IhCtvB8-3xlpS_GOusge1RyhGlm0uH540yo58js4tR1YLYzYuX6UyIlNFTIQpyi8-VYbQClXUolxgo4O_j4NAsD43OTzp1B-xAPzcATmMpd70gPJnDzNYHoKubBzaolimqIcON74ZFkax4asCFIdJWzLVAPlCjgxh5hny5lc3-WpH2643Mqu_MnDGBmzFWyBFVkjeEzvoE4ZIlHJc0-LZdJbgRrK8JLETZbaVKhBgtLADDk6QWfwrbu6wd_b2SgHJtNhZYSY4"
            alt="Administrator profile"
            className="w-8 h-8 border border-gray-200"
          />
        </div>
      </nav>

      <div className="flex">
        <SidebarNav />

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12 overflow-x-hidden">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-extrabold font-['Manrope'] tracking-tight text-gray-900 mb-2">
              Role Management
            </h1>
            <p className="text-gray-500 max-w-2xl leading-relaxed">
              Administer campus access tiers and personnel permissions from a centralized command center.
            </p>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* User Table Section */}
          <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-100">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors">
                  <Filter size={16} />
                  Filter
                </button>
                <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors">
                  <Download size={16} />
                  Export
                </button>
              </div>
              <button className="w-full sm:w-auto bg-gradient-to-br from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
                <UserPlus size={18} />
                Add New Personnel
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">User Profile</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Access Role</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Account Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-right">Management Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map(user => (
                    <UserTableRow 
                      key={user.id}
                      user={user}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onEdit={handleEdit}
                      onDeactivate={handleDeactivate}
                      onReactivate={handleReactivate}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-6 border-t border-gray-100 flex justify-between items-center text-sm font-medium text-gray-500">
              <div>Showing 1-4 of 2,482 users</div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30" disabled>
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">3</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* Bottom Action Cards */}
          <div className="mt-12 flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-white p-8 rounded-2xl border border-gray-100 relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-bold font-['Manrope'] mb-2">Audit History</h3>
                <p className="text-sm text-gray-500 mb-4">Review recent role changes and administrative actions across the hub.</p>
                <a href="#" className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline">
                  View full logs
                  <ArrowRight size={14} />
                </a>
              </div>
              <History size={128} className="absolute -bottom-6 -right-6 text-gray-100 pointer-events-none group-hover:text-blue-100/50 transition-colors" />
            </div>
            <div className="flex-1 bg-blue-600 text-white p-8 rounded-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-bold font-['Manrope'] mb-2">Bulk Assign Roles</h3>
                <p className="text-sm text-blue-100 mb-4">Update permissions for entire departments or user groups instantly.</p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-all">
                  Launch Tool
                </button>
              </div>
              <FileText size={128} className="absolute -bottom-6 -right-6 text-white/10 pointer-events-none group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;