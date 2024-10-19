import Parser from 'rss-parser';
import { saveFeed } from './db.js';

const parser = new Parser();

async function getWebsites(){
    return [
        { url: 'https://feeds.nos.nl/nosnieuwsalgemeen', name: 'NOS Nieuws' },
        { url: 'https://www.nu.nl/rss/Algemeen', name: 'NU.nl Nieuws' },
    ];
}

async function fetchAndSaveFeeds() {

    for (const feed of await getWebsites()) {
        try {
            const parsedFeed = await parser.parseURL(feed.url);
            console.log(`Fetching feed: ${parsedFeed.title}`);

            parsedFeed.items.forEach(item => {
                const feedItem = {
                    title: item.title || 'No title',
                    description: item.contentSnippet || 'Beschrijving niet beschikbaar.',
                    pubDate: item.pubDate || '',
                    author: item.creator || parsedFeed.title,
                    link: item.link || '#',
                    copyright: item.copyright || item.rights || parsedFeed.copyright || parsedFeed.title,
                };
                saveFeed(feedItem, feed.name);
                console.log("Saved feed: " + feedItem.title);
            });
        } catch (error) {
            console.error(`Error fetching feed from ${feed.url}:`, error);
        }
    }
}

export { fetchAndSaveFeeds, getWebsites };
