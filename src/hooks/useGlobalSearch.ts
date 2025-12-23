import { useState, useEffect } from 'react';

interface Supplier {
  id: string;
  name: string;
  city?: string;
  products?: string;
  contact_person?: string;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  location?: string;
  status?: string;
}

interface Deal {
  id: string;
  title: string;
  description?: string;
  stage?: string;
  supplier?: { name: string };
}

interface Quote {
  id: string;
  quote_number?: string;
  total?: number;
  supplier?: { name: string };
  deal?: { title: string };
}

interface SearchResults {
  suppliers: Supplier[];
  projects: Project[];
  deals: Deal[];
  quotes: Quote[];
  total: number;
}

// Placeholder hooks - replace with your actual data hooks
const useSuppliers = () => ({ suppliers: [] as Supplier[] });
const useProjects = () => ({ projects: [] as Project[] });
const useDeals = () => ({ deals: [] as Deal[] });
const useQuotes = () => ({ quotes: [] as Quote[] });

export function useGlobalSearch(query = ''): SearchResults {
  const { suppliers } = useSuppliers();
  const { projects } = useProjects();
  const { deals } = useDeals();
  const { quotes } = useQuotes();

  const [results, setResults] = useState<SearchResults>({
    suppliers: [],
    projects: [],
    deals: [],
    quotes: [],
    total: 0,
  });

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults({ suppliers: [], projects: [], deals: [], quotes: [], total: 0 });
      return;
    }

    const lowerQuery = query.toLowerCase().trim();

    // Search suppliers
    const matchedSuppliers = suppliers.filter(s =>
      s.name?.toLowerCase().includes(lowerQuery) ||
      s.city?.toLowerCase().includes(lowerQuery) ||
      s.products?.toLowerCase().includes(lowerQuery) ||
      s.contact_person?.toLowerCase().includes(lowerQuery)
    ).slice(0, 10);

    // Search projects
    const matchedProjects = projects.filter(p =>
      p.name?.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery) ||
      p.location?.toLowerCase().includes(lowerQuery)
    ).slice(0, 10);

    // Search deals
    const matchedDeals = deals.filter(d =>
      d.title?.toLowerCase().includes(lowerQuery) ||
      d.description?.toLowerCase().includes(lowerQuery) ||
      d.supplier?.name?.toLowerCase().includes(lowerQuery)
    ).slice(0, 10);

    // Search quotes
    const matchedQuotes = quotes.filter(q =>
      q.quote_number?.toLowerCase().includes(lowerQuery) ||
      q.supplier?.name?.toLowerCase().includes(lowerQuery) ||
      q.deal?.title?.toLowerCase().includes(lowerQuery)
    ).slice(0, 10);

    const total =
      matchedSuppliers.length +
      matchedProjects.length +
      matchedDeals.length +
      matchedQuotes.length;

    setResults({
      suppliers: matchedSuppliers,
      projects: matchedProjects,
      deals: matchedDeals,
      quotes: matchedQuotes,
      total,
    });
  }, [query, suppliers, projects, deals, quotes]);

  return results;
}
