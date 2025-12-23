'use client';

import { FolderKanban } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <FolderKanban className="h-8 w-8" />
          Projects
        </h1>
        <p className="text-muted-foreground">Manage your construction projects</p>
      </div>

      <div className="text-center py-12">
        <FolderKanban className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Projects module coming soon</p>
      </div>
    </div>
  );
}
