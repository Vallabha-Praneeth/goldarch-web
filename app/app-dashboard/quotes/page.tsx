'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, DollarSign, Clock, CheckCircle, XCircle, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

type FilterStatus = 'all' | 'pending' | 'accepted' | 'rejected';

export default function QuotesPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const { data: quotes, isLoading } = useQuery({
    queryKey: ['quotes'],
    queryFn: async () => {
      const { data } = await supabase
        .from('quotes')
        .select(`
          *,
          supplier:suppliers(name, city),
          deal:deals(title)
        `)
        .order('created_at', { ascending: false });
      return data || [];
    },
  });

  const filteredQuotes = filterStatus === 'all'
    ? quotes
    : quotes?.filter(q => q.status === filterStatus);

  const metrics = {
    total: quotes?.length || 0,
    pending: quotes?.filter(q => q.status === 'pending').length || 0,
    accepted: quotes?.filter(q => q.status === 'accepted').length || 0,
    rejected: quotes?.filter(q => q.status === 'rejected').length || 0,
    totalValue: quotes?.reduce((sum, q) => sum + (q.total || 0), 0) || 0,
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: any }> = {
      pending: { variant: 'secondary', icon: Clock },
      accepted: { variant: 'default', icon: CheckCircle },
      rejected: { variant: 'destructive', icon: XCircle },
    };
    const config = variants[status] || variants.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Quotes
          </h1>
          <p className="text-muted-foreground">Manage supplier quotes</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Quote
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{metrics.total}</p>
            <p className="text-xs text-muted-foreground">Total Quotes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-amber-500">{metrics.pending}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-emerald-500">{metrics.accepted}</p>
            <p className="text-xs text-muted-foreground">Accepted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <div>
              <p className="text-lg font-bold">
                ${(metrics.totalValue / 1000).toFixed(1)}K
              </p>
              <p className="text-xs text-muted-foreground">Total Value</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'pending', 'accepted', 'rejected'] as FilterStatus[]).map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? 'default' : 'outline'}
            onClick={() => setFilterStatus(status)}
            size="sm"
          >
            {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {/* Quotes List */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading quotes...</p>
        </div>
      ) : filteredQuotes && filteredQuotes.length > 0 ? (
        <div className="space-y-4">
          {filteredQuotes.map((quote) => (
            <Card key={quote.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{quote.quote_number}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {quote.supplier?.name} • {quote.deal?.title || 'No deal'}
                    </p>
                  </div>
                  {getStatusBadge(quote.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Quote Date</p>
                    <p className="font-medium">
                      {new Date(quote.quote_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Valid Until</p>
                    <p className="font-medium">
                      {quote.valid_until ? new Date(quote.valid_until).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Subtotal</p>
                    <p className="font-medium">${quote.subtotal?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total</p>
                    <p className="font-bold text-lg">${quote.total?.toLocaleString()}</p>
                  </div>
                </div>
                {quote.notes && (
                  <p className="text-sm text-muted-foreground mt-4 pt-4 border-t">
                    {quote.notes}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {filterStatus === 'all' ? 'No quotes yet' : `No ${filterStatus} quotes`}
          </p>
        </div>
      )}
    </div>
  );
}
