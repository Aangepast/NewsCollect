import express from 'express';
import cors from 'cors';
import {fetchAndSaveFeeds, getWebsites} from './feedService.js';
import {dropFeeds, getFeeds, initializeDB} from './db.js';
import path from "path";
import {fileURLToPath} from "url";

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

initializeDB();
console.log("Database has been initialized");

dropFeeds();

fetchAndSaveFeeds();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../site/public/index.html'));
});

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

app.get('/sites', async (req, res) => {
    try {
        res.json(await getWebsites());
        console.log("Given sites")
    } catch (error) {
        console.error("Error fetching sites for site:", error);
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
