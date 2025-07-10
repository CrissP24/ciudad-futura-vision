
import React from 'react';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      message: 'Sistema de agua actualizado',
      time: 'Hace 2 horas',
      type: 'success'
    },
    {
      id: 2,
      message: 'Mantenimiento programado',
      time: 'Hace 4 horas',
      type: 'warning'
    },
    {
      id: 3,
      message: 'Nueva publicación creada',
      time: 'Hace 6 horas',
      type: 'success'
    }
  ];

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>Actividad Reciente</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-2 rounded border border-white/10">
              {activity.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5" />
              )}
              <div className="text-sm">
                <p>{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
