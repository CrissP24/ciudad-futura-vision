
import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity, 
  Zap,
  Droplets,
  Wifi,
  Car
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';

export function Analytics() {
  const { currentCity, cities } = useApp();
  const cityInfo = cities.find(city => city.id === currentCity);

  // Datos simulados para gráficos
  const monthlyData = [
    { month: 'Ene', usuarios: 1200, servicios: 85, energia: 750, agua: 650 },
    { month: 'Feb', usuarios: 1350, servicios: 88, energia: 720, agua: 680 },
    { month: 'Mar', usuarios: 1500, servicios: 92, energia: 800, agua: 700 },
    { month: 'Abr', usuarios: 1650, servicios: 87, energia: 780, agua: 720 },
    { month: 'May', usuarios: 1800, servicios: 95, energia: 850, agua: 740 },
    { month: 'Jun', usuarios: 1950, servicios: 91, energia: 820, agua: 760 },
  ];

  const serviceUsageData = [
    { name: 'Agua Potable', value: 35, color: '#3B82F6' },
    { name: 'Energía Eléctrica', value: 25, color: '#EAB308' },
    { name: 'Internet', value: 20, color: '#10B981' },
    { name: 'Transporte', value: 15, color: '#F59E0B' },
    { name: 'Otros', value: 5, color: '#6B7280' },
  ];

  const realTimeMetrics = [
    { label: 'Usuarios Conectados', value: 1247, change: '+12%', icon: Users, color: 'text-blue-400' },
    { label: 'Servicios Activos', value: 28, change: '+5%', icon: Activity, color: 'text-green-400' },
    { label: 'Consumo Energético', value: 847, change: '-8%', icon: Zap, color: 'text-yellow-400' },
    { label: 'Uso de Agua', value: 73, change: '+3%', icon: Droplets, color: 'text-cyan-400' },
  ];

  const systemHealth = [
    { name: 'Red Eléctrica', status: 98, color: 'bg-green-500' },
    { name: 'Sistema de Agua', status: 95, color: 'bg-blue-500' },
    { name: 'Conectividad', status: 92, color: 'bg-purple-500' },
    { name: 'Transporte', status: 88, color: 'bg-orange-500' },
    { name: 'Seguridad', status: 96, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Estadísticas y Análisis</h1>
        <p className="text-muted-foreground">
          Métricas en tiempo real de {cityInfo?.displayName}
        </p>
      </div>

      {/* Métricas en tiempo real */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {realTimeMetrics.map((metric, index) => (
          <Card key={index} className="glass-effect border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value.toLocaleString()}</p>
                  <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.change} vs mes anterior
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${cityInfo?.gradient}`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de barras - Usuarios por mes */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Crecimiento de Usuarios</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="usuarios" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de líneas - Consumo de servicios */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Consumo de Recursos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }} 
                />
                <Line type="monotone" dataKey="energia" stroke="#EAB308" strokeWidth={3} />
                <Line type="monotone" dataKey="agua" stroke="#06B6D4" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de pastel - Uso de servicios */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle>Distribución de Servicios</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceUsageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {serviceUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Estado del sistema */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle>Estado del Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealth.map((system, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{system.name}</span>
                  <span className="font-medium">{system.status}%</span>
                </div>
                <Progress value={system.status} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Tabla de métricas detalladas */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle>Métricas Detalladas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4">Servicio</th>
                  <th className="text-left p-4">Usuarios Activos</th>
                  <th className="text-left p-4">Disponibilidad</th>
                  <th className="text-left p-4">Rendimiento</th>
                  <th className="text-left p-4">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="p-4 flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span>Red Eléctrica</span>
                  </td>
                  <td className="p-4">12,547</td>
                  <td className="p-4">98.5%</td>
                  <td className="p-4">Excelente</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-300">
                      Operativo
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-blue-400" />
                    <span>Sistema de Agua</span>
                  </td>
                  <td className="p-4">8,923</td>
                  <td className="p-4">95.2%</td>
                  <td className="p-4">Bueno</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-300">
                      Operativo
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-purple-400" />
                    <span>Conectividad</span>
                  </td>
                  <td className="p-4">15,234</td>
                  <td className="p-4">92.8%</td>
                  <td className="p-4">Bueno</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-300">
                      Mantenimiento
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 flex items-center space-x-2">
                    <Car className="h-4 w-4 text-orange-400" />
                    <span>Transporte</span>
                  </td>
                  <td className="p-4">3,456</td>
                  <td className="p-4">88.1%</td>
                  <td className="p-4">Regular</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-300">
                      Operativo
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
