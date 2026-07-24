/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Phone, Mail, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactProps {
  currentLang: Language;
}

export default function Contact({ currentLang }: ContactProps) {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormState('submitting');

    // Simulate uplink latency
    setTimeout(() => {
      setFormState('success');
      // Reset after a moment
      setTimeout(() => {
        setFormState('idle');
        setFormData({ name: '', email: '', message: '' });
      }, 3500);
    }, 1800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="relative py-24 bg-[#0a0f1c] overflow-hidden scroll-mt-20">
      {/* Visual boundaries */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
      <div className="absolute -left-20 top-1/4 w-80 h-80 bg-[#0dd20d]/2 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Contact Info Column (Phone, email, details) */}
        <div
          className={`lg:col-span-5 flex flex-col justify-center h-full lg:sticky lg:top-28 ${
            isRtl ? 'lg:order-2 text-right items-end' : 'lg:order-1 text-left items-start'
          }`}
        >
          {/* Eyebrow */}
          <div className="inline-block px-3 py-1 bg-[#0dd20d]/10 border border-[#0dd20d]/30 text-[#0dd20d] text-[10px] uppercase tracking-[0.3em] rounded-sm mb-4 font-bold">
            {t.contact.eyebrow}
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
            {t.contact.heading}
          </h2>

          <p className="text-sm sm:text-base text-gray-400 font-sans leading-relaxed mb-10 max-w-md">
            {currentLang === 'ar'
              ? 'تواصل مع وكلائنا المعتمدين لتأمين الدعم والقطع الفنية لطائرتك الخاصة في غضون دقائق معدودة.'
              : 'Our global team is on standby 24/7. Transmit your sourcing specifications, flight profiles, or parts inquiries for instant dispatch routing.'}
          </p>

          {/* Direct channels list */}
          <div className="space-y-6 w-full">
            {/* Phone */}
            <div className={`flex gap-4 items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 rounded-sm bg-[#05070d] border border-white/10 flex items-center justify-center text-[#0dd20d] hover:border-[#0dd20d]/50 hover:shadow-[0_0_8px_rgba(13,210,13,0.3)] transition-all duration-300">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] tracking-wider text-gray-500 uppercase">
                  {t.contact.phoneLabel}
                </span>
                <span className="font-sans text-sm text-white font-medium" dir="ltr">
                  +41 (22) 799-4000
                </span>
              </div>
            </div>

            {/* Email */}
            <div className={`flex gap-4 items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 rounded-sm bg-[#05070d] border border-white/10 flex items-center justify-center text-[#0dd20d] hover:border-[#0dd20d]/50 hover:shadow-[0_0_8px_rgba(13,210,13,0.3)] transition-all duration-300">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] tracking-wider text-gray-500 uppercase">
                  {t.contact.emailContactLabel}
                </span>
                <span className="font-sans text-sm text-white font-medium">
                  ops@aivum.aero
                </span>
              </div>
            </div>

            {/* Address */}
            <div className={`flex gap-4 items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 rounded-sm bg-[#05070d] border border-white/10 flex items-center justify-center text-[#0dd20d] hover:border-[#0dd20d]/50 hover:shadow-[0_0_8px_rgba(13,210,13,0.3)] transition-all duration-300">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] tracking-wider text-gray-500 uppercase">
                  {currentLang === 'ar' ? 'الموقع الرئيسي' : 'Operations Hangar'}
                </span>
                <span className="font-sans text-sm text-gray-400">
                  {t.contact.addressLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Label Interactive Form Column */}
        <div className={`lg:col-span-7 ${isRtl ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="p-8 sm:p-10 bg-[#0a0f1c]/40 border border-white/5 rounded-sm relative shadow-xl shadow-black/20 hover:border-[#0dd20d]/20 transition-all duration-300">
            {/* Form grid pattern background */}
            <div className="absolute inset-0 bg-[radial-gradient(#131a2b_1px,transparent_1px)] [background-size:24px_24px] rounded-sm pointer-events-none opacity-40"></div>

            <form id="contact-form" onSubmit={handleSubmit} className="relative z-10 space-y-8">
              {/* Name Field with Floating Label */}
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  id="form-input-name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                  className={`peer w-full bg-[#0a0f1c]/80 border border-gray-800 text-white rounded-lg px-4 pt-6 pb-2 text-sm focus:outline-none focus:border-[#0dd20d] focus:ring-1 focus:ring-[#0dd20d] transition-all placeholder-shown:border-gray-800 ${
                    isRtl ? 'text-right' : 'text-left'
                  }`}
                />
                <label
                  htmlFor="form-input-name"
                  className={`absolute top-4 text-xs text-gray-500 duration-200 transform -translate-y-3 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#0dd20d] pointer-events-none ${
                    isRtl
                      ? 'right-4 left-auto origin-top-right'
                      : 'left-4 right-auto origin-top-left'
                  }`}
                >
                  {t.contact.nameLabel}
                </label>
              </div>

              {/* Email Field with Floating Label */}
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  id="form-input-email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                  className={`peer w-full bg-[#0a0f1c]/80 border border-gray-800 text-white rounded-lg px-4 pt-6 pb-2 text-sm focus:outline-none focus:border-[#0dd20d] focus:ring-1 focus:ring-[#0dd20d] transition-all placeholder-shown:border-gray-800 ${
                    isRtl ? 'text-right' : 'text-left'
                  }`}
                />
                <label
                  htmlFor="form-input-email"
                  className={`absolute top-4 text-xs text-gray-500 duration-200 transform -translate-y-3 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#0dd20d] pointer-events-none ${
                    isRtl
                      ? 'right-4 left-auto origin-top-right'
                      : 'left-4 right-auto origin-top-left'
                  }`}
                >
                  {t.contact.emailLabel}
                </label>
              </div>

              {/* Message Field with Floating Label */}
              <div className="relative group">
                <textarea
                  name="message"
                  id="form-input-message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder=" "
                  className={`peer w-full bg-[#0a0f1c]/80 border border-gray-800 text-white rounded-lg px-4 pt-6 pb-2 text-sm focus:outline-none focus:border-[#0dd20d] focus:ring-1 focus:ring-[#0dd20d] transition-all placeholder-shown:border-gray-800 resize-none ${
                    isRtl ? 'text-right' : 'text-left'
                  }`}
                ></textarea>
                <label
                  htmlFor="form-input-message"
                  className={`absolute top-4 text-xs text-gray-500 duration-200 transform -translate-y-3 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#0dd20d] pointer-events-none ${
                    isRtl
                      ? 'right-4 left-auto origin-top-right'
                      : 'left-4 right-auto origin-top-left'
                  }`}
                >
                  {t.contact.messageLabel}
                </label>
              </div>

              {/* Submit Button with Spinner/Checkmark States */}
              <button
                type="submit"
                id="contact-submit-btn"
                disabled={formState !== 'idle'}
                className={`w-full py-4 rounded-sm font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  formState === 'success'
                    ? 'bg-[#0dd20d]/20 text-[#0dd20d] border border-[#0dd20d]'
                    : formState === 'submitting'
                    ? 'bg-gray-800/40 text-gray-500 border border-gray-800 cursor-not-allowed'
                    : 'bg-[#0dd20d] text-[#05070d] hover:shadow-[0_0_20px_rgba(13,210,13,0.4)] focus:outline-none'
                }`}
              >
                <AnimatePresence mode="wait">
                  {formState === 'idle' && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      {t.contact.submitButton}
                    </motion.span>
                  )}

                  {formState === 'submitting' && (
                    <motion.span
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="w-4 h-4 animate-spin text-[#0dd20d]" />
                      <span>{t.contact.submittingState}</span>
                    </motion.span>
                  )}

                  {formState === 'success' && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#0dd20d]" />
                      <span className="font-semibold text-[#0dd20d]">{t.contact.successState}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
