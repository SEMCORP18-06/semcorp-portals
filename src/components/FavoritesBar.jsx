import React from 'react';
import { Star, ExternalLink } from 'lucide-react';

export default function FavoritesBar({ pinnedPortals, onSelectPortal }) {
  if (!pinnedPortals || pinnedPortals.length === 0) return null;

  return (
    <div className="favorites-strip glass-panel">
      <div className="favorites-label">
        <Star size={16} fill="var(--primary-cyan)" />
        <span>Pinned Quick-Launch</span>
      </div>
      {pinnedPortals.map((portal) => (
        <a
          key={portal.id}
          href={portal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="favorite-chip"
          style={{ '--card-accent': portal.accentColor }}
        >
          <span style={{ color: portal.accentColor, fontWeight: 'bold' }}>{portal.code || '•'}</span>
          <span>{portal.name}</span>
          <ExternalLink size={12} style={{ opacity: 0.7 }} />
        </a>
      ))}
    </div>
  );
}
