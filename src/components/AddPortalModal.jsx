import React, { useState } from 'react';
import { X, Plus, Link, Code, FileText } from 'lucide-react';

export default function AddPortalModal({ isOpen, onClose, onAddPortal }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('Sales & Enquiries');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !url) return;

    let finalUrl = url.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    const newPortal = {
      id: 'custom-' + Date.now(),
      name: name.trim(),
      code: (code || name.substring(0, 3)).toUpperCase(),
      category: category,
      categoryKey: 'custom',
      url: finalUrl,
      image: '/assets/enquiry_portal.jpg',
      accentColor: '#00f2fe',
      badgeColor: 'rgba(0, 242, 254, 0.15)',
      borderColor: 'rgba(0, 242, 254, 0.3)',
      status: 'Custom Registered',
      uptime: '100%',
      description: description.trim() || 'Custom enterprise portal shortcut.',
      features: ['Custom Portal Link', 'Personal Bookmark'],
      quickLinks: [{ label: 'Open Portal', path: finalUrl }],
      pinned: true,
      isOfficial: false
    };

    onAddPortal(newPortal);
    onClose();
    setName('');
    setUrl('');
    setCode('');
    setDescription('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Add Custom Portal</h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Portal Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Analytics Dashboard"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Portal URL (Anchor Target) *</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Sales & Enquiries">Sales & Enquiries</option>
                  <option value="Technical & Field Support">Technical Support</option>
                  <option value="Procurement & Supply Chain">Procurement & RFQ</option>
                  <option value="Human Capital & People Ops">Human Resources</option>
                  <option value="Custom Bookmarks">Custom Bookmark</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Short Code (3 Letters)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. ANA"
                  maxLength={4}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Briefly describe what this portal is used for..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="icon-btn" onClick={onClose} style={{ width: 'auto', padding: '0 1rem' }}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              <Plus size={16} />
              <span>Save Portal Link</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
