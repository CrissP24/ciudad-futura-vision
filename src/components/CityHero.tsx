
import React from 'react';
import { MapPin, Users, Zap, Leaf } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';

export function CityHero() {
  const { currentCity, cities } = useApp();
  const cityInfo = cities.find(city => city.id === currentCity);

  if (!cityInfo) return null;

  const stats = [
    { icon: Users, label: 'Ciudadanos', value: '45,231', color: 'text-blue-400' },
    { icon: Zap, label: 'Servicios Activos', value: '12', color: 'text-green-400' },
    { icon: Leaf, label: 'Sostenibilidad', value: '89%', color: 'text-emerald-400' },
    { icon: MapPin, label: 'Zonas Smart', value: '8', color: 'text-purple-400' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cityInfo.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
        <div className={`absolute inset-0 bg-gradient-to-r ${cityInfo.gradient}`} />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Información de la ciudad */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${cityInfo.color} animate-pulse`} />
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                  SmartCity Network
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  {cityInfo.displayName}
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {cityInfo.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="glass-effect rounded-lg p-4 border border-primary/20">
                <div className="text-sm text-muted-foreground">Estado del Sistema</div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 font-medium">Operativo</span>
                </div>
              </div>
              
              <div className="glass-effect rounded-lg p-4 border border-primary/20">
                <div className="text-sm text-muted-foreground">Última Actualización</div>
                <div className="text-primary font-medium mt-1">Hace 2 minutos</div>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-effect border-white/10 hover:border-primary/30 transition-all duration-300 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${cityInfo.gradient}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-float" />
    </div>
  );
}
