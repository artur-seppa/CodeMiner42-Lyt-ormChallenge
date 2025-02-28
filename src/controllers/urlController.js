import { UrlService } from '../service/urlService.js';
import { UserService } from '../service/userService.js';

export class UrlController {
    constructor() {
        this.urlService = new UrlService();
        this.userService = new UserService();
    }

    async createShortUrl(request, reply) {
        try {
            const { user_id, url: original_url } = request.body;
            const response = await this.urlService.createShortUrl(user_id, original_url);

            if (response.status === 'error') {
                return reply.status(400).send({
                    message: response.message
                });
            }

            return reply.status(201).send({
                status: response.status,
                short_url: response.short_url,
                original_url: response.original_url
            });
        } catch (error) {
            return reply.status(500).send(
                error
            );
        }

    }

    async redirect(request, reply) {
        try {
            const { shortCode } = request.params;
            const ip_address = request.ip;

            const response = await this.urlService.getOriginalUrl(ip_address, shortCode);

            if (response.status === 'error') {
                return reply.status(404).send({
                    message: response.message
                });
            } else {
                return reply.status(301).redirect(response.original_url);
            }
        } catch (error) {
            return reply.status(500).send({
                error
            });
        }
    }

    async visitsCounter(request, reply) {
        const { shortCode } = request.params;

        const response = await this.urlService.getUrlVisits(shortCode);

        if (response.status === 'error') {
            return reply.status(404).send({
                message: response.message
            });
        }

        return reply.status(200).send({ visits: response.visits });
    }
}