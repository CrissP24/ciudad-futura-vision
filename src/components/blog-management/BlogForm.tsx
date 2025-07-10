
import React from 'react';
import { Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface BlogFormProps {
  post: {
    title: string;
    content: string;
    author: string;
  };
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onChange: (field: string, value: string) => void;
}

export function BlogForm({ post, isEditing, onSubmit, onCancel, onChange }: BlogFormProps) {
  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle>
          {isEditing ? 'Editar Publicación' : 'Nueva Publicación'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={post.title}
              onChange={(e) => onChange('title', e.target.value)}
              className="glass-effect border-white/20"
              placeholder="Título de la publicación"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="content">Contenido</Label>
            <Textarea
              id="content"
              value={post.content}
              onChange={(e) => onChange('content', e.target.value)}
              className="glass-effect border-white/20 min-h-[150px]"
              placeholder="Contenido de la publicación..."
              required
            />
          </div>

          <div>
            <Label htmlFor="author">Autor</Label>
            <Input
              id="author"
              value={post.author}
              onChange={(e) => onChange('author', e.target.value)}
              className="glass-effect border-white/20"
              placeholder="Nombre del autor"
              required
            />
          </div>
          
          <div className="flex space-x-2">
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? 'Actualizar' : 'Guardar'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
