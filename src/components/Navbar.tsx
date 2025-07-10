
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, LogOut, Settings, User, Zap } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { currentCity, setCurrentCity, cities, isAuthenticated, currentUser, logout } = useApp();
  const location = useLocation();
  
  const currentCityInfo = cities.find(city => city.id === currentCity);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <Zap className="h-8 w-8 text-primary animate-pulse-slow" />
              <div className="absolute inset-0 h-8 w-8 text-primary opacity-50 animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SmartCity
              </span>
              <span className="text-xs text-muted-foreground">Red Multiciudad</span>
            </div>
          </Link>

          {/* Selector de ciudad */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className={`glass-effect border-primary/30 hover:border-primary/60 ${currentCityInfo?.color}`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <span className="font-medium">{currentCityInfo?.displayName}</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-effect border-white/20">
                {cities.map((city) => (
                  <DropdownMenuItem
                    key={city.id}
                    onClick={() => setCurrentCity(city.id)}
                    className={`cursor-pointer ${city.id === currentCity ? 'bg-primary/20' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${city.color}`} />
                      <div>
                        <div className="font-medium">{city.displayName}</div>
                        <div className="text-xs text-muted-foreground">{city.description}</div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Enlaces de navegación */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/">
                <Button 
                  variant={location.pathname === '/' ? 'default' : 'ghost'}
                  size="sm"
                  className="glass-effect"
                >
                  Inicio
                </Button>
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <Button 
                      variant={location.pathname.includes('/dashboard') ? 'default' : 'ghost'}
                      size="sm"
                      className="glass-effect"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="glass-effect">
                        <User className="h-4 w-4 mr-1" />
                        {currentUser}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="glass-effect border-white/20">
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" />
                        Configuración
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar Sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Link to={`/${currentCity}/login`}>
                  <Button 
                    variant="default"
                    size="sm"
                    className="neon-glow"
                  >
                    Acceder
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
