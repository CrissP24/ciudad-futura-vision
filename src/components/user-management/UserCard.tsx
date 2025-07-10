import React from 'react';

export function UserCard({ user, onUpdate, onDelete }: any) {
  return (
    <div className="border p-4 rounded shadow flex justify-between items-center">
      <div>
        <div className="font-bold">{user.name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
        <div className="text-xs text-gray-400">Rol: {user.role}</div>
      </div>
      <div className="flex gap-2">
        <button className="text-blue-600" onClick={() => onUpdate(user)}>Editar</button>
        <button className="text-red-600" onClick={() => onDelete(user.id)}>Eliminar</button>
      </div>
    </div>
  );
} 