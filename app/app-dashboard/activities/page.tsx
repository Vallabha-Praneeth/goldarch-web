'use client';

import { Activity } from 'lucide-react';

export default function ActivitiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Activity className="h-8 w-8" />
          Activities
        </h1>
        <p className="text-muted-foreground">Track activities and interactions</p>
      </div>

      <div className="text-center py-12">
        <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Activities module coming soon</p>
      </div>
    </div>
  );
}
