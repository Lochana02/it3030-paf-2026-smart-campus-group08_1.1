import { useState } from "react";
import { createResource } from "../services/resourceService";

function AddResource() {
  const [form, setForm] = useState({
    name: "",
    type: "EQUIPMENT",
    status: "AVAILABLE",
    capacity: 0,
    location: "",
    availableFrom: "",
    availableTo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Resource name is required";
    if (!form.capacity || form.capacity <= 0)
      newErrors.capacity = "Valid capacity is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.availableFrom) newErrors.availableFrom = "Start time is required";
    if (!form.availableTo) newErrors.availableTo = "End time is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Sending data:", form);
      await createResource(form);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      setForm({
        name: "",
        type: "EQUIPMENT",
        status: "AVAILABLE",
        capacity: 0,
        location: "",
        availableFrom: "",
        availableTo: "",
      });
      setErrors({});
    } catch (err) {
      console.error("Error response:", err.response?.data);
      alert("Error adding resource ❌\n" + (err.response?.data || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get color based on status
  const getStatusColor = (status) => {
    switch(status) {
      case 'AVAILABLE': return 'text-green-600 bg-green-50 border-green-200';
      case 'UNAVAILABLE': return 'text-red-600 bg-red-50 border-red-200';
      case 'MAINTENANCE': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'BOOKED': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Get color based on type
  const getTypeColor = (type) => {
    switch(type) {
      case 'EQUIPMENT': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'LAB': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      case 'CLASSROOM': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'AUDITORIUM': return 'text-pink-600 bg-pink-50 border-pink-200';
      case 'VEHICLE': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const inputClasses = "w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";
  const errorClasses = "text-red-500 text-xs mt-1";

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto">
        {/* Header with icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Add New Resource
          </h1>
          <p className="text-gray-500 mt-2">Fill in the details to add a campus resource</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* NAME */}
          <div className="mb-5">
            <label className={`${labelClasses} flex items-center gap-2`}>
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              Resource Name
            </label>
            <input
              className={inputClasses}
              placeholder="e.g., Epson Projector, Room 101"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p className={errorClasses}>{errors.name}</p>}
          </div>

          {/* TYPE & STATUS - Side by side */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className={`${labelClasses} flex items-center gap-2`}>
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Type
              </label>
              <select
                className={`${inputClasses} ${getTypeColor(form.type)}`}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="EQUIPMENT">📦 Equipment</option>
                <option value="LAB">🔬 Lab</option>
                <option value="CLASSROOM">📚 Classroom</option>
                <option value="AUDITORIUM">🎭 Auditorium</option>
                <option value="VEHICLE">🚗 Vehicle</option>
                <option value="OTHER">📌 Other</option>
              </select>
            </div>

            <div>
              <label className={`${labelClasses} flex items-center gap-2`}>
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Status
              </label>
              <select
                className={`${inputClasses} ${getStatusColor(form.status)}`}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="AVAILABLE">✅ Available</option>
                <option value="UNAVAILABLE">❌ Unavailable</option>
                <option value="MAINTENANCE">🔧 Maintenance</option>
                <option value="BOOKED">📅 Booked</option>
              </select>
            </div>
          </div>

          {/* CAPACITY & LOCATION */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className={`${labelClasses} flex items-center gap-2`}>
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Capacity
              </label>
              <input
                type="number"
                className={inputClasses}
                placeholder="Number of people"
                value={form.capacity}
                onChange={(e) =>
                  setForm({ ...form, capacity: Number(e.target.value) })
                }
              />
              {errors.capacity && <p className={errorClasses}>{errors.capacity}</p>}
            </div>

            <div>
              <label className={`${labelClasses} flex items-center gap-2`}>
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Location
              </label>
              <input
                className={inputClasses}
                placeholder="Building, Floor, Room"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              {errors.location && <p className={errorClasses}>{errors.location}</p>}
            </div>
          </div>

          {/* TIME RANGE */}
          <div className="mb-6">
            <label className={`${labelClasses} flex items-center gap-2`}>
              <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Available Time
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="time"
                  className={inputClasses}
                  value={form.availableFrom}
                  onChange={(e) =>
                    setForm({ ...form, availableFrom: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  type="time"
                  className={inputClasses}
                  value={form.availableTo}
                  onChange={(e) =>
                    setForm({ ...form, availableTo: e.target.value })
                  }
                />
              </div>
            </div>
            {(errors.availableFrom || errors.availableTo) && (
              <p className={errorClasses}>{errors.availableFrom || errors.availableTo}</p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Resource...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Resource
              </span>
            )}
          </button>

          {/* SUCCESS MESSAGE */}
          {showSuccess && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl animate-bounce">
              <p className="text-green-700 text-center font-semibold flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Resource added successfully! ✅
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddResource;