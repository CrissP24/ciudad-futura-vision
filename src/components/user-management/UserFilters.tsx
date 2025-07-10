import React from 'react';

export function UserFilters({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  showNewUserForm,
  setShowNewUserForm
}: any) {
  return (
    <div className="flex gap-2 items-center mb-4">
      <input
        className="border p-1 rounded"
        placeholder="Buscar usuario..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <select
        className="border p-1 rounded"
        value={roleFilter}
        onChange={e => setRoleFilter(e.target.value)}
      >
        <option value="all">Todos</option>
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <button
        className="bg-green-600 text-white px-2 py-1 rounded"
        onClick={() => setShowNewUserForm(!showNewUserForm)}
      >
        {showNewUserForm ? 'Cerrar' : 'Nuevo Usuario'}
      </button>
    </div>
  );
} 