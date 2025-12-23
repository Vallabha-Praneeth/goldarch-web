'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Users, Search, Plus, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: suppliers, isLoading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const { data } = await supabase
        .from('suppliers')
        .select(`
          *,
          category:categories(name)
        `)
        .order('name');
      return data || [];
    },
  });

  const filteredSuppliers = suppliers?.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.city?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-8 w-8" />
            Suppliers
          </h1>
          <p className="text-muted-foreground">Manage your supplier network</p>
        </div>
        <Link href="/dashboard">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Supplier
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search suppliers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Suppliers Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading suppliers...</p>
        </div>
      ) : filteredSuppliers && filteredSuppliers.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSuppliers.map((supplier) => (
            <Link key={supplier.id} href={`/supplier/${supplier.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{supplier.name}</h3>
                      {supplier.category?.name && (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {supplier.category.name}
                        </span>
                      )}
                    </div>
                    {supplier.verified && (
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    {supplier.city && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {supplier.city}
                      </div>
                    )}
                    {supplier.contact_person && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {supplier.contact_person}
                      </div>
                    )}
                    {supplier.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {supplier.email}
                      </div>
                    )}
                  </div>

                  {supplier.owner_rating && supplier.owner_rating > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
                        <span>⭐</span>
                        <span className="font-semibold">{supplier.owner_rating.toFixed(1)}</span>
                        <span className="text-muted-foreground text-sm">/ 5.0</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {searchQuery ? 'No suppliers found matching your search' : 'No suppliers yet'}
          </p>
        </div>
      )}
    </div>
  );
}
