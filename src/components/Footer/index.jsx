import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="inner">
        <div className="footer-inner">
          <div className="footer-copy">
            © {currentYear} Codviser. All rights reserved.
          </div>
          <ul className="footer-links">
            <li><Link to="/faq">FAQ</Link></li>
            <li><a href="https://www.linkedin.com/company/codviser" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://x.com/codviser" target="_blank" rel="noopener noreferrer">X</a></li>
            <li><a href="https://www.facebook.com/Codviser" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.instagram.com/codviser_?igsh=eWZ5MzZsOHQ1cWl2&utm_source=qr" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href={`https://wa.me/917561001809?text=${encodeURIComponent("Hi,I’m looking to build a project. Can you guide me on the next steps?")}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
