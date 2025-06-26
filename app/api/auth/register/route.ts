import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';
// @ts-ignore
import bcrypt from 'bcryptjs';

const dbPath = path.resolve(process.cwd(), 'users.db');
const db = new Database(dbPath);

db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required.' }, { status: 400 });
  }
  const hashed = await bcrypt.hash(password, 10);
  try {
    const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    stmt.run(email, hashed);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json({ error: 'Email already registered.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 });
  }
} 