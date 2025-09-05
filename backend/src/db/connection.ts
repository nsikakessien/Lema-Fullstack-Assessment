import sqlite3 from "sqlite3";
import config from "config";

const dbPath = config.get("dbPath") as string;
export const connection = new sqlite3.Database(dbPath);

const db = new sqlite3.Database(config.get("dbPath"));

db.run(`
  CREATE TABLE IF NOT EXISTS user_adders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);
