
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const { city } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const { login, cities } = useApp();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cityInfo = cities.find(c => c.name === city);

  if (!cityInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="glass-effect border-red-500/30 max-w-md w-full">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-red-400 mb-2">Ciudad no encontrada</h2>
            <p className="text-muted-foreground">La ciudad especificada no existe en el sistema.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(cityInfo.id, formData.username, formData.password);
    
    if (success) {
      toast({
        title: "Acceso autorizado",
        description: `Bienvenido al sistema de ${cityInfo.displayName}`,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Acceso denegado",
        description: "Credenciales incorrectas. Intenta nuevamente.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const loadCredentials = () => {
    setFormData({
      username: cityInfo.defaultUser.username,
      password: cityInfo.defaultUser.password
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      {/* Fondo con imagen de la ciudad */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${cityInfo.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background" />

      <div className="relative z-10 w-full max-w-md">
        <Card className="glass-effect border-white/20 neon-glow">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${cityInfo.gradient} flex items-center justify-center mb-4 animate-pulse-slow`}>
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <div>
              <CardTitle className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Acceso Administrativo
                </span>
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Sistema SmartCity - {cityInfo.displayName}
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Usuario
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="pl-10 glass-effect border-white/20 focus:border-primary/60"
                    placeholder="Ingresa tu usuario"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 glass-effect border-white/20 focus:border-primary/60"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full neon-glow"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Verificando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Acceder al Sistema</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Credenciales de acceso */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Credenciales de acceso:
                </h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={loadCredentials}
                  className="text-xs"
                >
                  Autocompletar
                </Button>
              </div>
              <div className="space-y-2 text-xs">
                <div className="bg-black/20 rounded p-2 border border-white/10">
                  <div className="text-muted-foreground">Usuario:</div>
                  <div className="text-primary font-mono">{cityInfo.defaultUser.username}</div>
                </div>
                <div className="bg-black/20 rounded p-2 border border-white/10">
                  <div className="text-muted-foreground">Contraseña:</div>
                  <div className="text-primary font-mono">{cityInfo.defaultUser.password}</div>
                </div>
                <div className="bg-black/20 rounded p-2 border border-white/10">
                  <div className="text-muted-foreground">Administrador:</div>
                  <div className="text-accent">{cityInfo.defaultUser.fullName}</div>
                  <div className="text-xs text-muted-foreground">{cityInfo.defaultUser.role}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
