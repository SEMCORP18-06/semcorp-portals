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

export default function PortalListItem({ portal, onTogglePin, onOpenDetail }) {
  const IconComponent = PORTAL_ICONS[portal.iconName] || Globe;

  return (
    <div 
      className="portal-list-item compact-list-item"
      style={{ 
        '--card-accent': portal.accentColor,
        '--card-accent-light': portal.accentLight || portal.accentColor,
        '--card-badge-light': portal.badgeColorLight || 'rgba(0,0,0,0.05)',
        '--launch-bg-light': portal.launchBgLight || portal.accentColor
      }}
    >
      <div className="list-item-main">
        <div className="portal-symbol-icon-wrapper list-symbol">
          <IconComponent size={22} className="portal-symbol-icon" />
        </div>

        <div className="list-item-text">
          <h3 style={{ margin: 0 }}>
            <a 
              href={portal.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="portal-title-anchor"
              style={{ fontSize: '1.15rem' }}
            >
              <span>{portal.name}</span>
              <ExternalLink size={15} className="anchor-external-icon" />
            </a>
          </h3>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span className="portal-code-badge">
          {portal.code}
        </span>

        <button
          className={`pin-btn ${portal.pinned ? 'pinned' : ''}`}
          onClick={() => onTogglePin(portal.id)}
          title={portal.pinned ? 'Unpin' : 'Pin'}
        >
          <Star size={15} fill={portal.pinned ? '#fbbf24' : 'none'} />
        </button>

        <button
          className="action-icon-btn"
          onClick={() => onOpenDetail(portal)}
          title="Details"
        >
          <Info size={18} />
        </button>

        <a
          href={portal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="launch-btn"
          style={{ padding: '0.6rem 1.1rem' }}
        >
          <span>Launch</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
