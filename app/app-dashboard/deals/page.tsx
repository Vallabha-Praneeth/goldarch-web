'use client';

import { Handshake } from 'lucide-react';

export default function DealsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Handshake className="h-8 w-8" />
          Deals
        </h1>
        <p className="text-muted-foreground">Manage your deal pipeline</p>
      </div>

      <div className="text-center py-12">
        <Handshake className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Deals module coming soon</p>
      </div>
    </div>
  );
}
