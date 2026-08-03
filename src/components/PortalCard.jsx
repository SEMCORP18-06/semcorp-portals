import React, { useState } from 'react';
import { ExternalLink, Star, Copy, Check, Info } from 'lucide-react';

export default function PortalCard({ portal, onTogglePin, onOpenDetail }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(portal.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onTogglePin(portal.id);
  };

  return (
    <div
      className="portal-card"
      style={{
        '--card-accent': portal.accentColor,
        '--card-accent-light': portal.accentLight || portal.accentColor,
        '--card-badge-light': portal.badgeColorLight || 'rgba(0,0,0,0.05)',
        '--card-border-light': portal.borderColorLight || 'rgba(0,0,0,0.1)',
        '--card-border-hover': portal.borderColor,
        '--launch-bg-light': portal.launchBgLight || portal.accentColor
      }}
    >
      <div className="card-accent-top-strip" />

      <div className="card-banner">
        <img
          src={portal.image || '/assets/enquiry_portal.jpg'}
          alt={portal.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="card-banner-overlay" />

        <div className="card-top-badges">
          <span className="category-tag">{portal.category}</span>
          <button
            className={`pin-btn ${portal.pinned ? 'pinned' : ''}`}
            onClick={handlePin}
            title={portal.pinned ? 'Unpin from top bar' : 'Pin to top bar'}
          >
            <Star size={16} fill={portal.pinned ? '#fbbf24' : 'none'} />
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="card-header-row">
          <a
            href={portal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="portal-title-anchor"
          >
            <span>{portal.name}</span>
            <ExternalLink size={18} className="anchor-external-icon" />
          </a>
          <span className="portal-code-badge">
            {portal.code}
          </span>
        </div>

        <p className="portal-desc">{portal.description}</p>

        {portal.quickLinks && portal.quickLinks.length > 0 && (
          <div className="quick-links-section">
            <div className="quick-links-title">Quick Actions</div>
            <div className="quick-links-grid">
              {portal.quickLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-link-chip"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>{link.label}</span>
                  <ExternalLink size={10} />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="card-actions">
          <a
            href={portal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="launch-btn"
          >
            <span>Launch Portal</span>
            <ExternalLink size={16} />
          </a>

          <button
            className="action-icon-btn"
            onClick={handleCopyLink}
            title={copied ? 'Link Copied!' : 'Copy Portal URL'}
          >
            {copied ? <Check size={18} style={{ color: '#10b981' }} /> : <Copy size={18} />}
          </button>

          <button
            className="action-icon-btn"
            onClick={() => onOpenDetail(portal)}
            title="View Details"
          >
            <Info size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
