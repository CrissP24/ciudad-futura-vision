
import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Send, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Clock,
  Users,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  priority: 'low' | 'medium' | 'high';
  city: string;
  targetAudience: string;
  sentDate: string;
  readCount: number;
  totalRecipients: number;
  status: 'draft' | 'sent' | 'scheduled';
}

export function Notifications() {
  const { currentCity, cities } = useApp();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Mantenimiento programado del sistema eléctrico',
      message: 'Se realizará mantenimiento preventivo en la red eléctrica del sector norte de la ciudad el próximo sábado de 8:00 AM a 2:00 PM.',
      type: 'warning',
      priority: 'high',
      city: 'jipijapa',
      targetAudience: 'Todos los usuarios',
      sentDate: '2024-07-08',
      readCount: 1247,
      totalRecipients: 1350,
      status: 'sent'
    },
    {
      id: '2',
      title: 'Nueva funcionalidad disponible en el portal ciudadano',
      message: 'Ya está disponible el nuevo módulo de trámites en línea. Ahora puedes realizar gestiones municipales desde tu hogar.',
      type: 'success',
      priority: 'medium',
      city: 'puerto-lopez',
      targetAudience: 'Residentes registrados',
      sentDate: '2024-07-07',
      readCount: 890,
      totalRecipients: 1200,
      status: 'sent'
    },
    {
      id: '3',
      title: 'Corte temporal del servicio de agua',
      message: 'Por trabajos de mejora en la infraestructura hídrica, habrá suspensión temporal del servicio de agua potable.',
      type: 'error',
      priority: 'high',
      city: 'pajan',
      targetAudience: 'Sector Centro',
      sentDate: '2024-07-09',
      readCount: 0,
      totalRecipients: 450,
      status: 'scheduled'
    }
  ]);

  const [showNewNotificationForm, setShowNewNotificationForm] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info' as const,
    priority: 'medium' as const,
    targetAudience: 'Todos los usuarios'
  });

  const cityInfo = cities.find(city => city.id === currentCity);
  const cityNotifications = notifications.filter(notification => notification.city === currentCity);

  const handleCreateNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotification.title.trim() || !newNotification.message.trim()) return;

    const notification: Notification = {
      ...newNotification,
      id: Date.now().toString(),
      city: currentCity,
      sentDate: new Date().toISOString().split('T')[0],
      readCount: 0,
      totalRecipients: Math.floor(Math.random() * 1000) + 500,
      status: 'draft'
    };

    setNotifications(prev => [notification, ...prev]);
    setNewNotification({
      title: '',
      message: '',
      type: 'info',
      priority: 'medium',
      targetAudience: 'Todos los usuarios'
    });
    setShowNewNotificationForm(false);
    
    toast({
      title: "Notificación creada",
      description: "La notificación ha sido guardada como borrador.",
    });
  };

  const handleSendNotification = (notificationId: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === notificationId 
        ? { ...notification, status: 'sent', sentDate: new Date().toISOString().split('T')[0] }
        : notification
    ));
    
    toast({
      title: "Notificación enviada",
      description: "La notificación ha sido enviada a todos los destinatarios.",
    });
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
    toast({
      title: "Notificación eliminada",
      description: "La notificación ha sido eliminada del sistema.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'error': return AlertTriangle;
      default: return Info;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-500/20 text-yellow-300';
      case 'success': return 'bg-green-500/20 text-green-300';
      case 'error': return 'bg-red-500/20 text-red-300';
      default: return 'bg-blue-500/20 text-blue-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-green-500/20 text-green-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-500/20 text-green-300';
      case 'scheduled': return 'bg-blue-500/20 text-blue-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Notificaciones</h1>
          <p className="text-muted-foreground">
            Administra las notificaciones de {cityInfo?.displayName}
          </p>
        </div>
        <Button onClick={() => setShowNewNotificationForm(true)} className="neon-glow">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Notificación
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Total Enviadas</p>
                <p className="text-xl font-bold">{cityNotifications.filter(n => n.status === 'sent').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-sm text-muted-foreground">Programadas</p>
                <p className="text-xl font-bold">{cityNotifications.filter(n => n.status === 'scheduled').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">Tasa de Lectura</p>
                <p className="text-xl font-bold">
                  {cityNotifications.length > 0 
                    ? Math.round((cityNotifications.reduce((acc, n) => acc + n.readCount, 0) / 
                        cityNotifications.reduce((acc, n) => acc + n.totalRecipients, 0)) * 100)
                    : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-muted-foreground">Alcance Total</p>
                <p className="text-xl font-bold">
                  {cityNotifications.reduce((acc, n) => acc + n.totalRecipients, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulario nueva notificación */}
      {showNewNotificationForm && (
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle>Nueva Notificación</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateNotification} className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                  className="glass-effect border-white/20"
                  placeholder="Título de la notificación"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  value={newNotification.message}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, message: e.target.value }))}
                  className="glass-effect border-white/20 min-h-[100px]"
                  placeholder="Contenido del mensaje..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select value={newNotification.type} onValueChange={(value: any) => setNewNotification(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger className="glass-effect border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Información</SelectItem>
                      <SelectItem value="warning">Advertencia</SelectItem>
                      <SelectItem value="success">Éxito</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select value={newNotification.priority} onValueChange={(value: any) => setNewNotification(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger className="glass-effect border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="audience">Audiencia</Label>
                  <Select value={newNotification.targetAudience} onValueChange={(value) => setNewNotification(prev => ({ ...prev, targetAudience: value }))}>
                    <SelectTrigger className="glass-effect border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos los usuarios">Todos los usuarios</SelectItem>
                      <SelectItem value="Residentes registrados">Residentes registrados</SelectItem>
                      <SelectItem value="Administradores">Administradores</SelectItem>
                      <SelectItem value="Sector Centro">Sector Centro</SelectItem>
                      <SelectItem value="Sector Norte">Sector Norte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Borrador
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowNewNotificationForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de notificaciones */}
      <div className="space-y-4">
        {cityNotifications.length === 0 ? (
          <Card className="glass-effect border-white/10">
            <CardContent className="text-center py-12">
              <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No hay notificaciones</h3>
              <p className="text-muted-foreground">
                Crea tu primera notificación para {cityInfo?.displayName}
              </p>
            </CardContent>
          </Card>
        ) : (
          cityNotifications.map((notification) => {
            const TypeIcon = getTypeIcon(notification.type);
            return (
              <Card key={notification.id} className="glass-effect border-white/10 hover:border-primary/20 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-semibold">{notification.title}</h3>
                        <Badge className={getTypeColor(notification.type)}>
                          <TypeIcon className="h-3 w-3 mr-1" />
                          {notification.type}
                        </Badge>
                        <Badge className={getPriorityColor(notification.priority)}>
                          Prioridad {notification.priority}
                        </Badge>
                        <Badge className={getStatusColor(notification.status)}>
                          {notification.status === 'sent' ? 'Enviada' : 
                           notification.status === 'scheduled' ? 'Programada' : 'Borrador'}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{notification.targetAudience}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(notification.sentDate).toLocaleDateString('es-ES')}</span>
                        </div>
                        {notification.status === 'sent' && (
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{notification.readCount}/{notification.totalRecipients} leídas</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      {notification.status === 'draft' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSendNotification(notification.id)}
                          className="text-green-400 hover:text-green-300"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
