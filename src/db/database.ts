import Database from "better-sqlite3";

const db = new Database(":memory:");

db.exec(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    jobTitle TEXT NOT NULL,
    country TEXT NOT NULL,
    salary REAL NOT NULL
  )
`);

export default db;
