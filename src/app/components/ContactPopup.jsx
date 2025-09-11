"use client";

import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";

export default function ContactPopup({ open, onClose }) {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    subject: "",
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
    setFormValues({ fullName: "", email: "", subject: "", message: "" });
    setFormErrors({});
    onClose?.();
  }

  function validate(values) {
    const errors = {};
    if (!values.fullName.trim()) errors.fullName = "Your name is required";
    if (!values.email.trim()) {
      errors.email = "Your email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email";
    }
    if (!values.subject.trim()) errors.subject = "Subject is required";
    if (!values.message.trim()) errors.message = "Message is required";
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

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      setIsSubmitting(true);
      const params = new URLSearchParams(formValues);
      const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '/contactt.php';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        const errorMessage = (data && (data.error || JSON.stringify(data.errors))) || 'Unknown error';
        alert('Failed to send your message: ' + errorMessage);
        return;
      }
      alert("Thanks! Your message has been sent.");
      handleClose();
      setFormValues({ fullName: "", email: "", subject: "", message: "" });
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
      aria-labelledby="contact-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

      {/* Popup centered */
      }
      <div className="relative z-10 mx-3 w-full max-w-lg rounded-2xl border border-white/20 bg-white p-5 sm:p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id="contact-title" className="text-xl sm:text-2xl font-semibold text-blue-950">
              Contact us
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Fill out the form and we\'ll get back to you shortly.
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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="grid gap-1.5">
            <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
              Full name
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
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm outline-none ring-cyan-400/0 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              placeholder="you@example.com"
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
            <label htmlFor="subject" className="text-sm font-medium text-slate-700">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formValues.subject}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm outline-none ring-cyan-400/0 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              placeholder="Subject of your message"
              aria-invalid={Boolean(formErrors.subject)}
              aria-describedby={formErrors.subject ? "subject-error" : undefined}
            />
            {formErrors.subject && (
              <p id="subject-error" className="text-xs text-red-600">
                {formErrors.subject}
              </p>
            )}
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="message" className="text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formValues.message}
              onChange={handleChange}
              className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm outline-none ring-cyan-400/0 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              placeholder="Describe your request..."
              aria-invalid={Boolean(formErrors.message)}
              aria-describedby={formErrors.message ? "message-error" : undefined}
            />
            {formErrors.message && (
              <p id="message-error" className="text-xs text-red-600">
                {formErrors.message}
              </p>
            )}
          </div>

          <div className="mt-2 flex items-center justify-end gap-2">
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
              className="inline-flex items-center gap-2 rounded-xl border-2 border-transparent bg-cyan-500 px-5 py-2.5 font-semibold text-white shadow-md transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
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


