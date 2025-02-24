export function listUrls(sortBy, order, urlDatabase) {
    try {
        let urls = Object.entries(urlDatabase).map(([shortCode, data]) => ({
            shortCode,
            originalUrl: data.originalUrl,
            createdAt: data.createdAt,
            visits: data.visits
        }));

        const validSortOptions = ['views', null];
        const validOrder = ['asc', 'desc', null];

        if (sortBy && !validSortOptions.includes(sortBy)) {
            return {
                status: 'error',
                message: 'Invalid sortBy parameter'
            };
        }

        if (order && !validOrder.includes(order)) {
            return {
                status: 'error',
                message: 'Invalid order parameter'
            };
        }

        if (!sortBy && !order) {
            return urls;
        }

        return urls.sort((a, b) => {
            if (sortBy === 'views') {
                return order === 'desc'
                    ? b.visits - a.visits
                    : a.visits - b.visits;
            }

            return 0;
        });
    } catch (error) {
        throw new Error('Internal server error');
    }
}