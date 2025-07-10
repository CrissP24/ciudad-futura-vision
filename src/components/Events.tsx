
import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  MapPin,
  Clock,
  Users,
  Tag
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

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  maxAttendees: number;
  currentAttendees: number;
  city: string;
  organizer: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
}

export function Events() {
  const { currentCity, cities } = useApp();
  const { toast } = useToast();
  
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Feria Tecnológica SmartCity 2024',
      description: 'Exposición de las últimas innovaciones tecnológicas implementadas en nuestra ciudad inteligente.',
      date: '2024-07-15',
      time: '09:00',
      location: 'Plaza Central',
      category: 'Tecnología',
      maxAttendees: 500,
      currentAttendees: 234,
      city: 'jipijapa',
      organizer: 'Municipio de Jipijapa',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Taller de Conservación Marina',
      description: 'Aprende sobre las iniciativas de conservación del ecosistema marino y cómo contribuir.',
      date: '2024-07-20',
      time: '14:00',
      location: 'Centro Comunitario',
      category: 'Medio Ambiente',
      maxAttendees: 100,
      currentAttendees: 67,
      city: 'puerto-lopez',
      organizer: 'Fundación EcoMar',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Curso de Agricultura Inteligente',
      description: 'Capacitación sobre técnicas modernas de agricultura sostenible con tecnología IoT.',
      date: '2024-07-12',
      time: '08:00',
      location: 'Centro Agrícola Municipal',
      category: 'Agricultura',
      maxAttendees: 80,
      currentAttendees: 80,
      city: 'pajan',
      organizer: 'MAGAP Regional',
      status: 'completed'
    }
  ]);

  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'Tecnología',
    maxAttendees: 50,
    organizer: ''
  });

  const cityInfo = cities.find(city => city.id === currentCity);
  const cityEvents = events.filter(event => event.city === currentCity);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title.trim() || !newEvent.description.trim() || !newEvent.date || !newEvent.time) return;

    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
      city: currentCity,
      currentAttendees: 0,
      status: 'scheduled'
    };

    setEvents(prev => [event, ...prev]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'Tecnología',
      maxAttendees: 50,
      organizer: ''
    });
    setShowNewEventForm(false);
    
    toast({
      title: "Evento creado",
      description: "El evento ha sido programado exitosamente.",
    });
  };

  const handleEditEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setNewEvent({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        category: event.category,
        maxAttendees: event.maxAttendees,
        organizer: event.organizer
      });
      setEditingEvent(eventId);
      setShowNewEventForm(true);
    }
  };

  const handleUpdateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent || !newEvent.title.trim() || !newEvent.description.trim()) return;

    setEvents(prev => prev.map(event =>
      event.id === editingEvent ? { ...event, ...newEvent } : event
    ));

    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'Tecnología',
      maxAttendees: 50,
      organizer: ''
    });
    setEditingEvent(null);
    setShowNewEventForm(false);
    
    toast({
      title: "Evento actualizado",
      description: "El evento ha sido actualizado exitosamente.",
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    toast({
      title: "Evento eliminado",
      description: "El evento ha sido eliminado del sistema.",
    });
  };

  const handleCancel = () => {
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'Tecnología',
      maxAttendees: 50,
      organizer: ''
    });
    setEditingEvent(null);
    setShowNewEventForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500/20 text-blue-300';
      case 'active': return 'bg-green-500/20 text-green-300';
      case 'completed': return 'bg-gray-500/20 text-gray-300';
      case 'cancelled': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tecnología': return 'bg-purple-500/20 text-purple-300';
      case 'Medio Ambiente': return 'bg-green-500/20 text-green-300';
      case 'Agricultura': return 'bg-yellow-500/20 text-yellow-300';
      case 'Cultura': return 'bg-pink-500/20 text-pink-300';
      case 'Educación': return 'bg-blue-500/20 text-blue-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Eventos</h1>
          <p className="text-muted-foreground">
            Administra los eventos de {cityInfo?.displayName}
          </p>
        </div>
        <Button onClick={() => setShowNewEventForm(true)} className="neon-glow">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Evento
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Eventos Programados</p>
                <p className="text-xl font-bold">{cityEvents.filter(e => e.status === 'scheduled').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">Total Asistentes</p>
                <p className="text-xl font-bold">
                  {cityEvents.reduce((acc, e) => acc + e.currentAttendees, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-muted-foreground">Categorías Activas</p>
                <p className="text-xl font-bold">
                  {new Set(cityEvents.map(e => e.category)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-400" />
              <div>
                <p className="text-sm text-muted-foreground">Completados</p>
                <p className="text-xl font-bold">{cityEvents.filter(e => e.status === 'completed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulario nuevo/editar evento */}
      {showNewEventForm && (
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle>
              {editingEvent ? 'Editar Evento' : 'Nuevo Evento'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Título del Evento</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    className="glass-effect border-white/20"
                    placeholder="Título del evento"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    className="glass-effect border-white/20 min-h-[100px]"
                    placeholder="Descripción del evento..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="date">Fecha</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    className="glass-effect border-white/20"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="time">Hora</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    className="glass-effect border-white/20"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                    className="glass-effect border-white/20"
                    placeholder="Lugar del evento"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Select value={newEvent.category} onValueChange={(value) => setNewEvent(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="glass-effect border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tecnología">Tecnología</SelectItem>
                      <SelectItem value="Medio Ambiente">Medio Ambiente</SelectItem>
                      <SelectItem value="Agricultura">Agricultura</SelectItem>
                      <SelectItem value="Cultura">Cultura</SelectItem>
                      <SelectItem value="Educación">Educación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="maxAttendees">Cupo Máximo</Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    value={newEvent.maxAttendees}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, maxAttendees: parseInt(e.target.value) || 50 }))}
                    className="glass-effect border-white/20"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="organizer">Organizador</Label>
                  <Input
                    id="organizer"
                    value={newEvent.organizer}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, organizer: e.target.value }))}
                    className="glass-effect border-white/20"
                    placeholder="Organización responsable"
                    required
                  />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingEvent ? 'Actualizar' : 'Crear Evento'}
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

      {/* Lista de eventos */}
      <div className="space-y-4">
        {cityEvents.length === 0 ? (
          <Card className="glass-effect border-white/10">
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No hay eventos programados</h3>
              <p className="text-muted-foreground">
                Crea el primer evento para {cityInfo?.displayName}
              </p>
            </CardContent>
          </Card>
        ) : (
          cityEvents.map((event) => (
            <Card key={event.id} className="glass-effect border-white/10 hover:border-primary/20 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <Badge className={getCategoryColor(event.category)}>
                        <Tag className="h-3 w-3 mr-1" />
                        {event.category}
                      </Badge>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status === 'scheduled' ? 'Programado' :
                         event.status === 'active' ? 'Activo' :
                         event.status === 'completed' ? 'Completado' : 'Cancelado'}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString('es-ES')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{event.currentAttendees}/{event.maxAttendees} asistentes</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Organizado por: {event.organizer}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditEvent(event.id)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteEvent(event.id)}
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
