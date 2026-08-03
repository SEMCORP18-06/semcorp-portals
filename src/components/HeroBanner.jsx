import React from 'react';
import { ShieldCheck, Activity, Layers, ExternalLink } from 'lucide-react';

export default function HeroBanner({ totalPortals, activeCategory }) {
  return (
    <div className="hero-section glass-panel">
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            <span>All Enterprise Systems Online</span>
          </div>
          <h1 className="hero-title">
            Unified Access Hub for <span>SEMCORP Operations</span>
          </h1>
          <p className="hero-desc">
            Direct gateway to all SEMCORP digital platforms. Access enquiry workflows, field service management, RFQ procurement, and HRMS systems seamlessly from a single secure portal.
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--primary-cyan)' }}>
              {totalPortals}
            </div>
            <div className="stat-label">Portals Registered</div>
          </div>

          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--accent-green)' }}>
              99.9%
            </div>
            <div className="stat-label">System Uptime</div>
          </div>

          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--accent-purple)' }}>
              SSO
            </div>
            <div className="stat-label">Direct Launch</div>
          </div>
        </div>
      </div>
    </div>
  );
}
