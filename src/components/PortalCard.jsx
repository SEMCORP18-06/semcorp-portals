import React from 'react';
import { 
  ExternalLink, 
  Star, 
  Info 
} from 'lucide-react';

export default function PortalCard({ portal, onTogglePin, onOpenDetail }) {
  const handlePin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onTogglePin(portal.id);
  };

  return (
    <div
      className="portal-card banner-symbol-card"
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

      {/* Top 3D Symbol Banner Graphic Header */}
      <div className="card-symbol-banner-wrapper">
        <img
          src={portal.bannerImg}
          alt={`SEMCORP ${portal.name}`}
          className="card-symbol-banner-img"
        />
        <div className="card-banner-gradient-overlay" />

        <div className="banner-top-actions">
          <div className="banner-badges">
            <span className="portal-code-badge">
              {portal.code}
            </span>
          </div>

          <button
            className={`pin-btn ${portal.pinned ? 'pinned' : ''}`}
            onClick={handlePin}
            title={portal.pinned ? 'Unpin from top bar' : 'Pin to top bar'}
          >
            <Star size={15} fill={portal.pinned ? '#fbbf24' : 'none'} />
          </button>
        </div>
      </div>

      <div className="card-body-container">
        <h3 className="portal-title-heading">
          <a
            href={portal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="portal-title-anchor"
          >
            <span>{portal.name}</span>
            <ExternalLink size={17} className="anchor-external-icon" />
          </a>
        </h3>

        <div className="card-actions-footer">
          <a
            href={portal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="launch-btn"
          >
            <span>Launch Portal</span>
            <ExternalLink size={15} />
          </a>

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
