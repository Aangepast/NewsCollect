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

        const feedsByCategory = feeds.reduce((categories, feed) => {
            if (!categories[feed.website]) {
                categories[feed.website] = [];
            }
            categories[feed.website].push(feed);
            return categories;
        }, {});

        for (const category in feedsByCategory) {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category-section';
            categoryElement.innerHTML = `<h2 class="category-title">${category}</h2>`;

            const feedList = document.createElement('div');
            feedList.className = 'feed';

            feedsByCategory[category].forEach(feed => {
                const feedElement = document.createElement('div');
                feedElement.className = 'card';
                feedElement.innerHTML = `
                    <h2 class="item-title">${feed.title}</h2>
                    <h3 class="item-author">Author: ${feed.author} - Date: ${feed.pubDate}</h3>
                    <p class="item-snippet description">${feed.description}</p>
                    <a href="${feed.link}" class="view-btn" target="_blank">View</a>
                `;
                feedList.appendChild(feedElement);
            });

            categoryElement.appendChild(feedList);
            feedContainer.appendChild(categoryElement);
        }
    } catch (error) {
        console.error("Error loading feeds:", error);
    }
}
