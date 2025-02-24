import { listUrls } from '../service/listUrls.js';
import { deleteShortUrl } from '../service/deleteShortUrl.js';

import { ApplicationError, ERROR_CODES } from '../errors/applicationErro.js';

export class AdminController {
    constructor(urlDatabase) {
        this.urlDatabase = urlDatabase;
    }

    async listUrls(request, reply) {
        const { sortBy, order } = request.query;
        const response = listUrls(sortBy, order, this.urlDatabase)

        if (response.status === 'error') {
            throw new ApplicationError(ERROR_CODES.INVALID_INPUT, response.message);
        }

        return reply.status(200).send({
            response
        });
    }

    async deleteUrl(request, reply) {
        const { shortCode } = request.params;
        const response = deleteShortUrl(shortCode, this.urlDatabase);

        if (response.status === 'error') {
            throw new ApplicationError(ERROR_CODES.RESOURCE_NOT_FOUND, response.message);
        } else {
            return reply.status(200).send({
                status: response.status,
                message: response.message
            });
        }
    }

}