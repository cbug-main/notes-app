import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(__dirname, '..' ,'database', 'notes.db')


const db = new Database(dbPath)
db.pragma('foreign_keys = ON')

db.exec(`
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )    
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS notes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL, 
        image TEXT, 
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
    )
`)

export default db