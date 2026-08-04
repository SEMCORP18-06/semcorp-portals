import React, { useState, useEffect, useRef, useMemo } from 'react';
import Navbar from './components/Navbar';
import FavoritesBar from './components/FavoritesBar';
import SearchAndFilterBar from './components/SearchAndFilterBar';
import PortalCard from './components/PortalCard';
import PortalListItem from './components/PortalListItem';
import PortalDetailModal from './components/PortalDetailModal';
import Footer from './components/Footer';
import { INITIAL_PORTALS } from './data/portalsData';
import { SearchX } from 'lucide-react';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('semcorp_theme') || 'dark';
  });

  // Portals State with storage version v12 to force live cache refresh for distinct 3D portal banners
  const [portals, setPortals] = useState(() => {
    const saved = localStorage.getItem('semcorp_portals_v12');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved portals:', e);
      }
    }
    return INITIAL_PORTALS;
  });

  // Controls State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Detail Modal State
  const [detailPortal, setDetailPortal] = useState(null);

  const searchInputRef = useRef(null);

  // Sync theme attribute to HTML tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('semcorp_theme', theme);
  }, [theme]);

  // Persist portals to localStorage v12
  useEffect(() => {
    localStorage.setItem('semcorp_portals_v12', JSON.stringify(portals));
  }, [portals]);

  // Keyboard shortcut listener ('/' to focus search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleTogglePin = (portalId) => {
    setPortals((prev) =>
      prev.map((p) => (p.id === portalId ? { ...p, pinned: !p.pinned } : p))
    );
  };

  // Filtered Portals List
  const filteredPortals = useMemo(() => {
    return portals.filter((portal) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'custom' && portal.isOfficial) return false;
        if (selectedCategory !== 'custom' && portal.categoryKey !== selectedCategory) {
          return false;
        }
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = portal.name.toLowerCase().includes(query);
        const descMatch = portal.description?.toLowerCase().includes(query);
        const categoryMatch = portal.category.toLowerCase().includes(query);
        const codeMatch = portal.code.toLowerCase().includes(query);
        const featureMatch = portal.features?.some((f) => f.toLowerCase().includes(query));

        return nameMatch || descMatch || categoryMatch || codeMatch || featureMatch;
      }

      return true;
    });
  }, [portals, selectedCategory, searchQuery]);

  const pinnedPortals = useMemo(() => {
    return portals.filter((p) => p.pinned);
  }, [portals]);

  return (
    <div className="app-container">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="main-content">
        <FavoritesBar
          pinnedPortals={pinnedPortals}
          onSelectPortal={(portal) => setDetailPortal(portal)}
        />

        <SearchAndFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchInputRef={searchInputRef}
        />

        {filteredPortals.length === 0 ? (
          <div
            className="glass-panel"
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <SearchX size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              No matching portals found
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Try searching with different keywords or clear your active category filters.
            </p>
            <button
              className="primary-btn"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="portals-grid">
            {filteredPortals.map((portal) => (
              <PortalCard
                key={portal.id}
                portal={portal}
                onTogglePin={handleTogglePin}
                onOpenDetail={(p) => setDetailPortal(p)}
              />
            ))}
          </div>
        ) : (
          <div className="portals-list">
            {filteredPortals.map((portal) => (
              <PortalListItem
                key={portal.id}
                portal={portal}
                onTogglePin={handleTogglePin}
                onOpenDetail={(p) => setDetailPortal(p)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      <PortalDetailModal
        portal={detailPortal}
        onClose={() => setDetailPortal(null)}
      />
    </div>
  );
}
