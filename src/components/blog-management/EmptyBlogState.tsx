
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyBlogStateProps {
  cityName: string | undefined;
}

export function EmptyBlogState({ cityName }: EmptyBlogStateProps) {
  return (
    <Card className="glass-effect border-white/10">
      <CardContent className="text-center py-12">
        <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No hay publicaciones</h3>
        <p className="text-muted-foreground">
          Crea tu primera publicación para {cityName}
        </p>
      </CardContent>
    </Card>
  );
}
