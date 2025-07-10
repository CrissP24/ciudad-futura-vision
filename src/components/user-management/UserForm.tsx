import React, { useState } from 'react';

export function UserForm({ onSubmit, onCancel }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ id: Date.now(), name, email, role });
    setName('');
    setEmail('');
    setRole('user');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded">
      <input
        className="border p-1 rounded w-full"
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        className="border p-1 rounded w-full"
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <select
        className="border p-1 rounded w-full"
        value={role}
        onChange={e => setRole(e.target.value)}
      >
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-2 py-1 rounded">Guardar</button>
        <button type="button" className="bg-gray-300 px-2 py-1 rounded" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
} 