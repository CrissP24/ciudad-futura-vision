
import React, { useState } from 'react';
import { UserCard } from '@/components/user-management/UserCard';
import { UserForm } from '@/components/user-management/UserForm';
import { UserFilters } from '@/components/user-management/UserFilters';
import { useApp } from '@/contexts/AppContext';

export function UserManagement() {
  const { users, addUser, updateUser, deleteUser } = useApp();
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">
            Administra los usuarios del sistema
          </p>
        </div>
      </div>

      <UserFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        showNewUserForm={showNewUserForm}
        setShowNewUserForm={setShowNewUserForm}
      />

      {showNewUserForm && (
        <UserForm
          onSubmit={addUser}
          onCancel={() => setShowNewUserForm(false)}
        />
      )}

      <div className="grid gap-4">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No se encontraron usuarios
          </div>
        ) : (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onUpdate={updateUser}
              onDelete={deleteUser}
            />
          ))
        )}
      </div>
    </div>
  );
}
