
import React from 'react';
import { Shield } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { AppSidebar } from '@/components/AppSidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { PerformanceMetrics } from '@/components/dashboard/PerformanceMetrics';
import { ServicesStatus } from '@/components/dashboard/ServicesStatus';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { BlogManagement } from '@/components/dashboard/BlogManagement';

export function Dashboard() {
  const { currentCity, cities, services } = useApp();
  const cityInfo = cities.find(city => city.id === currentCity);
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

  const performanceData = [
    { name: 'Uso de Agua', value: metrics.waterUsage, color: 'bg-blue-500' },
    { name: 'Flujo de Tráfico', value: metrics.trafficFlow, color: 'bg-green-500' },
    { name: 'Calidad del Aire', value: metrics.airQuality, color: 'bg-purple-500' },
    { name: 'Eficiencia Energética', value: metrics.efficiency, color: 'bg-yellow-500' },
  ];

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
            <StatsCards metrics={metrics} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PerformanceMetrics performanceData={performanceData} />
              <ServicesStatus />
              <RecentActivity />
            </div>

            <BlogManagement />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
