// src/pages/user/TicketForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ticketService from '../../services/ticketService';

function TicketForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'IT',
    priority: 'MEDIUM',
    createdBy: 1,
    contactDetails: '',
    email: '',
  });

  // Load draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('ticketDraft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setForm(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to load draft', e);
      }
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';

    // Contact Details validation (exactly 10 digits)
    if (!form.contactDetails.trim()) {
      newErrors.contactDetails = 'Contact details are required';
    } else if (!/^\d+$/.test(form.contactDetails)) {
      newErrors.contactDetails = 'Contact number must contain only digits';
    } else if (form.contactDetails.length !== 10) {
      newErrors.contactDetails = 'Contact number must be exactly 10 digits';
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., name@example.com)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert('You can upload up to 3 images only');
      const limited = files.slice(0, 3);
      setImages(limited);
      setImagePreviews(limited.map(file => URL.createObjectURL(file)));
    } else {
      setImages(files);
      setImagePreviews(files.map(file => URL.createObjectURL(file)));
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSaveDraft = () => {
    const draftData = {
      title: form.title,
      description: form.description,
      category: form.category,
      priority: form.priority,
      contactDetails: form.contactDetails,
      email: form.email,
    };
    localStorage.setItem('ticketDraft', JSON.stringify(draftData));
    alert('Draft saved successfully!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("=== Frontend Debug ===");
    console.log("Form object:", form);
    console.log("JSON string being sent:", JSON.stringify(form));
    console.log("Number of images:", images.length);

    setLoading(true);
    const data = new FormData();
    data.append('ticket', JSON.stringify(form));
    images.forEach(img => data.append('images', img));

    try {
      const response = await ticketService.createTicket(data);
      console.log("Success response:", response);
      localStorage.removeItem('ticketDraft');
      alert('Ticket created successfully!');
      navigate('/my-tickets');
    } catch (err) {
      console.error("Full error object:", err);
      if (err.response) {
        console.error("Backend error response status:", err.response.status);
        console.error("Backend error response data:", err.response.data);
        alert(`Error: ${err.response.data.message || err.response.statusText}`);
      } else {
        alert('Error creating ticket. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Create New Service Ticket</h1>
          <p className="text-gray-500 mt-2 text-lg">Log operational issues or maintenance requests</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="block font-semibold text-gray-700 text-sm">Ticket Title *</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., HVAC failure in Main Library Floor 3"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                    errors.title
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-blue-400 focus:border-transparent'
                  }`}
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              {/* Category & Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block font-semibold text-gray-700 text-sm">Category</label>
                  <div className="relative">
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    >
                      <option>IT</option>
                      <option>Electrical</option>
                      <option>Parking</option>
                      <option>Cleaning</option>
                      <option>Transport</option>
                      <option>Network</option>
                      <option>Academic</option>
                      <option>Library</option>
                      <option>Other</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-semibold text-gray-700 text-sm">Priority</label>
                  <div className="relative">
                    <select
                      name="priority"
                      value={form.priority}
                      onChange={handleChange}
                      className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block font-semibold text-gray-700 text-sm">Description *</label>
                <textarea
                  name="description"
                  rows="5"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the issue in detail..."
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                    errors.description
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-blue-400 focus:border-transparent'
                  }`}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              {/* Contact Details */}
              <div className="space-y-2">
                <label className="block font-semibold text-gray-700 text-sm">Contact Details *</label>
                <input
                  type="text"
                  name="contactDetails"
                  value={form.contactDetails}
                  onChange={handleChange}
                  placeholder="Phone number (10 digits)"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                    errors.contactDetails
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-blue-400 focus:border-transparent'
                  }`}
                />
                {errors.contactDetails && <p className="text-red-500 text-xs mt-1">{errors.contactDetails}</p>}
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="block font-semibold text-gray-700 text-sm">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="yourname@example.com"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-blue-400 focus:border-transparent'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Image Upload */}
              <div className="space-y-3">
                <label className="block font-semibold text-gray-700 text-sm">Images (Optional - Max 3)</label>
                <div className="flex flex-wrap gap-3">
                  {imagePreviews.map((src, idx) => (
                    <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
                      <img src={src} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-700 transition shadow-md"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {imagePreviews.length < 3 && (
                    <label className="cursor-pointer w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition group">
                      <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                      <span className="material-symbols-outlined text-gray-400 text-3xl group-hover:text-gray-500">add_a_photo</span>
                      <span className="text-xs text-gray-500 mt-1">Upload</span>
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500">Upload up to 3 images as evidence (JPG, PNG)</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {loading ? 'Submitting...' : '✅ Submit Ticket'}
                </button>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="flex-1 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  💾 Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/my-tickets')}
                  className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketForm;