export function deleteShortUrl(urlId, urlDatabase) {
    try {
        const urlEntry = urlDatabase[urlId];

        if (!urlEntry) {
            return {
                status: 'error',
                message: 'Short URL not found'
            };
        }

        delete urlDatabase[urlId];

        return {
            status: 'success',
            message: 'URL deleted successfully'
        };
        
    } catch (error) {
        throw new Error('Internal server error');
    }
}