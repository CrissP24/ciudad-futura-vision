
import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Search,
  Mail,
  Phone,
  Shield,
  UserCheck,
  UserX
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive';
  city: string;
  joinDate: string;
}

export function UserManagement() {
  const { currentCity, cities } = useApp();
  const { toast } = useToast();
  
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Carlos Mendoza',
      email: 'carlos@jipijapa.gob.ec',
      phone: '+593 99 123 4567',
      role: 'Administrador',
      status: 'active',
      city: 'jipijapa',
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Ana García',
      email: 'ana@puertolopez.gob.ec',
      phone: '+593 99 234 5678',
      role: 'Editor',
      status: 'active',
      city: 'puerto-lopez',
      joinDate: '2024-02-20'
    },
    {
      id: '3',
      name: 'Luis Torres',
      email: 'luis@pajan.gob.ec',
      phone: '+593 99 345 6789',
      role: 'Moderador',
      status: 'inactive',
      city: 'pajan',
      joinDate: '2024-03-10'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Editor',
    status: 'active' as const
  });

  const cityInfo = cities.find(city => city.id === currentCity);
  const cityUsers = users.filter(user => user.city === currentCity);
  const filteredUsers = cityUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) return;

    const user: User = {
      ...newUser,
      id: Date.now().toString(),
      city: currentCity,
      joinDate: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [...prev, user]);
    setNewUser({ name: '', email: '', phone: '', role: 'Editor', status: 'active' });
    setShowNewUserForm(false);
    
    toast({
      title: "Usuario creado",
      description: "El nuevo usuario ha sido agregado exitosamente.",
    });
  };

  const handleEditUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setNewUser({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status
      });
      setEditingUser(userId);
      setShowNewUserForm(true);
    }
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser || !newUser.name.trim() || !newUser.email.trim()) return;

    setUsers(prev => prev.map(user =>
      user.id === editingUser ? { ...user, ...newUser } : user
    ));

    setNewUser({ name: '', email: '', phone: '', role: 'Editor', status: 'active' });
    setEditingUser(null);
    setShowNewUserForm(false);
    
    toast({
      title: "Usuario actualizado",
      description: "El usuario ha sido actualizado exitosamente.",
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado del sistema.",
    });
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(prev => prev.map(user =>
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleCancel = () => {
    setNewUser({ name: '', email: '', phone: '', role: 'Editor', status: 'active' });
    setEditingUser(null);
    setShowNewUserForm(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrador': return 'bg-red-500/20 text-red-300';
      case 'Editor': return 'bg-blue-500/20 text-blue-300';
      case 'Moderador': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">
            Administra los usuarios de {cityInfo?.displayName}
          </p>
        </div>
        <Button onClick={() => setShowNewUserForm(true)} className="neon-glow">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Barra de búsqueda */}
      <Card className="glass-effect border-white/10">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuarios por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-effect border-white/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Formulario nuevo/editar usuario */}
      {showNewUserForm && (
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle>
              {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    className="glass-effect border-white/20"
                    placeholder="Nombre completo"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    className="glass-effect border-white/20"
                    placeholder="usuario@ejemplo.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                    className="glass-effect border-white/20"
                    placeholder="+593 99 123 4567"
                  />
                </div>

                <div>
                  <Label htmlFor="role">Rol</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger className="glass-effect border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrador">Administrador</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Moderador">Moderador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingUser ? 'Actualizar' : 'Guardar'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de usuarios */}
      <div className="grid gap-4">
        {filteredUsers.length === 0 ? (
          <Card className="glass-effect border-white/10">
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No hay usuarios</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'No se encontraron usuarios con ese criterio' : 'Agrega el primer usuario'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredUsers.map((user) => (
            <Card key={user.id} className="glass-effect border-white/10 hover:border-primary/20 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold">{user.name}</h3>
                      <Badge className={getRoleColor(user.role)}>
                        <Shield className="h-3 w-3 mr-1" />
                        {user.role}
                      </Badge>
                      <Badge className={user.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
                        {user.status === 'active' ? (
                          <UserCheck className="h-3 w-3 mr-1" />
                        ) : (
                          <UserX className="h-3 w-3 mr-1" />
                        )}
                        {user.status === 'active' ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{user.phone}</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Miembro desde: {new Date(user.joinDate).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStatus(user.id)}
                      className={user.status === 'active' ? 'text-yellow-400 hover:text-yellow-300' : 'text-green-400 hover:text-green-300'}
                    >
                      {user.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditUser(user.id)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
