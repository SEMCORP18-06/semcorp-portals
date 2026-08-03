import React from 'react';
import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, marginBottom: '0.3rem' }}>
            <Globe size={18} style={{ color: 'var(--primary-cyan)' }} />
            <span>SEMCORP Enterprise Common Portal</span>
          </div>
          <div className="footer-text">
            © {new Date().getFullYear()} SEMCORP Group. All rights reserved. Enterprise Gateway v1.0.
          </div>
        </div>

        <div className="footer-links">
          <a href="https://semcorpemp.vercel.app/" target="_blank" rel="noopener noreferrer">Enquiry</a>
          <a href="https://service.semcogroups.com/" target="_blank" rel="noopener noreferrer">Service</a>
          <a href="https://semco-groups-procurement.vercel.app/" target="_blank" rel="noopener noreferrer">RFQ Portal</a>
          <a href="https://semcorp-hrms-portal.vercel.app/" target="_blank" rel="noopener noreferrer">HRMS</a>
        </div>
      </div>
    </footer>
  );
}
