import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './contact.css';

export default function Contact() {
  const form = useRef();
  const [formState, setFormState] = useState('idle'); // idle, loading, success, error
  const [countryCode, setCountryCode] = useState('+91');

  // WhatsApp configuration
  const whatsappNumber = "917561001809";
  const whatsappMessage = "Hi, I’m looking to build a project. Can you guide me on the next steps?";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');

    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: `${countryCode} ${formData.get('phone')}`,
      service: formData.get('service'),
      message: formData.get('message'),
    };

    const SERVICE_ID = 'service_bqpsjea';
    const TEMPLATE_ID = 'template_y50cl49';
    const PUBLIC_KEY = 'b1Ai5cTZ-x1AFBJG0';

    emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY)
      .then((result) => {
        setFormState('success');
        form.current.reset();
        setTimeout(() => setFormState('idle'), 5000);
      }, (error) => {
        setFormState('error');
        setTimeout(() => setFormState('idle'), 5000);
      });
  };

  const countries = [
    { code: '+91', label: 'IN', name: 'India' },
    { code: '+1', label: 'US', name: 'USA' },
    { code: '+44', label: 'UK', name: 'UK' },
    { code: '+971', label: 'AE', name: 'UAE' },
    { code: '+61', label: 'AU', name: 'Australia' },
    { code: '+1', label: 'CA', name: 'Canada' },
    { code: '+49', label: 'DE', name: 'Germany' },
    { code: '+33', label: 'FR', name: 'France' },
    { code: '+65', label: 'SG', name: 'Singapore' },
  ];

  return (
    <section className="contact-section">
      <div className="contact-grid">

      {/* 1. Contact Details */}
      <div className="contact-block">
        <div className="contact-block-header">
          <span className="section-eyebrow">Get in touch</span>
          <h2 className="section-title">Contact us</h2>
          <p>Reach out to us through any of the channels below. We're always here to help you turn your ideas into reality.</p>
        </div>

        <div className="contact-details-grid">
          <a
            href="mailto:info@codviser.com"
            className="contact-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </div>
            <div className="contact-card-info">
              <h4>Email</h4>
              <p>info@codviser.com</p>
            </div>
          </a>
          <a
            href="tel:+917561001809"
            className="contact-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </div>
            <div className="contact-card-info">
              <h4>Phone</h4>
              <p>+91 7561001809</p>
            </div>
          </a>
          <a
            href={whatsappUrl}
            className="contact-card"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" /><path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" /><path d="M9 14a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Z" /><path d="M14 14a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Z" /></svg>
            </div>
            <div className="contact-card-info">
              <h4>WhatsApp</h4>
              <p>+91 7561001809</p>
            </div>
          </a>
        </div>
      </div>

      {/* 3. Connect With Us */}
      <div className="contact-block">
        <div className="contact-block-header">
          <span className="section-eyebrow">Connect with us</span>
          <h2 className="section-title">Follow our work</h2>
          <p>Stay updated with our latest projects, insights, and agency news on social media.</p>
        </div>

        <div className="social-pills">
          <a href="https://www.linkedin.com/company/codviser" className="social-pill" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
            LinkedIn
          </a>
          <a
            href="javascript:void(0)"
            className="social-pill"
            onClick={(e) => { e.preventDefault(); window.open('https://www.facebook.com/Codviser', '_blank'); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            Facebook
          </a>
          <a href="https://www.instagram.com/codviser_?igsh=eWZ5MzZsOHQ1cWl2&utm_source=qr" className="social-pill" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            Instagram
          </a>
          <a href={whatsappUrl} className="social-pill" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" /><path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" /><path d="M9 14a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Z" /><path d="M14 14a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Z" /></svg>
            WhatsApp
          </a>
          <a href="https://x.com/codviser" className="social-pill" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
            Twitter / X
          </a>
        </div>
      </div>

      {/* 2. Form */}
      <div className="contact-block">
        <div className="contact-block-header">
          <span className="section-eyebrow">Send us a message</span>
          <h2 className="section-title">Drop us a line</h2>
          <p>Fill out the form below and our team will get back to you within 24 hours.</p>
        </div>

        <form ref={form} className="contact-form" onSubmit={handleFormSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full name</label>
              <input type="text" id="name" name="name" className="form-input" placeholder="Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" id="email" name="email" className="form-input" placeholder="Email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone number</label>
              <div className="phone-input-wrapper">
                <select 
                  className="phone-country-select"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {countries.map((c) => (
                    <option key={`${c.label}-${c.code}`} value={c.code}>
                      {c.label} ({c.code})
                    </option>
                  ))}
                </select>
                <input type="tel" id="phone" name="phone" className="form-input phone-input" placeholder="Phone number" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="service" className="form-label">Service interested in</label>
              <select id="service" name="service" className="form-select" defaultValue="" required>
                <option value="" disabled>Select a service</option>
                <option value="web">Web development</option>
                <option value="mobile">Mobile app development</option>
                <option value="uiux">UI/UX design</option>
                <option value="ads">Ads marketing</option>
                <option value="branding">Branding</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" name="message" className="form-textarea" placeholder="Tell us about your project..." required></textarea>
            </div>
          </div>
          <div className="form-submit-wrapper">
            <button
              type="submit"
              className={`btn-primary btn-submit ${formState === 'success' ? 'sent' : ''} ${formState === 'loading' ? 'loading' : ''}`}
              disabled={formState === 'loading'}
            >
              {formState === 'loading' ? 'Sending...' : formState === 'success' ? 'Sent ✓' : formState === 'error' ? 'Failed! Try again' : 'Send message'}
            </button>
          </div>
        </form>
      </div>

      </div>
    </section>
  );
}
