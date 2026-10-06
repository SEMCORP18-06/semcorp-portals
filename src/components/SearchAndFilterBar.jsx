import React from 'react';
import { 
  Search, 
  Grid, 
  List, 
  LayoutGrid, 
  MessageSquare, 
  Wrench, 
  ShoppingBag, 
  Users, 
  Bookmark,
  ClipboardList 
} from 'lucide-react';
import { CATEGORIES } from '../data/portalsData';

const ICON_MAP = {
  LayoutGrid: LayoutGrid,
  MessageSquare: MessageSquare,
  Wrench: Wrench,
  ShoppingBag: ShoppingBag,
  Users: Users,
  Bookmark: Bookmark,
  ClipboardList: ClipboardList
};

export default function SearchAndFilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  searchInputRef
}) {
  return (
    <div className="controls-bar">
      <div className="search-row">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="search-input"
            placeholder="Search portals by name, features, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="kbd-shortcut">/</div>
        </div>

        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <Grid size={18} />
          </button>
          <button
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="categories-scroll">
        {CATEGORIES.map((cat) => {
          const IconComp = ICON_MAP[cat.icon] || LayoutGrid;
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              className={`category-pill ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              <IconComp size={15} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
