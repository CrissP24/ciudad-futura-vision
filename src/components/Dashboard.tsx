
import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Activity, 
  TrendingUp, 
  Plus,
  Edit3,
  Trash2,
  Save,
  X
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function Dashboard() {
  const { 
    currentCity, 
    cities, 
    blogPosts, 
    services,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost
  } = useApp();
  const { toast } = useToast();
  
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: 'Administrador'
  });
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const cityInfo = cities.find(city => city.id === currentCity);
  const cityPosts = blogPosts.filter(post => post.city === currentCity);
  const cityServices = services.filter(service => service.city === currentCity);

  const stats = [
    {
      title: 'Servicios Activos',
      value: cityServices.filter(s => s.status === 'active').length,
      total: cityServices.length,
      icon: Activity,
      color: 'text-green-400',
      change: '+2.3%'
    },
    {
      title: 'Publicaciones',
      value: cityPosts.length,
      total: blogPosts.length,
      icon: BarChart3,
      color: 'text-blue-400',
      change: '+12.5%'
    },
    {
      title: 'Usuarios Activos',
      value: '1,234',
      total: '2,456',
      icon: Users,
      color: 'text-purple-400',
      change: '+8.1%'
    },
    {
      title: 'Eficiencia',
      value: '94.2%',
      total: '100%',
      icon: TrendingUp,
      color: 'text-emerald-400',
      change: '+3.2%'
    }
  ];

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
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-4 h-4 rounded-full ${cityInfo?.color} animate-pulse`} />
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Dashboard - {cityInfo?.displayName}
              </span>
            </h1>
          </div>
          <p className="text-muted-foreground">
            Panel de administración para la gestión inteligente de la ciudad
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-effect border-white/10 hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-xs ${stat.color} font-medium`}>
                      {stat.change} vs mes anterior
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${cityInfo?.gradient}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gestión de Blog */}
          <div className="lg:col-span-2">
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
                    Nueva
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Formulario nueva publicación */}
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

                {/* Lista de publicaciones */}
                <div className="space-y-3">
                  {cityPosts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No hay publicaciones para {cityInfo?.displayName}
                    </div>
                  ) : (
                    cityPosts.map((post) => (
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
                            
                            <div className="flex space-x-1 ml-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingPost(post.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit3 className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeletePost(post.id)}
                                className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel de servicios */}
          <div>
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span>Estado de Servicios</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {cityServices.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-3 glass-effect rounded-lg border border-white/10">
                      <div>
                        <div className="font-medium text-sm">{service.name}</div>
                        <div className="text-xs text-muted-foreground">{service.description}</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        service.status === 'active' ? 'bg-green-400' :
                        service.status === 'maintenance' ? 'bg-yellow-400' :
                        'bg-red-400'
                      } ${service.status === 'active' ? 'animate-pulse' : ''}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
