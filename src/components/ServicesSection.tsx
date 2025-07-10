
import React from 'react';
import { 
  Droplets, 
  Zap, 
  Waves, 
  Camera, 
  Leaf, 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  XCircle 
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const iconMap = {
  droplets: Droplets,
  zap: Zap,
  waves: Waves,
  camera: Camera,
  leaf: Leaf,
  truck: Truck
};

const statusConfig = {
  active: {
    icon: CheckCircle,
    label: 'Activo',
    color: 'bg-green-500/20 text-green-400 border-green-500/30'
  },
  maintenance: {
    icon: AlertTriangle,
    label: 'Mantenimiento',
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  },
  inactive: {
    icon: XCircle,
    label: 'Inactivo',
    color: 'bg-red-500/20 text-red-400 border-red-500/30'
  }
};

export function ServicesSection() {
  const { currentCity, services, cities } = useApp();
  const cityServices = services.filter(service => service.city === currentCity);
  const cityInfo = cities.find(city => city.id === currentCity);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Servicios Inteligentes
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Plataforma integrada de servicios públicos con tecnología IoT y análisis en tiempo real
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cityServices.map((service, index) => {
          const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Zap;
          const statusInfo = statusConfig[service.status];
          const StatusIcon = statusInfo.icon;

          return (
            <Card 
              key={service.id} 
              className="glass-effect border-white/10 hover:border-primary/30 transition-all duration-300 group hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${cityInfo?.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <Badge className={`${statusInfo.color} border`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusInfo.label}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold">{service.name}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Disponibilidad</span>
                    <span className="text-primary font-medium">
                      {service.status === 'active' ? '99.9%' : 
                       service.status === 'maintenance' ? '0%' : 'N/A'}
                    </span>
                  </div>
                  
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        service.status === 'active' ? 'bg-green-400 w-full' :
                        service.status === 'maintenance' ? 'bg-yellow-400 w-1/4' :
                        'bg-red-400 w-0'
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />
                  </div>
                </div>

                {service.status === 'active' && (
                  <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-sm font-medium">
                        Operativo en tiempo real
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Módulos externos simulados */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Módulos Conectados
          </span>
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5 text-primary" />
                <span>Sistema de Monitoreo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Camera className="h-12 w-12 text-primary mx-auto mb-2 animate-pulse" />
                  <p className="text-sm text-muted-foreground">Cámaras en tiempo real</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cityInfo?.displayName} - {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Datos Ambientales</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">24°C</div>
                      <div className="text-xs text-muted-foreground">Temperatura</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">65%</div>
                      <div className="text-xs text-muted-foreground">Humedad</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">Good</div>
                      <div className="text-xs text-muted-foreground">Calidad Aire</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">12 km/h</div>
                      <div className="text-xs text-muted-foreground">Viento</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
