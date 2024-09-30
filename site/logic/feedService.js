import Parser from 'rss-parser';
import { saveFeed } from './db.js';

const parser = new Parser();

async function fetchAndSaveFeeds() {
    const feeds = [
        { url: 'https://feeds.nos.nl/nosnieuwsalgemeen', name: 'NOS News' },
        { url: 'https://www.nu.nl/rss/Algemeen', name: 'NU.nl News' },
    ];

    for (const feed of feeds) {
        try {
            const parsedFeed = await parser.parseURL(feed.url);
            console.log(`Fetching feed: ${parsedFeed.title}`);

            parsedFeed.items.forEach(item => {
                const feedItem = {
                    title: item.title || 'No title',
                    description: item.contentSnippet || 'No description available.',
                    pubDate: item.pubDate || '',
                    author: item.creator || 'Unknown',
                    link: item.link || '#',
                };
                saveFeed(feedItem, feed.name);
                console.log("Saved feed: " + feedItem.title);
            });
        } catch (error) {
            console.error(`Error fetching feed from ${feed.url}:`, error);
        }
    }
}

export { fetchAndSaveFeeds };
