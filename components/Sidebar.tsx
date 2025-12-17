import React from 'react';
import { CATEGORIES } from '../constants';
import { ChevronDown } from 'lucide-react';

interface SidebarFilters {
  category: string;
  minBudget: number;
  maxBudget: number;
}

interface SidebarProps {
  filters: SidebarFilters;
  setFilters: (filters: SidebarFilters) => void;
  showBudget?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, setFilters, showBudget = true }) => {
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, category: e.target.value });
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
          Catégories
        </label>
        <div className="relative">
          <select 
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full appearance-none bg-background border border-border text-foreground text-sm rounded-md focus:ring-1 focus:ring-primary focus:border-primary block p-2.5 pr-8"
          >
            <option value="">Toutes</option>
            {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-3 text-muted-foreground pointer-events-none" size={14} />
        </div>
      </div>

      {showBudget && (
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 block">
             Budget (€)
          </label>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Min: {filters.minBudget}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="2000" 
                step="100"
                value={filters.minBudget}
                onChange={(e) => setFilters({...filters, minBudget: Number(e.target.value)})}
                className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Max: {filters.maxBudget}</span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="10000" 
                step="500"
                value={filters.maxBudget}
                onChange={(e) => setFilters({...filters, maxBudget: Number(e.target.value)})}
                className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setFilters({ category: '', minBudget: 0, maxBudget: 10000 })}
        className="w-full py-2 text-xs font-medium text-muted-foreground hover:text-foreground border border-transparent hover:border-border rounded transition-all"
      >
        Réinitialiser tout
      </button>
    </div>
  );
};

export default Sidebar;