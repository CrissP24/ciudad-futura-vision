
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Database, 
  Wifi,
  Save,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export function Settings() {
  const { currentCity, cities, currentUser } = useApp();
  const { toast } = useToast();
  
  const cityInfo = cities.find(city => city.id === currentCity);
  
  const [settings, setSettings] = useState({
    // Configuración de perfil
    fullName: currentUser || '',
    email: cityInfo?.defaultUser.username + '@' + cityInfo?.name + '.gob.ec' || '',
    phone: '+593 99 123 4567',
    
    // Configuración de notificaciones
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    
    // Configuración del sistema
    theme: 'dark',
    language: 'es',
    autoSave: true,
    dataRetention: '365',
    
    // Configuración de seguridad
    twoFactorAuth: false,
    sessionTimeout: '60',
    
    // Configuración de la ciudad
    cityName: cityInfo?.displayName || '',
    timezone: 'America/Guayaquil',
    currency: 'USD',
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // Aquí normalmente se guardarían en una API o localStorage
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido aplicados exitosamente.",
    });
  };

  const handleExportData = () => {
    const data = {
      settings,
      city: currentCity,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCity}-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Datos exportados",
      description: "La configuración ha sido descargada exitosamente.",
    });
  };

  const handleResetSettings = () => {
    if (confirm('¿Estás seguro de que quieres restablecer toda la configuración?')) {
      setSettings({
        fullName: currentUser || '',
        email: cityInfo?.defaultUser.username + '@' + cityInfo?.name + '.gob.ec' || '',
        phone: '+593 99 123 4567',
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        theme: 'dark',
        language: 'es',
        autoSave: true,
        dataRetention: '365',
        twoFactorAuth: false,
        sessionTimeout: '60',
        cityName: cityInfo?.displayName || '',
        timezone: 'America/Guayaquil',
        currency: 'USD',
      });
      
      toast({
        title: "Configuración restablecida",
        description: "Todos los ajustes han vuelto a sus valores predeterminados.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuración del Sistema</h1>
        <p className="text-muted-foreground">
          Administra la configuración de {cityInfo?.displayName}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuración de Perfil */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Perfil de Usuario</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input
                id="fullName"
                value={settings.fullName}
                onChange={(e) => handleSettingChange('fullName', e.target.value)}
                className="glass-effect border-white/20"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
                className="glass-effect border-white/20"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => handleSettingChange('phone', e.target.value)}
                className="glass-effect border-white/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Notificaciones */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <span>Notificaciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">Notificaciones por Email</Label>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="pushNotifications">Notificaciones Push</Label>
              <Switch
                id="pushNotifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="smsNotifications">Notificaciones SMS</Label>
              <Switch
                id="smsNotifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuración del Sistema */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5 text-primary" />
              <span>Interfaz y Sistema</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="theme">Tema</Label>
              <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                <SelectTrigger className="glass-effect border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Oscuro</SelectItem>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="auto">Automático</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="language">Idioma</Label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                <SelectTrigger className="glass-effect border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="qu">Kichwa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="autoSave">Guardado Automático</Label>
              <Switch
                id="autoSave"
                checked={settings.autoSave}
                onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Seguridad */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Seguridad</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="twoFactorAuth">Autenticación de Dos Factores</Label>
              <Switch
                id="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
              />
            </div>
            
            <div>
              <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
              <Select value={settings.sessionTimeout} onValueChange={(value) => handleSettingChange('sessionTimeout', value)}>
                <SelectTrigger className="glass-effect border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                  <SelectItem value="120">2 horas</SelectItem>
                  <SelectItem value="480">8 horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuración de la Ciudad */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-primary" />
            <span>Configuración de Ciudad</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="cityName">Nombre de la Ciudad</Label>
              <Input
                id="cityName"
                value={settings.cityName}
                onChange={(e) => handleSettingChange('cityName', e.target.value)}
                className="glass-effect border-white/20"
              />
            </div>
            
            <div>
              <Label htmlFor="timezone">Zona Horaria</Label>
              <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                <SelectTrigger className="glass-effect border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Guayaquil">América/Guayaquil</SelectItem>
                  <SelectItem value="America/New_York">América/Nueva_York</SelectItem>
                  <SelectItem value="Europe/Madrid">Europa/Madrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="currency">Moneda</Label>
              <Select value={settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                <SelectTrigger className="glass-effect border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - Dólar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="PEN">PEN - Sol</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estado del Sistema */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wifi className="h-5 w-5 text-primary" />
            <span>Estado del Sistema</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                <Wifi className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="font-semibold">Conectividad</h3>
              <p className="text-sm text-green-400">Excelente</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center">
                <Database className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="font-semibold">Base de Datos</h3>
              <p className="text-sm text-blue-400">Operativa</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="font-semibold">Seguridad</h3>
              <p className="text-sm text-purple-400">Protegido</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botones de Acción */}
      <Card className="glass-effect border-white/10">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleSaveSettings} className="neon-glow">
              <Save className="h-4 w-4 mr-2" />
              Guardar Configuración
            </Button>
            
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Exportar Datos
            </Button>
            
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importar Datos
            </Button>
            
            <Button variant="destructive" onClick={handleResetSettings}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Restablecer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
