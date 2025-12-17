import React, { useState, useEffect, useMemo } from 'react';
import { useData } from '../context/DataContext';
import ProjectCard from '../components/ProjectCard';
import Sidebar from '../components/Sidebar';
import { SlidersHorizontal, Search } from 'lucide-react';

const Projects: React.FC = () => {
  const { projects } = useData();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Initial state from localStorage or defaults
  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem('lanceo_project_filters');
    return saved ? JSON.parse(saved) : {
      category: '',
      minBudget: 0,
      maxBudget: 10000
    };
  });

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('lanceo_project_filters', JSON.stringify(filters));
  }, [filters]);

  // Filtering Logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = filters.category === '' || 
                              project.skills.includes(filters.category) || 
                              project.description.includes(filters.category);

      const matchesBudget = project.budget.min <= filters.maxBudget && project.budget.max >= filters.minBudget;

      return matchesSearch && matchesCategory && matchesBudget;
    });
  }, [projects, filters, searchTerm]);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-6">
          <h1 className="text-3xl font-display font-bold mb-8">Explorer les missions</h1>

          {/* Search Header */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center border-b border-border pb-8">
            <div className="relative w-full md:w-96">
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
            </div>

            <button 
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="lg:hidden flex items-center gap-2 bg-secondary px-4 py-2 rounded-md text-sm font-medium"
            >
              <SlidersHorizontal size={16} /> Filtres
            </button>

            <div className="hidden lg:block text-muted-foreground text-sm">
              <span className="font-bold text-foreground">{filteredProjects.length}</span> résultats
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Sidebar Filter (Desktop) */}
            <div className="hidden lg:block lg:col-span-1 sticky top-24">
              <Sidebar filters={filters} setFilters={setFilters} />
            </div>

            {/* Mobile Filter Drawer */}
            {isMobileFiltersOpen && (
              <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex justify-end" onClick={() => setIsMobileFiltersOpen(false)}>
                <div className="w-80 bg-background h-full p-6 border-l border-border overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold">Filtres</h2>
                      <button onClick={() => setIsMobileFiltersOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">Fermer</button>
                    </div>
                    <Sidebar filters={filters} setFilters={setFilters} />
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <div key={project.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <ProjectCard project={project} showActions={true} />
                  </div>
                ))
              ) : (
                <div className="py-20 text-center border border-dashed border-border rounded-lg">
                  <Search size={32} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Aucun résultat trouvé.</p>
                  <button 
                    onClick={() => { setFilters({ category: '', minBudget: 0, maxBudget: 10000 }); setSearchTerm(''); }}
                    className="mt-4 text-primary font-medium hover:underline text-sm"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default Projects;