import React from 'react';
import { 
  ExternalLink, 
  Star, 
  Info 
} from 'lucide-react';

export default function PortalListItem({ portal, onTogglePin, onOpenDetail }) {
  return (
    <div 
      className={`portal-list-item ${portal.isSuperior ? 'superior-list-item' : ''}`}
      style={{ 
        '--card-accent': portal.accentColor,
        '--card-accent-light': portal.accentLight || portal.accentColor,
        '--card-badge-light': portal.badgeColorLight || 'rgba(0,0,0,0.05)',
        '--launch-bg-light': portal.launchBgLight || portal.accentColor
      }}
    >
      <div className="list-item-main">
        <div className="list-item-banner-thumbnail">
          <img src={portal.symbolImg || portal.bannerImg} alt={portal.name} className="list-thumbnail-img" />
        </div>

        <div className="list-item-text">
          <h3 style={{ margin: 0 }}>
            <a 
              href={portal.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="portal-title-anchor"
              style={{ fontSize: '1.2rem' }}
            >
              <span>{portal.name}</span>
              <ExternalLink size={16} className="anchor-external-icon" />
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
          style={{ padding: '0.65rem 1.25rem' }}
        >
          <span>Launch</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
