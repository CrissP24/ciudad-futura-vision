
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
  X,
  Zap,
  Droplets,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export function Dashboard() {
  const { 
    currentCity, 
    cities, 
    blogPosts, 
    services,
    addBlogPost,
    deleteBlogPost
  } = useApp();
  const { toast } = useToast();
  
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: 'Administrador'
  });
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const cityInfo = cities.find(city => city.id === currentCity);
  const cityPosts = blogPosts.filter(post => post.city === currentCity);
  const cityServices = services.filter(service => service.city === currentCity);

  // Métricas simuladas
  const metrics = {
    totalUsers: Math.floor(Math.random() * 5000) + 1000,
    activeServices: cityServices.filter(s => s.status === 'active').length,
    totalServices: cityServices.length,
    efficiency: Math.floor(Math.random() * 15) + 85,
    energyConsumption: Math.floor(Math.random() * 30) + 60,
    waterUsage: Math.floor(Math.random() * 25) + 70,
    trafficFlow: Math.floor(Math.random() * 20) + 75,
    airQuality: Math.floor(Math.random() * 25) + 70,
  };

  const stats = [
    {
      title: 'Usuarios Activos',
      value: metrics.totalUsers.toLocaleString(),
      change: '+12.5%',
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-400',
    },
    {
      title: 'Servicios Activos',
      value: `${metrics.activeServices}/${metrics.totalServices}`,
      change: '+2.3%',
      changeType: 'increase',
      icon: Activity,
      color: 'text-green-400',
    },
    {
      title: 'Eficiencia del Sistema',
      value: `${metrics.efficiency}%`,
      change: '+3.2%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'text-emerald-400',
    },
    {
      title: 'Consumo Energético',
      value: `${metrics.energyConsumption}%`,
      change: '-1.8%',
      changeType: 'decrease',
      icon: Zap,
      color: 'text-yellow-400',
    },
  ];

  const performanceData = [
    { name: 'Uso de Agua', value: metrics.waterUsage, color: 'bg-blue-500' },
    { name: 'Flujo de Tráfico', value: metrics.trafficFlow, color: 'bg-green-500' },
    { name: 'Calidad del Aire', value: metrics.airQuality, color: 'bg-purple-500' },
    { name: 'Eficiencia Energética', value: metrics.efficiency, color: 'bg-yellow-500' },
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
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 items-center gap-4 border-b border-white/10 px-6">
            <SidebarTrigger className="text-white" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Dashboard - {cityInfo?.displayName}
                </span>
              </h1>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6">
            {/* Estadísticas principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="glass-effect border-white/10 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <div className="flex items-center space-x-1">
                          {stat.changeType === 'increase' ? (
                            <ArrowUp className="h-3 w-3 text-green-400" />
                          ) : (
                            <ArrowDown className="h-3 w-3 text-red-400" />
                          )}
                          <span className={`text-xs font-medium ${
                            stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${cityInfo?.gradient}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Métricas de rendimiento */}
              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span>Rendimiento del Sistema</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {performanceData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                      <Progress value={item.value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Estado de servicios */}
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
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            service.status === 'active' ? 'bg-green-400' :
                            service.status === 'maintenance' ? 'bg-yellow-400' :
                            'bg-red-400'
                          } ${service.status === 'active' ? 'animate-pulse' : ''}`} />
                          <div>
                            <div className="font-medium text-sm">{service.name}</div>
                            <div className="text-xs text-muted-foreground">{service.description}</div>
                          </div>
                        </div>
                        {service.status === 'active' && <CheckCircle className="h-4 w-4 text-green-400" />}
                        {service.status === 'maintenance' && <Clock className="h-4 w-4 text-yellow-400" />}
                        {service.status === 'inactive' && <AlertTriangle className="h-4 w-4 text-red-400" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actividad reciente */}
              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Actividad Reciente</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-2 rounded border border-white/10">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <div className="text-sm">
                        <p>Sistema de agua actualizado</p>
                        <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-2 rounded border border-white/10">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5" />
                      <div className="text-sm">
                        <p>Mantenimiento programado</p>
                        <p className="text-xs text-muted-foreground">Hace 4 horas</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-2 rounded border border-white/10">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                      <div className="text-sm">
                        <p>Nueva publicación creada</p>
                        <p className="text-xs text-muted-foreground">Hace 6 horas</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gestión de Blog */}
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
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
