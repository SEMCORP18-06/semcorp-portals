import React from 'react';
import { 
  ExternalLink, 
  Star, 
  Info, 
  HelpCircle, 
  Wrench, 
  FileText, 
  Users, 
  Globe 
} from 'lucide-react';

const PORTAL_ICONS = {
  HelpCircle: HelpCircle,
  Wrench: Wrench,
  FileText: FileText,
  Users: Users
};

export default function PortalCard({ portal, onTogglePin, onOpenDetail }) {
  const IconComponent = PORTAL_ICONS[portal.iconName] || Globe;

  const handlePin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onTogglePin(portal.id);
  };

  return (
    <div
      className="portal-card compact-card-v2"
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

      <div className="card-header-row">
        <div className="portal-symbol-icon-wrapper">
          <IconComponent size={26} className="portal-symbol-icon" />
        </div>

        <div className="card-header-badges">
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

      <div className="card-title-section">
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
