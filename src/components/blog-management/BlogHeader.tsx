
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogHeaderProps {
  cityName: string | undefined;
  onNewPost: () => void;
}

export function BlogHeader({ cityName, onNewPost }: BlogHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Gestión de Blog</h1>
        <p className="text-muted-foreground">
          Administra las publicaciones de {cityName}
        </p>
      </div>
      <Button onClick={onNewPost} className="neon-glow">
        <Plus className="h-4 w-4 mr-2" />
        Nueva Publicación
      </Button>
    </div>
  );
}
