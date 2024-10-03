document.addEventListener('DOMContentLoaded', () => {
    loadFeeds().then(r => console.log('Feeds loaded.'));
    limitDescriptionLength();
})

function limitDescriptionLength() {
    const descriptions = document.querySelectorAll('.description');

    descriptions.forEach(desc => {
        const maxChars = 100;
        const text = desc.textContent;

        if (text.length > maxChars) {
            desc.textContent = text.slice(0, maxChars) + '...';

            desc.setAttribute('title', text);
        }
    });
}

async function loadFeeds() {
    try {
        const response = await fetch('http://localhost:3000/feeds');
        const feeds = await response.json();
        const feedContainer = document.getElementById('feedItems');
        feedContainer.innerHTML = '';

        feeds.forEach(feed => {
            const feedElement = document.createElement('div');
            feedElement.className = 'item card';
            feedElement.innerHTML = `
                    <h2 class="item-title">${feed.title}</h2>
                    <h3 class="item-author">Author: ${feed.author} - Date: ${feed.pubDate}</h3>
                    <p class="item-snippet description">${feed.description}</p>
                    <a href="${feed.link}" class="view-btn" target="_blank">View</a>
                `;
            feedContainer.appendChild(feedElement);
        })
    } catch (error) {
        console.error("Error loading feeds:", error);
    }
}

function createCategories(){

}