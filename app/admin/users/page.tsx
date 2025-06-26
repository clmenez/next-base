import React, { useEffect, useState } from 'react';
import UserForm from './UserForm';

interface User {
  id: number;
  email: string;
  created_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formUser, setFormUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/auth/users')
      .then(res => res.json())
      .then(data => setUsers(data.users || []));
  }, [showForm]);

  function handleAdd() {
    setFormUser(null);
    setShowForm(true);
  }

  function handleEdit(user: User) {
    setFormUser(user);
    setShowForm(true);
  }

  function handleFormSubmit() {
    setShowForm(false);
  }

  return (
    <div>
      <h1>Usuários</h1>
      <button className="btn btn-primary" onClick={handleAdd}>Adicionar usuário</button>
      <table className="panel" style={{ marginTop: 24, width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Criado em</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.created_at}</td>
              <td>
                <button className="btn" onClick={() => handleEdit(user)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div style={{ marginTop: 32 }}>
          <UserForm
            onSubmit={handleFormSubmit}
            initialData={formUser ? { email: formUser.email } : {}}
            isEdit={!!formUser}
          />
          <button className="btn" onClick={() => setShowForm(false)} style={{ marginTop: 16 }}>Cancelar</button>
        </div>
      )}
    </div>
  );
} 