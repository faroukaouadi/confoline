"use client";

import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";

export default function DemoPopup({ open, onClose }) {
  const [formValues, setFormValues] = useState({
    topic: "",
    persona: "",
    fullName: "",
    company: "",
    email: "",
    source: "",
    message: "",
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

  function handleClose() {
    setFormValues({ topic: "", persona: "", fullName: "", company: "", email: "", source: "", message: "" });
    setFormErrors({});
    onClose?.();
  }

  function validate(values) {
    const errors = {};
    if (!values.topic.trim()) errors.topic = "Topic is required";
    if (!values.persona.trim()) errors.persona = "Please choose one";
    if (!values.fullName.trim()) errors.fullName = "Your name is required";
    if (!values.email.trim()) {
      errors.email = "Your email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email";
    }
    if (!values.company.trim()) errors.company = "Company is required";
    if (!values.source.trim()) errors.source = "Please choose one";
    return errors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => {
      const next = { ...prev };
      const check = validate({ ...formValues, [name]: value });
      if (check[name]) next[name] = check[name]; else delete next[name];
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
      const params = new URLSearchParams(formValues);
      const endpoint = process.env.NEXT_PUBLIC_DEMO_ENDPOINT || '/demo.php';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        const errorMessage = (data && (data.error || JSON.stringify(data.errors))) || 'Unknown error';
        alert('Failed to submit demo request: ' + errorMessage);
        return;
      }
      alert("Thanks! Your demo request has been sent.");
      handleClose();
      setFormValues({ topic: "", persona: "", fullName: "", company: "", email: "", source: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-30 grid place-items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-title"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative z-10 mx-3 w-full max-w-3xl rounded-2xl border border-white/20 bg-white p-6 sm:p-8 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="demo-title" className="text-2xl sm:text-3xl font-semibold text-blue-950 text-center sm:text-left">
              Want a demo?
            </h2>
            <p className="mt-1 text-sm text-slate-600 text-center sm:text-left">
              Fill this out and we’ll send you one.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="rounded-full p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid gap-1.5">
            <label htmlFor="topic" className="text-sm font-medium text-slate-700">
              How can we help you? <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="topic"
                name="topic"
                value={formValues.topic}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-2.5 pr-10 text-slate-900 placeholder-slate-400 shadow-sm outline-none ring-cyan-400/0 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              >
                <option value="">Choose a topic</option>
                <option value="pricing">Pricing</option>
                <option value="capabilities">Capabilities</option>
                <option value="integration">Integration</option>
                <option value="other">Other</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">▾</span>
            </div>
            {formErrors.topic && (
              <p className="text-xs text-red-600">{formErrors.topic}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="persona" className="text-sm font-medium text-slate-700">
              What describes you best? <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="persona"
                name="persona"
                value={formValues.persona}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-2.5 pr-10 text-slate-900 placeholder-slate-400 shadow-sm outline-none ring-cyan-400/0 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              >
                <option value="">I am…</option>
                <option value="it">IT</option>
                <option value="business">Business</option>
                <option value="exec">Executive</option>
                <option value="partner">Partner</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">▾</span>
            </div>
            {formErrors.persona && (
              <p className="text-xs text-red-600">{formErrors.persona}</p>
            )}
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={formValues.fullName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm outline-none ring-cyan-400/0 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              placeholder="Your name"
              aria-invalid={Boolean(formErrors.fullName)}
              aria-describedby={formErrors.fullName ? "fullName-error" : undefined}
            />
            {formErrors.fullName && (
              <p id="fullName-error" className="text-xs text-red-600">
                {formErrors.fullName}
              </p>
            )}
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm outline-none ring-cyan-400/0 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              placeholder="ex: you@example.com"
              aria-invalid={Boolean(formErrors.email)}
              aria-describedby={formErrors.email ? "email-error" : undefined}
            />
            {formErrors.email && (
              <p id="email-error" className="text-xs text-red-600">
                {formErrors.email}
              </p>
            )}
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="company" className="text-sm font-medium text-slate-700">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formValues.company}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm outline-none ring-cyan-400/0 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              placeholder="Your company"
              aria-invalid={Boolean(formErrors.company)}
              aria-describedby={formErrors.company ? "company-error" : undefined}
            />
            {formErrors.company && (
              <p id="company-error" className="text-xs text-red-600">
                {formErrors.company}
              </p>
            )}
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="source" className="text-sm font-medium text-slate-700">
              How’d you hear about us? <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="source"
                name="source"
                value={formValues.source}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-2.5 pr-10 text-slate-900 placeholder-slate-400 shadow-sm outline-none ring-cyan-400/0 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              >
                <option value="">Choose one</option>
                <option value="search">Search engine</option>
                <option value="social">Social media</option>
                <option value="referral">Referral</option>
                <option value="event">Event</option>
                <option value="other">Other</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">▾</span>
            </div>
            {formErrors.source && (
              <p className="text-xs text-red-600">{formErrors.source}</p>
            )}
          </div>

          <div className="sm:col-span-2 grid gap-1.5">
            <label htmlFor="message" className="text-sm font-medium text-slate-700">
              What would you like to see?
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formValues.message}
              onChange={handleChange}
              className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm outline-none ring-cyan-400/0 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              placeholder="Describe your use case (optional)"
            />
          </div>

          <div className="sm:col-span-2 mt-4 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || hasErrors}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-cyan-500 bg-white text-cyan-700 px-8 py-3 font-semibold shadow-md transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}


