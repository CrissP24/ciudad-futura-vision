
import React from 'react';
import { Users, Activity, TrendingUp, Zap, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';

interface StatsCardsProps {
  metrics: {
    totalUsers: number;
    activeServices: number;
    totalServices: number;
    efficiency: number;
    energyConsumption: number;
  };
}

export function StatsCards({ metrics }: StatsCardsProps) {
  const { currentCity, cities } = useApp();
  const cityInfo = cities.find(city => city.id === currentCity);

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

  return (
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
  );
}
