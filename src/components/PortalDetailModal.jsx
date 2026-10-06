import React from 'react';
import { X, ExternalLink, CheckCircle2, Copy, Check } from 'lucide-react';

export default function PortalDetailModal({ portal, onClose }) {
  const [copied, setCopied] = React.useState(false);

  if (!portal) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portal.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              className="portal-code-badge"
              style={{
                fontSize: '0.85rem'
              }}
            >
              {portal.code}
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{portal.name}</h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ height: '160px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.25rem' }}>
            <img 
              src={portal.bannerImg || portal.image} 
              alt={portal.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>STATUS</div>
              <div style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                <span className="pulse-dot"></span>
                <span>{portal.status}</span>
              </div>
            </div>

            <div style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>TARGET URL</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--primary-cyan)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '0.2rem' }}>
                {portal.url}
              </div>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
            {portal.description}
          </p>

          {portal.features && (
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Key Capabilities & Features
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {portal.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={15} style={{ color: portal.accentColor }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button 
            type="button" 
            className="icon-btn" 
            onClick={handleCopyLink}
            style={{ width: 'auto', padding: '0 1.25rem', display: 'flex', gap: '0.5rem', borderRadius: '12px' }}
          >
            {copied ? <Check size={16} style={{ color: '#10b981' }} /> : <Copy size={16} />}
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>

          <a
            href={portal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-launch-btn"
            style={{
              '--card-accent': portal.accentColor,
              '--launch-bg-light': portal.launchBgLight
            }}
          >
            <span>Launch External Portal</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
