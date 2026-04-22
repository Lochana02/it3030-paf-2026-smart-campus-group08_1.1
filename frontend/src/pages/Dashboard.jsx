import { useEffect, useState } from "react";
import { getResources } from "../services/resourceService";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const navigate = useNavigate(); 
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getResources();
      const safeData = Array.isArray(data) ? data : [];
      setResources(safeData);

      const activities = [];
      
      if (safeData.length > 0) {
        safeData.forEach((resource, index) => {
          let actionText = "";
          let actionIcon = "";
          
          switch(resource?.status) {
            case "AVAILABLE":
              actionText = "Available";
              actionIcon = "✅";
              break;
            case "IN_USE":
              actionText = "In Use";
              actionIcon = "⚡";
              break;
            case "MAINTENANCE":
              actionText = "Maintenance";
              actionIcon = "🔧";
              break;
            case "BOOKED":
              actionText = "Booked";
              actionIcon = "📅";
              break;
            default:
              actionText = "Resource";
              actionIcon = "📦";
          }
          
          activities.push({
            id: index + 1,
            action: `${actionIcon} ${actionText}`,
            resource: resource?.name || "Unknown",
            time: "Recently",
            color: "text-blue-600"
          });
        });
      } else {
        activities.push({
          id: 1,
          action: "📭 No Resources",
          resource: "Add a resource to get started",
          time: "Now",
          color: "text-gray-500"
        });
      }
      
      setRecentActivity(activities);
      
    } catch (err) {
      console.error(err);
      setResources([]);
      setRecentActivity([
        {
          id: 1,
          action: "❌ Error",
          resource: "Failed to load",
          time: "Just now",
          color: "text-red-600"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const availableCount = resources.filter((r) => r?.status === "AVAILABLE").length;
  const maintenanceCount = resources.filter((r) => r?.status === "MAINTENANCE").length;
  const inUseCount = resources.filter((r) => r?.status === "IN_USE" || r?.status === "UNAVAILABLE").length;
  const bookedCount = resources.filter((r) => r?.status === "BOOKED").length;

  // ============================================
  // PIE CHART DATA - From Current Resources
  // ============================================
  const pieChartData = [
    { name: 'Available', value: availableCount, color: '#10b981' },
    { name: 'In Use', value: inUseCount, color: '#f59e0b' },
    { name: 'Maintenance', value: maintenanceCount, color: '#ef4444' },
    { name: 'Booked', value: bookedCount, color: '#8b5cf6' }
  ].filter(item => item.value > 0);  // Only show status that have > 0 resources

  // Custom colors for pie chart
  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const stats = [
    { 
      title: "Total Resources", 
      value: resources.length,
      icon: "🏢",
      bgColor: "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700",
      textColor: "text-white",
      borderColor: "border-blue-200",
      shadow: "shadow-blue-500/20"
    },
    { 
      title: "Available", 
      value: availableCount,
      icon: "✅",
      bgColor: "bg-gradient-to-br from-emerald-500 via-green-500 to-teal-700",
      textColor: "text-white",
      borderColor: "border-green-200",
      shadow: "shadow-green-500/20"
    },
    { 
      title: "In Use", 
      value: inUseCount,
      icon: "⚡",
      bgColor: "bg-gradient-to-br from-amber-500 via-orange-500 to-red-700",
      textColor: "text-white",
      borderColor: "border-orange-200",
      shadow: "shadow-orange-500/20"
    },
    { 
      title: "Maintenance", 
      value: maintenanceCount,
      icon: "🔧",
      bgColor: "bg-gradient-to-br from-rose-500 via-red-500 to-pink-700",
      textColor: "text-white",
      borderColor: "border-red-200",
      shadow: "shadow-red-500/20"
    },
    { 
      title: "Booked", 
      value: bookedCount,
      icon: "📅",
      bgColor: "bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-700",
      textColor: "text-white",
      borderColor: "border-purple-200",
      shadow: "shadow-purple-500/20"
    }
  ];

  const getStatusBadgeColor = (status) => {
    switch(status) {
      case 'AVAILABLE': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'IN_USE': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'MAINTENANCE': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'BOOKED': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getResourceIcon = (type) => {
    const icons = {
      'EQUIPMENT': '📦',
      'LAB': '🔬',
      'CLASSROOM': '📚',
      'AUDITORIUM': '🎭',
      'VEHICLE': '🚗',
      'ROOM': '🏠'
    };
    return icons[type] || '📌';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="relative">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🏫</span>
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative p-6 lg:p-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                  <span className="text-2xl">🏫</span>
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Smart Campus
                  </h1>
                  <p className="text-sm text-gray-500">Real-time resource monitoring & analytics</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Live</span>
                  <span className="text-xs text-gray-400">|</span>
                  <span className="text-sm text-gray-600">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
              <button 
                onClick={fetchData}
                className="px-4 py-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-gray-600 hover:text-indigo-600 group"
              >
                <span className="group-hover:rotate-180 transition-transform duration-500">🔄</span>
                <span className="text-sm font-semibold">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-8">
          {stats.map((s, i) => (
            <div
              key={i}
              onClick={() => setSelectedMetric(i)}
              className={`${s.bgColor} ${s.shadow} p-4 lg:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 cursor-pointer border ${s.borderColor} group`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300">{s.icon}</span>
                <span className="text-white/80 text-xs font-semibold bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                  Metric
                </span>
              </div>
              <p className={`${s.textColor} text-xs lg:text-sm font-semibold opacity-90`}>{s.title}</p>
              <h2 className={`${s.textColor} text-2xl lg:text-3xl font-bold mt-2`}>{s.value}</h2>
              <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white/50 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min((s.value / (stats[0].value || 1)) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================ */}
        {/* NEW: PIE CHART SECTION - Resource Status Distribution */}
        {/* ============================================ */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">🥧</span>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Resource Status Distribution
              </h2>
              <div className="ml-auto text-xs text-gray-400">
                Based on {resources.length} total resources
              </div>
            </div>
            
            {pieChartData.length > 0 ? (
              <div className="grid lg:grid-cols-2 gap-4">
                {/* Pie Chart */}
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} resources`, 'Count']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legend with Counts */}
                <div className="flex flex-col justify-center space-y-3">
                  {pieChartData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="font-medium text-gray-700">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold" style={{ color: item.color }}>
                          {item.value}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({((item.value / resources.length) * 100).toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Total */}
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl mt-2">
                    <span className="font-semibold text-gray-700">Total Resources</span>
                    <span className="text-2xl font-bold text-indigo-600">{resources.length}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-3">📊</div>
                <p className="text-gray-500">No resource data available to display chart</p>
                <button 
                  onClick={() => navigate('/add')}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                >
                  + Add Your First Resource
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Recent Activity Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">📋</span>
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Recent Activity
                </h2>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span>Live feed</span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              </div>
            </div>

            {recentActivity.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-3">📭</div>
                <p className="text-gray-500">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                {recentActivity.map((a, idx) => (
                  <div
                    key={a.id}
                    className="group flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-200 animate-slideIn"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-lg">{a.action.split(' ')[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">{a.action}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <span>📍</span> {a.resource}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{a.time}</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Resource Distribution Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">📊</span>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Resource Distribution
              </h2>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
              {resources.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-3">📦</div>
                  <p className="text-gray-500">No resources available</p>
                  <button 
                    onClick={() => navigate('/add')}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                  >
                    + Add Your First Resource
                  </button>
                </div>
              ) : (
                resources.slice(0, 8).map((resource, idx) => (
                  <div
                    key={resource.id || idx}
                    className="group flex items-center justify-between p-3 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 bg-gradient-to-r from-gray-50 to-white hover:border-emerald-200 animate-slideIn"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${getStatusBadgeColor(resource?.status)}`}>
                        <span className="text-lg">{getResourceIcon(resource?.type)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                          {resource?.name || 'Unnamed Resource'}
                        </p>
                        <p className="text-xs text-gray-400">
                          {resource?.type || 'Unknown'} • Capacity: {resource?.capacity || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(resource?.status)}`}>
                        {resource?.status || 'UNKNOWN'}
                      </span>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <span>📍</span> {resource?.location || 'No location'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {resources.length > 0 && (
              <div className="mt-5 pt-3 border-t border-gray-200 text-center">
                <button 
                  onClick={() => navigate('/resources')}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:gap-3 group"
                >
                  <span>View All Resources</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Click Details Modal */}
        {selectedMetric !== null && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn" onClick={() => setSelectedMetric(null)}>
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${stats[selectedMetric].bgColor} rounded-xl flex items-center justify-center shadow-lg`}>
                    <span className="text-2xl">{stats[selectedMetric].icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{stats[selectedMetric].title}</h3>
                </div>
                <button onClick={() => setSelectedMetric(null)} className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 rounded-full hover:bg-gray-100 transition">×</button>
              </div>
              <div className="mb-4 text-center">
                <p className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {stats[selectedMetric].value}
                </p>
                <p className="text-gray-500 mt-2">Total count for this metric</p>
              </div>
              <div className="mt-6">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                    style={{ width: `${Math.min((stats[selectedMetric].value / (stats[0].value || 1)) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  {Math.round((stats[selectedMetric].value / (stats[0].value || 1)) * 100)}% of total resources
                </p>
              </div>
              <button 
                onClick={() => setSelectedMetric(null)}
                className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #4f46e5, #9333ea);
        }
      `}</style>
    </div>
  );
}

export default Dashboard;