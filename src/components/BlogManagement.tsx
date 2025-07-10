
import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Calendar,
  User,
  Eye
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export function BlogManagement() {
  const { 
    currentCity, 
    cities, 
    blogPosts, 
    addBlogPost, 
    updateBlogPost, 
    deleteBlogPost 
  } = useApp();
  const { toast } = useToast();
  
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: 'Administrador'
  });
  const [editingPost, setEditingPost] = useState<string | null>(null);
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

  const handleEditPost = (postId: string) => {
    const post = cityPosts.find(p => p.id === postId);
    if (post) {
      setNewPost({
        title: post.title,
        content: post.content,
        author: post.author
      });
      setEditingPost(postId);
      setShowNewPostForm(true);
    }
  };

  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !newPost.title.trim() || !newPost.content.trim()) return;

    updateBlogPost(editingPost, {
      title: newPost.title,
      content: newPost.content,
      author: newPost.author
    });

    setNewPost({ title: '', content: '', author: 'Administrador' });
    setEditingPost(null);
    setShowNewPostForm(false);
    
    toast({
      title: "Publicación actualizada",
      description: "La publicación ha sido actualizada exitosamente.",
    });
  };

  const handleDeletePost = (postId: string) => {
    deleteBlogPost(postId);
    toast({
      title: "Publicación eliminada",
      description: "La publicación ha sido eliminada del sistema.",
    });
  };

  const handleCancel = () => {
    setNewPost({ title: '', content: '', author: 'Administrador' });
    setEditingPost(null);
    setShowNewPostForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Blog</h1>
          <p className="text-muted-foreground">
            Administra las publicaciones de {cityInfo?.displayName}
          </p>
        </div>
        <Button onClick={() => setShowNewPostForm(true)} className="neon-glow">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Publicación
        </Button>
      </div>

      {/* Formulario nueva/editar publicación */}
      {showNewPostForm && (
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle>
              {editingPost ? 'Editar Publicación' : 'Nueva Publicación'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost} className="space-y-4">
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
                  className="glass-effect border-white/20 min-h-[150px]"
                  placeholder="Contenido de la publicación..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="author">Autor</Label>
                <Input
                  id="author"
                  value={newPost.author}
                  onChange={(e) => setNewPost(prev => ({ ...prev, author: e.target.value }))}
                  className="glass-effect border-white/20"
                  placeholder="Nombre del autor"
                  required
                />
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingPost ? 'Actualizar' : 'Guardar'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de publicaciones */}
      <div className="grid gap-4">
        {cityPosts.length === 0 ? (
          <Card className="glass-effect border-white/10">
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No hay publicaciones</h3>
              <p className="text-muted-foreground">
                Crea tu primera publicación para {cityInfo?.displayName}
              </p>
            </CardContent>
          </Card>
        ) : (
          cityPosts.map((post) => (
            <Card key={post.id} className="glass-effect border-white/10 hover:border-primary/20 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                      <Badge className={`${cityInfo?.color} text-black`}>
                        {cityInfo?.displayName}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditPost(post.id)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
