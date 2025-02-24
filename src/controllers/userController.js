import { createShortUrl } from '../service/createShortUrl.js';
import { redirectToOriginalUrl } from '../service/redirectToOriginalUrl.js';
import { redirectToVisitsCounter } from '../service/redirectToVisitsCounter.js';

import { ApplicationError, ERROR_CODES } from '../errors/applicationErro.js';

export class UserController {
    constructor(urlDatabase) {
        this.urlDatabase = urlDatabase;
    }

    async createShortUrl(request, reply) {
        const { url: originalUrl } = request.body;
        const response = createShortUrl(originalUrl, this.urlDatabase);

        if (response.status === 'error') {
            throw new ApplicationError(ERROR_CODES.INVALID_INPUT, response.message);
        }

        return reply.status(201).send({
            shortUrl: response.shortUrl,
            originalUrl: response.originalUrl
        });
    }

    async redirect(request, reply) {
        const { shortCode } = request.params;
        const response = redirectToOriginalUrl(shortCode, this.urlDatabase);

        if (response.status === 'error') {
            throw new ApplicationError(ERROR_CODES.RESOURCE_NOT_FOUND, response.message);
        } else {
            reply
                .status(301)
                .redirect(response.redirect);
        }
    }

    async visitsCounter(request, reply) {
        const { shortCode } = request.params;
        const response = redirectToVisitsCounter(shortCode, this.urlDatabase);

        if (response.status === 'error') {
            throw new ApplicationError(ERROR_CODES.RESOURCE_NOT_FOUND, response.message);
        } else {
            return reply.status(200).send({ visits: response.visits });
        }
    }

}