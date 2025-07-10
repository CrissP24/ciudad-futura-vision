import React, { useState } from 'react';
import { 
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Search,
  Ban,
  CheckCircle
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  status: 'active' | 'inactive';
}

export function UserManagement() {
  const { currentCity, cities } = useApp();
  const { toast } = useToast();
  
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active'
    },
    {
      id: '2',
      name: 'Operator User',
      email: 'operator@example.com',
      role: 'operator',
      status: 'active'
    },
    {
      id: '3',
      name: 'Viewer User',
      email: 'viewer@example.com',
      role: 'viewer',
      status: 'inactive'
    }
  ]);

  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'operator' | 'viewer'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'viewer' as 'admin' | 'operator' | 'viewer',
    status: 'active' as 'active' | 'inactive'
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUserWithId: User = { ...newUser, id: String(Date.now()) };
    setUsers([...users, newUserWithId]);
    setNewUser({ name: '', email: '', role: 'viewer', status: 'active' });
    setShowNewUserForm(false);
    toast({
      title: "Usuario creado",
      description: "El nuevo usuario ha sido agregado exitosamente.",
    });
  };

  const handleUpdateUser = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    setUsers(users.map(user => user.id === id ? { ...editingUser!, id } : user));
    setEditingUser(null);
    toast({
      title: "Usuario actualizado",
      description: "La información del usuario ha sido actualizada.",
    });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado del sistema.",
    });
  };

  const filteredUsers = users.filter(user => {
    const searchMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = filterRole === 'all' || user.role === filterRole;
    const statusMatch = filterStatus === 'all' || user.status === filterStatus;
    return searchMatch && roleMatch && statusMatch;
  });

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
                  Gestión de Usuarios
                </span>
              </h1>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6">
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Lista de Usuarios</span>
                  </CardTitle>
                  <Button
                    onClick={() => setShowNewUserForm(!showNewUserForm)}
                    size="sm"
                    className="neon-glow"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Nuevo Usuario
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="Buscar usuario..."
                    className="glass-effect border-white/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="flex items-center space-x-4">
                    <Select onValueChange={value => setFilterRole(value as 'all' | 'admin' | 'operator' | 'viewer')}>
                      <SelectTrigger className="w-full glass-effect border-white/20">
                        <SelectValue placeholder="Filtrar por Rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los Roles</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="operator">Operador</SelectItem>
                        <SelectItem value="viewer">Visualizador</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select onValueChange={value => setFilterStatus(value as 'all' | 'active' | 'inactive')}>
                      <SelectTrigger className="w-full glass-effect border-white/20">
                        <SelectValue placeholder="Filtrar por Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los Estados</SelectItem>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="inactive">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {showNewUserForm && (
                  <Card className="glass-effect border-primary/20">
                    <CardContent className="p-4">
                      <form onSubmit={handleCreateUser} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Nombre</Label>
                          <Input
                            id="name"
                            value={newUser.name}
                            onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                            className="glass-effect border-white/20"
                            placeholder="Nombre del usuario"
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
                            placeholder="Email del usuario"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="role">Rol</Label>
                          <Select onValueChange={value => setNewUser(prev => ({ ...prev, role: value as 'admin' | 'operator' | 'viewer' }))}>
                            <SelectTrigger className="glass-effect border-white/20">
                              <SelectValue placeholder="Seleccionar Rol" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Administrador</SelectItem>
                              <SelectItem value="operator">Operador</SelectItem>
                              <SelectItem value="viewer">Visualizador</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="status">Estado</Label>
                          <Select onValueChange={value => setNewUser(prev => ({ ...prev, status: value as 'active' | 'inactive' }))}>
                            <SelectTrigger className="glass-effect border-white/20">
                              <SelectValue placeholder="Seleccionar Estado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Activo</SelectItem>
                              <SelectItem value="inactive">Inactivo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex space-x-2">
                          <Button type="submit" size="sm">
                            <Save className="h-4 w-4 mr-1" />
                            Guardar
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowNewUserForm(false)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancelar
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-3">
                  {filteredUsers.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No se encontraron usuarios.
                    </div>
                  ) : (
                    filteredUsers.map((user) => (
                      <Card key={user.id} className="glass-effect border-white/10 hover:border-primary/20 transition-all">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              {editingUser?.id === user.id ? (
                                <form onSubmit={(e) => handleUpdateUser(e, user.id)} className="space-y-4">
                                  <div>
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input
                                      id="name"
                                      value={editingUser.name}
                                      onChange={(e) => setEditingUser(prev => ({ ...prev!, name: e.target.value }))}
                                      className="glass-effect border-white/20"
                                      placeholder="Nombre del usuario"
                                      required
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                      id="email"
                                      type="email"
                                      value={editingUser.email}
                                      onChange={(e) => setEditingUser(prev => ({ ...prev!, email: e.target.value }))}
                                      className="glass-effect border-white/20"
                                      placeholder="Email del usuario"
                                      required
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="role">Rol</Label>
                                    <Select onValueChange={value => setEditingUser(prev => ({ ...prev!, role: value as 'admin' | 'operator' | 'viewer' }))} defaultValue={editingUser.role}>
                                      <SelectTrigger className="glass-effect border-white/20">
                                        <SelectValue placeholder="Seleccionar Rol" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="admin">Administrador</SelectItem>
                                        <SelectItem value="operator">Operador</SelectItem>
                                        <SelectItem value="viewer">Visualizador</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor="status">Estado</Label>
                                    <Select onValueChange={value => setEditingUser(prev => ({ ...prev!, status: value as 'active' | 'inactive' }))} defaultValue={editingUser.status}>
                                      <SelectTrigger className="glass-effect border-white/20">
                                        <SelectValue placeholder="Seleccionar Estado" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="active">Activo</SelectItem>
                                        <SelectItem value="inactive">Inactivo</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button type="submit" size="sm">
                                      <Save className="h-4 w-4 mr-1" />
                                      Guardar
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setEditingUser(null)}
                                    >
                                      <X className="h-4 w-4 mr-1" />
                                      Cancelar
                                    </Button>
                                  </div>
                                </form>
                              ) : (
                                <>
                                  <h4 className="font-semibold text-sm">{user.name}</h4>
                                  <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
                                  <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                                    <span>Rol: {user.role}</span>
                                    <span>Estado: {user.status === 'active' ? 'Activo' : 'Inactivo'}</span>
                                  </div>
                                </>
                              )}
                            </div>
                            {editingUser?.id === user.id ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingUser(null)}
                                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            ) : (
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingUser(user)}
                                  className="h-8 w-8 p-0 text-blue-400 hover:text-blue-300"
                                >
                                  <Edit3 className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
