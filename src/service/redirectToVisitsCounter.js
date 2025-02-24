export function redirectToVisitsCounter(shortCode, urlDatabase) {
    try {
        const urlEntry = urlDatabase[shortCode];

        if (!urlEntry) {
            return {
                status: 'error',
                message: 'Short URL not found'
            };
        } else {
            return {
                status: 'success',
                visits: urlEntry.visits
            };
        }
    } catch (error) {
        throw new Error('Internal server error');
    }
}