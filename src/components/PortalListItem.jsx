import React, { useState } from 'react';
import { ExternalLink, Star, Copy, Check, Info } from 'lucide-react';

export default function PortalListItem({ portal, onTogglePin, onOpenDetail }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(portal.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="portal-list-item"
      style={{ 
        '--card-accent': portal.accentColor,
        '--card-accent-light': portal.accentLight || portal.accentColor,
        '--card-badge-light': portal.badgeColorLight || 'rgba(0,0,0,0.05)',
        '--launch-bg-light': portal.launchBgLight || portal.accentColor
      }}
    >
      <div className="list-item-main">
        <div className="list-item-icon">
          {portal.code}
        </div>

        <div className="list-item-text">
          <h3>
            <a 
              href={portal.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="portal-title-anchor"
              style={{ fontSize: '1.15rem' }}
            >
              {portal.name}
            </a>
          </h3>
          <p>{portal.description}</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          className={`pin-btn ${portal.pinned ? 'pinned' : ''}`}
          onClick={() => onTogglePin(portal.id)}
          title={portal.pinned ? 'Unpin' : 'Pin'}
        >
          <Star size={16} fill={portal.pinned ? '#fbbf24' : 'none'} />
        </button>

        <button
          className="action-icon-btn"
          onClick={handleCopyLink}
          title={copied ? 'Copied' : 'Copy URL'}
        >
          {copied ? <Check size={18} style={{ color: '#10b981' }} /> : <Copy size={18} />}
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
          style={{ padding: '0.6rem 1rem' }}
        >
          <span>Launch</span>
          <ExternalLink size={15} />
        </a>
      </div>
    </div>
  );
}
