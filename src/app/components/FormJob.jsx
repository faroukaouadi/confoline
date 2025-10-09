"use client";

import { X, Upload, Calendar } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function FormJob({ open, onClose, jobTitle = "Senior Backend Engineer", predefinedPosition }) {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: predefinedPosition || "",
    startDate: "",
    employmentStatus: "employed",
    resume: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasErrors = useMemo(() => Object.keys(formErrors).length > 0, [formErrors]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // lock background scroll when modal is open
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function handleClose() {
    setFormValues({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: predefinedPosition || "",
      startDate: "",
      employmentStatus: "employed",
      resume: null,
    });
    setFormErrors({});
    onClose?.();
  }

  function validate(values) {
    const errors = {};
    if (!values.firstName.trim()) errors.firstName = "First name is required";
    if (!values.lastName.trim()) errors.lastName = "Last name is required";
    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email";
    }
    if (!values.phone.trim()) errors.phone = "Phone number is required";
    if (!values.position.trim()) errors.position = "Please select a position";
    if (!values.startDate.trim()) errors.startDate = "Start date is required";
    if (!values.resume) errors.resume = "Resume is required";
    return errors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    // live validate the single field
    setFormErrors((prev) => {
      const next = { ...prev };
      const check = validate({ ...formValues, [name]: value });
      // copy only this field's error state
      if (check[name]) next[name] = check[name]; else delete next[name];
      return next;
    });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFormValues((prev) => ({ ...prev, resume: file }));
    setFormErrors((prev) => {
      const next = { ...prev };
      delete next.resume;
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      Object.keys(formValues).forEach(key => {
        if (key === 'resume' && formValues[key]) {
          formData.append(key, formValues[key]);
        } else if (key !== 'resume') {
          formData.append(key, formValues[key]);
        }
      });
      
      const endpoint = process.env.NEXT_PUBLIC_JOB_APPLICATION_ENDPOINT || 'https://www.confoline.com/job-application.php';
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        const errorMessage = (data && (data.error || JSON.stringify(data.errors))) || 'Unknown error';
        alert('Failed to submit your application: ' + errorMessage);
        return;
      }
      alert("Thanks! Your application has been submitted.");
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className=" fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="job-title"
      onClick={handleClose}
    >
       {/* Shadow top right */}
       <div className="absolute top-0 right-0 w-62 h-62 bg-[#51A2FF] rounded-full blur-[114px]"></div>
        {/* Shadow bottom left */}
        <div className="absolute bottom-0 left-0 w-62 h-62 bg-[#51A2FF] rounded-full blur-[114px]"></div>
       
       {/* Modal container - 90% of screen */}
       <div 
         className=" w-[90%] h-[90%] bg-[#1A337D]  rounded-2xl overflow-y-auto "
         onClick={(e) => e.stopPropagation()}
       >
       
        {/* Header with close button */}
        <div className="relative z-10 flex justify-end ">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Title */}
        <div className="relative z-10 text-center mb-6">
          <h2 id="job-title" className="text-2xl lg:text-5xl font-bold text-white">
            {jobTitle}
          </h2>
        </div>

        {/* Form Container */}
        <div className="relative z-10 max-w-5xl mx-auto pb-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:gap-8">
          {/* Personal Information - Two Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="firstName" className="text-sm font-medium text-white">
                Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={formValues.firstName}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                placeholder="First"
                aria-invalid={Boolean(formErrors.firstName)}
                aria-describedby={formErrors.firstName ? "firstName-error" : undefined}
              />
              {formErrors.firstName && (
                <p id="firstName-error" className="text-xs text-red-300">
                  {formErrors.firstName}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <label htmlFor="lastName" className="text-sm font-medium text-white">
                Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                value={formValues.lastName}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                placeholder="Last"
                aria-invalid={Boolean(formErrors.lastName)}
                aria-describedby={formErrors.lastName ? "lastName-error" : undefined}
              />
              {formErrors.lastName && (
                <p id="lastName-error" className="text-xs text-red-300">
                  {formErrors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formValues.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                placeholder="Email"
                aria-invalid={Boolean(formErrors.email)}
                aria-describedby={formErrors.email ? "email-error" : undefined}
              />
              {formErrors.email && (
                <p id="email-error" className="text-xs text-red-300">
                  {formErrors.email}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium text-white">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formValues.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                placeholder="### ### ###"
                aria-invalid={Boolean(formErrors.phone)}
                aria-describedby={formErrors.phone ? "phone-error" : undefined}
              />
              {formErrors.phone && (
                <p id="phone-error" className="text-xs text-red-300">
                  {formErrors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Position and Start Date - Two Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="position" className="text-sm font-medium text-white">
                What Position Are You Applying For
              </label>
              <div className="relative">
                <input
                  id="position"
                  name="position"
                  type="text"
                  value={formValues.position}
                  onChange={handleChange}
                  list="position-options"
                  placeholder="Type or select a position"
                  disabled={!!predefinedPosition}
                  className={`w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 ${
                    predefinedPosition ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  aria-invalid={Boolean(formErrors.position)}
                  aria-describedby={formErrors.position ? "position-error" : undefined}
                />
                <datalist id="position-options">
                  <option value="Senior Backend Engineer" />
                  <option value="Frontend Developer" />
                  <option value="Full Stack Developer" />
                  <option value="DevOps Engineer" />
                  <option value="Data Scientist" />
                  <option value="Sales" />
                  <option value="Product Manager" />
                  <option value="UX/UI Designer" />
                  <option value="Marketing Manager" />
                  <option value="Business Analyst" />
                </datalist>
                {predefinedPosition && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                )}
              </div>
              {formErrors.position && (
                <p id="position-error" className="text-xs text-red-300">
                  {formErrors.position}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <label htmlFor="startDate" className="text-sm font-medium text-white">
                Available Start Date
              </label>
              <div className="relative">
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formValues.startDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                  aria-invalid={Boolean(formErrors.startDate)}
                  aria-describedby={formErrors.startDate ? "startDate-error" : undefined}
                />
              </div>
              {formErrors.startDate && (
                <p id="startDate-error" className="text-xs text-red-300">
                  {formErrors.startDate}
                </p>
              )}
            </div>
          </div>

          {/* Employment Status - Radio Buttons */}
          <div className="grid gap-2">
            <label className="text-sm font-medium text-white">
              What Is Your Current Employment Status?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "employed", label: "Employed" },
                { value: "unemployed", label: "Unemployed" },
                { value: "self-employed", label: "Self-Employed" },
                { value: "student", label: "Student" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 rounded-xl border border-white/20 bg-white px-4 py-3 cursor-pointer hover:bg-slate-50 transition"
                >
                  <input
                    type="radio"
                    name="employmentStatus"
                    value={option.value}
                    checked={formValues.employmentStatus === option.value}
                    onChange={handleChange}
                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500"
                  />
                  <span className="text-slate-900 font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Resume Upload */}
          <div className="grid gap-2">
            <label htmlFor="resume" className="text-sm font-medium text-white">
              Upload Your Resume
            </label>
            <div className="relative">
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-invalid={Boolean(formErrors.resume)}
                aria-describedby={formErrors.resume ? "resume-error" : undefined}
              />
              <div className="w-full rounded-xl border-2 border-dashed border-white/30 bg-white/10 px-6 py-8 text-center hover:bg-white/20 transition">
                <Upload className="mx-auto h-8 w-8 text-white mb-2" />
                <p className="text-white font-medium">Choose Files Or Drag Here</p>
                <p className="text-white/70 text-sm mt-1">PDF, DOC, DOCX up to 10MB</p>
              </div>
              {formValues.resume && (
                <p className="text-white text-sm mt-2">Selected: {formValues.resume.name}</p>
              )}
              {formErrors.resume && (
                <p id="resume-error" className="text-xs text-red-300 mt-1">
                  {formErrors.resume}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting || hasErrors}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-white text-lg shadow-lg transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}