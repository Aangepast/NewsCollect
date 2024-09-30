## NewsCollect

NewsCollect retrieves all kinds of news items from Dutch news outlet's (such as NOS.nl and NU.nl) their RSS and allows you to view them in your browser.

Todo: 
- Add news collections and topic recognize system
- Add news outlet category's
- Add sorting & filter options based on author, date and news outlet
- Add built-in news item viewer without ads, so you no longer have to visit the news outlet website but you can stay on your own ad-free browser.
- Add to the built-in browser an option to highlight all signal words
- Add system that recognizes errors in thinking, spelling or false truths
- Add author viewing system, you can view each author and their written items. If one of their items got flagged for 'false truths' for example, their score will lower.


in `/site/logic` is the server-side, currently ran by express.

in `/site/public` is the client-side.

## API
`/localhost:3000/feeds` gives all raw feeds
