import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, X, Building2, Folder, Briefcase, FileText, ChevronRight } from 'lucide-react';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const results = useGlobalSearch(searchQuery);

  const sections = [
    {
      title: 'Suppliers',
      icon: Building2,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-500/10',
      data: results.suppliers,
      renderItem: (item: typeof results.suppliers[0]) => (
        <button
          key={item.id}
          className="flex items-center w-full px-4 py-3 border-b border-border/50 hover:bg-muted/50 transition-colors text-left"
          onClick={() => navigate(`/supplier/${item.id}`)}
        >
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
            <Building2 className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-medium text-foreground truncate">{item.name}</p>
            <p className="text-sm text-muted-foreground truncate">{item.city || 'No location'}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        </button>
      ),
    },
    {
      title: 'Projects',
      icon: Folder,
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-500/10',
      data: results.projects,
      renderItem: (item: typeof results.projects[0]) => (
        <button
          key={item.id}
          className="flex items-center w-full px-4 py-3 border-b border-border/50 hover:bg-muted/50 transition-colors text-left"
          onClick={() => navigate(`/project/${item.id}`)}
        >
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
            <Folder className="w-5 h-5 text-purple-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-medium text-foreground truncate">{item.name}</p>
            <p className="text-sm text-muted-foreground truncate">{item.status}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        </button>
      ),
    },
    {
      title: 'Deals',
      icon: Briefcase,
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-500/10',
      data: results.deals,
      renderItem: (item: typeof results.deals[0]) => (
        <button
          key={item.id}
          className="flex items-center w-full px-4 py-3 border-b border-border/50 hover:bg-muted/50 transition-colors text-left"
          onClick={() => navigate(`/deal/${item.id}`)}
        >
          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mr-3">
            <Briefcase className="w-5 h-5 text-orange-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-medium text-foreground truncate">{item.title}</p>
            <p className="text-sm text-muted-foreground truncate">
              {item.supplier?.name || 'No supplier'} • {item.stage}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        </button>
      ),
    },
    {
      title: 'Quotes',
      icon: FileText,
      iconColor: 'text-green-500',
      iconBg: 'bg-green-500/10',
      data: results.quotes,
      renderItem: (item: typeof results.quotes[0]) => (
        <button
          key={item.id}
          className="flex items-center w-full px-4 py-3 border-b border-border/50 hover:bg-muted/50 transition-colors text-left"
          onClick={() => navigate(`/quote/${item.id}`)}
        >
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
            <FileText className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-medium text-foreground truncate">
              {item.quote_number || `Q-${item.id.slice(0, 8)}`}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {item.supplier?.name || 'Unknown'} • ${(item.total || 0).toLocaleString()}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        </button>
      ),
    },
  ].filter(section => section.data.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center px-4 py-3 bg-card border-b border-border sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="mr-3 p-1 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-primary" />
        </button>
        <div className="flex-1 flex items-center bg-muted rounded-xl px-3">
          <Search className="w-5 h-5 text-muted-foreground mr-2" />
          <input
            type="text"
            className="flex-1 py-2.5 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            placeholder="Search suppliers, projects, deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 hover:bg-background/50 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Empty state - no query */}
        {searchQuery.trim().length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <Search className="w-16 h-16 text-muted-foreground/50" />
            <p className="text-lg font-medium text-muted-foreground mt-4">Search across everything</p>
            <p className="text-sm text-muted-foreground/70 mt-2 text-center">
              Find suppliers, projects, deals, and quotes
            </p>
          </div>
        )}

        {/* Empty state - no results */}
        {searchQuery.trim().length > 0 && results.total === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <Search className="w-16 h-16 text-muted-foreground/50" />
            <p className="text-lg font-medium text-muted-foreground mt-4">No results found</p>
            <p className="text-sm text-muted-foreground/70 mt-2 text-center">
              Try a different search term
            </p>
          </div>
        )}

        {/* Results header */}
        {searchQuery.trim().length > 0 && results.total > 0 && (
          <div className="px-4 py-3 bg-card border-b border-border">
            <p className="text-sm font-semibold text-muted-foreground">
              {results.total} {results.total === 1 ? 'result' : 'results'} found
            </p>
          </div>
        )}

        {/* Sections */}
        {sections.map((section) => (
          <div key={section.title} className="bg-card mt-3">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
              <section.icon className={`w-4 h-4 ${section.iconColor}`} />
              <span className="text-base font-semibold text-muted-foreground">
                {section.title} ({section.data.length})
              </span>
            </div>
            {section.data.map((item) => section.renderItem(item))}
          </div>
        ))}
      </div>
    </div>
  );
}
