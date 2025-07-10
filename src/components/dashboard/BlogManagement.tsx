
import React, { useState } from 'react';
import { Edit3, Plus, Save, X, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/AppContext';

export function BlogManagement() {
  const { currentCity, cities, blogPosts, addBlogPost, deleteBlogPost } = useApp();
  const { toast } = useToast();
  
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: 'Administrador'
  });
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const cityInfo = cities.find(city => city.id === currentCity);
  const cityPosts = blogPosts.filter(post => post.city === currentCity);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    addBlogPost({
      ...newPost,
      city: currentCity,
      date: new Date().toISOString().split('T')[0]
    });

    setNewPost({ title: '', content: '', author: 'Administrador' });
    setShowNewPostForm(false);
    
    toast({
      title: "Publicación creada",
      description: "La nueva publicación ha sido agregada exitosamente.",
    });
  };

  const handleDeletePost = (postId: string) => {
    deleteBlogPost(postId);
    toast({
      title: "Publicación eliminada",
      description: "La publicación ha sido eliminada del sistema.",
    });
  };

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Edit3 className="h-5 w-5 text-primary" />
            <span>Gestión de Publicaciones</span>
          </CardTitle>
          <Button
            onClick={() => setShowNewPostForm(!showNewPostForm)}
            size="sm"
            className="neon-glow"
          >
            <Plus className="h-4 w-4 mr-1" />
            Nueva Publicación
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {showNewPostForm && (
          <Card className="glass-effect border-primary/20">
            <CardContent className="p-4">
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                    className="glass-effect border-white/20"
                    placeholder="Título de la publicación"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="content">Contenido</Label>
                  <Textarea
                    id="content"
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    className="glass-effect border-white/20 min-h-[100px]"
                    placeholder="Contenido de la publicación..."
                    required
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button type="submit" size="sm">
                    <Save className="h-4 w-4 mr-1" />
                    Guardar
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowNewPostForm(false)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {cityPosts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay publicaciones para {cityInfo?.displayName}
            </div>
          ) : (
            cityPosts.slice(0, 5).map((post) => (
              <Card key={post.id} className="glass-effect border-white/10 hover:border-primary/20 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{post.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {post.content}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                        <span>{post.author}</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
