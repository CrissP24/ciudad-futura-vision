
import React from 'react';
import { Activity, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';

export function ServicesStatus() {
  const { currentCity, services } = useApp();
  const cityServices = services.filter(service => service.city === currentCity);

  return (
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
  );
}
