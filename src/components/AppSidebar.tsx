
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  BarChart3,
  Zap,
  Droplets,
  Waves,
  Camera,
  Leaf,
  Truck,
  LogOut,
  Shield,
  Bell,
  Calendar
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Gestión de Blog",
    url: "/dashboard/blog",
    icon: FileText,
  },
  {
    title: "Usuarios",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Estadísticas",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Notificaciones",
    url: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Eventos",
    url: "/dashboard/events",
    icon: Calendar,
  },
];

const serviceIcons = {
  'droplets': Droplets,
  'zap': Zap,
  'waves': Waves,
  'camera': Camera,
  'leaf': Leaf,
  'truck': Truck,
};

export function AppSidebar() {
  const location = useLocation();
  const { currentCity, cities, services, logout, currentUser } = useApp();
  
  const cityInfo = cities.find(c => c.id === currentCity);
  const cityServices = services.filter(s => s.city === currentCity);
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar className="border-r border-white/10">
      <SidebarHeader className="border-b border-white/10 p-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${cityInfo?.gradient} flex items-center justify-center`}>
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">{cityInfo?.displayName}</h2>
            <p className="text-xs text-muted-foreground">SmartCity Admin</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Servicios de Ciudad</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {cityServices.map((service) => {
                const IconComponent = serviceIcons[service.icon as keyof typeof serviceIcons] || Settings;
                return (
                  <SidebarMenuItem key={service.id}>
                    <SidebarMenuButton asChild>
                      <div className="flex items-center justify-between w-full p-2">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4" />
                          <span className="text-sm">{service.name}</span>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          service.status === 'active' ? 'bg-green-400' :
                          service.status === 'maintenance' ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`} />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/settings')}>
                  <NavLink to="/dashboard/settings" className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Configuración</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-4">
        <div className="space-y-3">
          <div className="text-xs">
            <div className="font-medium">{currentUser}</div>
            <div className="text-muted-foreground">{cityInfo?.defaultUser.role}</div>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
