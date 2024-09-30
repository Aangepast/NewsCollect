import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'feeds.db');
const db = new sqlite3.Database(dbPath);

// Initialize the database
function initializeDB() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS feeds (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            pubDate TEXT,
            author TEXT,
            link TEXT,
            website TEXT
        )`);
    });
}

// Function to save feeds to the database
function saveFeed(feed, website) {
    const stmt = db.prepare(`INSERT INTO feeds (title, description, pubDate, author, link, website) VALUES (?, ?, ?, ?, ?, ?)`);
    stmt.run(feed.title, feed.description, feed.pubDate, feed.author, feed.link, website);
    stmt.finalize();
}

// Function to retrieve feeds from the database
function getFeeds() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM feeds", [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function dropFeeds(){
    const stmt = db.prepare(`DELETE FROM feeds`);
    stmt.run();
    stmt.finalize();
}

export { initializeDB, saveFeed, getFeeds, dropFeeds };
