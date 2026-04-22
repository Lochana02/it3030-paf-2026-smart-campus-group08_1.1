import { useEffect, useState } from "react";
import { getResources } from "../services/resourceService";
import { useNavigate } from "react-router-dom";

function UserResources() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const navigate = useNavigate();

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

  // Filter logic
  const filtered = resources.filter((r) => {
    const name = r?.name?.toLowerCase() || "";
    const location = r?.location?.toLowerCase() || "";
    const searchText = search.toLowerCase();

    const matchesSearch =
      name.includes(searchText) || location.includes(searchText);

    const matchesType =
      filterType === "ALL" || r?.type === filterType;

    const matchesAvailability =
      !showAvailableOnly || r?.status === "AVAILABLE";

    return matchesSearch && matchesType && matchesAvailability;
  });

  // Status color
  const getStatusColor = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-700";
      case "IN_USE":
        return "bg-orange-100 text-orange-700";
      case "MAINTENANCE":
        return "bg-red-100 text-red-700";
      case "BOOKED":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-purple-50">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        📦 Available Resources
      </h1>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 grid md:grid-cols-3 gap-4">

        {/* SEARCH */}
        <input
          className="border p-2 rounded"
          placeholder="Search by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TYPE FILTER */}
        <select
          className="border p-2 rounded"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="ALL">All Types</option>
          <option value="EQUIPMENT">Equipment</option>
          <option value="LAB">Lab</option>
          <option value="CLASSROOM">Classroom</option>
          <option value="AUDITORIUM">Auditorium</option>
          <option value="VEHICLE">Vehicle</option>
        </select>

        {/* AVAILABLE ONLY */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={() => setShowAvailableOnly(!showAvailableOnly)}
          />
          Show Available Only
        </label>
      </div>

      {/* RESOURCE LIST */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No resources found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((res) => (
            <div
              key={res.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold">{res.name}</h2>

              <p className="text-sm text-gray-500">
                {res.type} • {res.location}
              </p>

              <p className="text-sm mt-1">
                Capacity: {res.capacity}
              </p>

              {/* STATUS */}
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(res.status)}`}
              >
                {res.status}
              </span>

              {/* BOOK BUTTON */}
              <button
                onClick={() => navigate(`/book/${res.id}`)}
                disabled={res.status !== "AVAILABLE"}
                className={`mt-4 w-full py-2 rounded text-white ${
                  res.status === "AVAILABLE"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {res.status === "AVAILABLE" ? "Book Now" : "Not Available"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserResources;