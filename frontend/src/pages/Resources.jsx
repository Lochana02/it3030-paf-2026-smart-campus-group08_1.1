import { useEffect, useState } from "react";
import {
  getResources,
  updateResource,
  deleteResource,
} from "../services/resourceService";
import ResourceCard from "../components/ResourceCard";

function Resources() {
  const [resources, setResources] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [filterType, setFilterType] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");

  const [form, setForm] = useState({
    name: "",
    type: "EQUIPMENT",
    status: "AVAILABLE",
    capacity: "",
    location: "",
    availableFrom: "",
    availableTo: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getResources();
      setResources(data || []);
    } catch (err) {
      console.error(err);
      alert("Error loading resources ❌");
    }
  };

  const handleEdit = (res) => {
    setEditingId(res.id);
    setForm({
      name: res?.name || "",
      type: res?.type || "EQUIPMENT",
      status: res?.status || "AVAILABLE",
      capacity: res?.capacity || "",
      location: res?.location || "",
      availableFrom: res?.availableFrom || "",
      availableTo: res?.availableTo || "",
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    setIsUpdating(true);
    try {
      await updateResource(editingId, form);
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await deleteResource(id);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({
      name: "",
      type: "EQUIPMENT",
      status: "AVAILABLE",
      capacity: "",
      location: "",
      availableFrom: "",
      availableTo: "",
    });
  };

  // Get color for status badge
  const getStatusColor = (status) => {
    switch(status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-700 border-green-200';
      case 'IN_USE': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'UNAVAILABLE': return 'bg-red-100 text-red-700 border-red-200';
      case 'MAINTENANCE': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'BOOKED': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Get color for type badge
  const getTypeColor = (type) => {
    switch(type) {
      case 'EQUIPMENT': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'LAB': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'CLASSROOM': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'AUDITORIUM': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'VEHICLE': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'ROOM': return 'bg-teal-100 text-teal-700 border-teal-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filtered = (resources || [])
    .filter((r) => {
      const name = r?.name?.toLowerCase() || "";
      const location = r?.location?.toLowerCase() || "";
      const searchText = search.toLowerCase();

      const matchesSearch =
        name.includes(searchText) || location.includes(searchText);

      const matchesType =
        filterType === "ALL" || r?.type === filterType;

      const matchesStatus =
        filterStatus === "ALL" || r?.status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "name")
        return (a?.name || "").localeCompare(b?.name || "");
      if (sortBy === "capacity")
        return (a?.capacity || 0) - (b?.capacity || 0);
      return 0;
    });

  const inputClasses =
    "w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      
      {/* HEADER SECTION */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">📦</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Resource Management
              </h1>
            </div>
            <p className="text-gray-500 ml-14">Manage and track all campus resources</p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-white rounded-xl shadow-sm p-1 border border-gray-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>🔲</span> Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>📋</span> List
            </button>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-3 text-white shadow-lg">
          <p className="text-xs opacity-90">Total</p>
          <p className="text-2xl font-bold">{resources.length}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-3 text-white shadow-lg">
          <p className="text-xs opacity-90">Available</p>
          <p className="text-2xl font-bold">{resources.filter(r => r?.status === 'AVAILABLE').length}</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-3 text-white shadow-lg">
          <p className="text-xs opacity-90">In Use</p>
          <p className="text-2xl font-bold">{resources.filter(r => r?.status === 'IN_USE').length}</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-3 text-white shadow-lg">
          <p className="text-xs opacity-90">Maintenance</p>
          <p className="text-2xl font-bold">{resources.filter(r => r?.status === 'MAINTENANCE').length}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-3 text-white shadow-lg">
          <p className="text-xs opacity-90">Booked</p>
          <p className="text-2xl font-bold">{resources.filter(r => r?.status === 'BOOKED').length}</p>
        </div>
      </div>

      {/* FILTERS SECTION */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🔍</span>
          <h2 className="font-semibold text-gray-700">Filters & Search</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Search</label>
            <input
              className={inputClasses}
              placeholder="🔎 Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Resource Type</label>
            <select
              className={inputClasses}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="ALL">📌 All Types</option>
              <option value="EQUIPMENT">📦 Equipment</option>
              <option value="LAB">🔬 Lab</option>
              <option value="CLASSROOM">📚 Classroom</option>
              <option value="AUDITORIUM">🎭 Auditorium</option>
              <option value="VEHICLE">🚗 Vehicle</option>
              <option value="ROOM">🏠 Room</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Status</label>
            <select
              className={inputClasses}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="ALL">🔄 All Status</option>
              <option value="AVAILABLE">✅ Available</option>
              <option value="IN_USE">⚡ In Use</option>
              <option value="MAINTENANCE">🔧 Maintenance</option>
              <option value="BOOKED">📅 Booked</option>
              <option value="UNAVAILABLE">❌ Unavailable</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Sort By</label>
            <select
              className={inputClasses}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">📝 Name</option>
              <option value="capacity">👥 Capacity</option>
            </select>
          </div>
        </div>
      </div>

      {/* EDIT FORM MODAL */}
      {editingId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={handleCancelEdit}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✏️</span>
                  <h2 className="text-2xl font-bold">Edit Resource</h2>
                </div>
                <button onClick={handleCancelEdit} className="text-white/80 hover:text-white text-2xl">×</button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  className={inputClasses}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <select
                    className={inputClasses}
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="EQUIPMENT">Equipment</option>
                    <option value="LAB">Lab</option>
                    <option value="CLASSROOM">Classroom</option>
                    <option value="AUDITORIUM">Auditorium</option>
                    <option value="VEHICLE">Vehicle</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    className={inputClasses}
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="IN_USE">In Use</option>
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="BOOKED">Booked</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Capacity</label>
                  <input
                    type="number"
                    className={inputClasses}
                    value={form.capacity}
                    onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input
                    className={inputClasses}
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Available From</label>
                  <input
                    type="time"
                    className={inputClasses}
                    value={form.availableFrom}
                    onChange={(e) => setForm({ ...form, availableFrom: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Available To</label>
                  <input
                    type="time"
                    className={inputClasses}
                    value={form.availableTo}
                    onChange={(e) => setForm({ ...form, availableTo: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isUpdating ? "Updating..." : "✅ Update Resource"}
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESOURCES DISPLAY */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No resources found</h3>
          <p className="text-gray-500">Try adjusting your filters or add a new resource</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((res) => (
            <ResourceCard
              key={res.id}
              resource={res}
              onEdit={handleEdit}
              onDelete={handleDelete}
              getStatusColor={getStatusColor}
              getTypeColor={getTypeColor}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Resource</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Capacity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((res, idx) => (
                  <tr key={res.id} className="hover:bg-gray-50 transition-all duration-200">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">{res.name}</p>
                        <p className="text-xs text-gray-400">{res.availableFrom} - {res.availableTo}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(res.type)}`}>
                        {res.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(res.status)}`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{res.capacity} people</td>
                    <td className="px-6 py-4 text-gray-600">{res.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(res)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(res.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resources;