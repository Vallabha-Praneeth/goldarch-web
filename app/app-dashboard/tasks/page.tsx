'use client';

import { CheckSquare } from 'lucide-react';

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <CheckSquare className="h-8 w-8" />
          Tasks
        </h1>
        <p className="text-muted-foreground">Manage your tasks and to-dos</p>
      </div>

      <div className="text-center py-12">
        <CheckSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Tasks module coming soon</p>
      </div>
    </div>
  );
}
