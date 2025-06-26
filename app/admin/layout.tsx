import React from 'react';
import Link from 'next/link';
import '../../styles/pb-admin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <nav className="main-menu">
          <Link href="/admin" className="menu-item">Dashboard</Link>
          <Link href="/admin/users" className="menu-item">Usuários</Link>
        </nav>
      </aside>
      <main className="app-body">
        {children}
      </main>
    </div>
  );
} 