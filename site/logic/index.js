import express from 'express';
import cors from 'cors';
import {fetchAndSaveFeeds} from './feedService.js';
import {dropFeeds, getFeeds, initializeDB} from './db.js';
import path from "path";
import {fileURLToPath} from "url";

const app = express();
const PORT = 3000;


app.use(cors()); // cors
app.use(express.json()); // Parse JSON bodies

// Initialize database
initializeDB();
console.log("Database has been initialized");

// Drop existing feeds if needed
dropFeeds();

// Fetch RSS feeds and save them to the database
fetchAndSaveFeeds();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the site/public directory
app.use(express.static(path.join(__dirname, '../public')));

// Root route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../site/public/index.html'));
});

// Endpoint to get RSS feeds from the database
app.get('/feeds', async (req, res) => {
    try {
        const feeds = await getFeeds();
        res.json(feeds);
        console.log("Given feeds");
    } catch (error) {
        console.error("Error fetching feeds:", error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
