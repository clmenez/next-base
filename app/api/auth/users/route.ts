import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'users.db');
const db = new Database(dbPath);

db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

export async function GET(req: NextRequest) {
  const users = db.prepare('SELECT id, email, created_at FROM users ORDER BY id DESC').all();
  return NextResponse.json({ users });
} 