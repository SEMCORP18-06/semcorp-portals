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
      className={`portal-card symbol-focused-card ${portal.isSuperior ? 'superior-symbol-card' : ''}`}
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

      {/* Header Row: Symbol Emblem Badge Box & Actions */}
      <div className="card-symbol-header-row">
        <div className={`portal-symbol-badge-box ${portal.isSuperior ? 'superior-badge-box' : ''}`}>
          <img
            src={portal.symbolImg}
            alt={`SEMCORP ${portal.name} Symbol`}
            className="portal-symbol-emblem-img"
          />
        </div>

        <div className="card-header-actions">
          <span className="portal-code-badge">
            {portal.code}
          </span>

          <button
            className={`pin-btn ${portal.pinned ? 'pinned' : ''}`}
            onClick={handlePin}
            title={portal.pinned ? 'Unpin from top bar' : 'Pin to top bar'}
          >
            <Star size={15} fill={portal.pinned ? '#fbbf24' : 'none'} />
          </button>
        </div>
      </div>

      <div className="card-body-section">
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
      </div>

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
  );
}
