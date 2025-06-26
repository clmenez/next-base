import React, { useState } from 'react';

interface UserFormProps {
  onSubmit: (data: { email: string; password: string; passwordConfirm: string; oldPassword?: string }) => void;
  initialData?: { email?: string };
  isEdit?: boolean;
}

export default function UserForm({ onSubmit, initialData = {}, isEdit = false }: UserFormProps) {
  const [email, setEmail] = useState(initialData.email || '');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  function validate() {
    if (!email) return 'Email obrigatório';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Email inválido';
    if (!isEdit && !password) return 'Senha obrigatória';
    if (password !== passwordConfirm) return 'As senhas não coincidem';
    if (isEdit && password && !oldPassword) return 'Informe a senha antiga para alterar';
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    setError(null);
    onSubmit({ email, password, passwordConfirm, oldPassword });
  }

  return (
    <form onSubmit={handleSubmit} className="panel">
      <div className="form-field required">
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className="form-field required">
        <label>Senha {isEdit ? '(deixe em branco para não alterar)' : ''}</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" />
      </div>
      <div className="form-field required">
        <label>Confirmar senha</label>
        <input type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} autoComplete="new-password" />
      </div>
      {isEdit && (
        <div className="form-field required">
          <label>Senha antiga</label>
          <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} autoComplete="current-password" />
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary">Salvar</button>
    </form>
  );
} 