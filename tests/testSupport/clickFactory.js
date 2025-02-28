import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { Clicks } from '../../src/models/Clicks.mjs';
import { ShortUrl } from '../../src/models/ShortUrl.mjs';

const ClicksFactory = Factory.define(({ onCreate, sequence, params }) => {
    onCreate(async (click) => await Clicks.query().insert(click));

    const {
        id = sequence,
        ip_address = faker.internet.ipv4(),
        shorturl_id = null,
        created_at = new Date().toISOString()
    } = params;

    return {
        id,
        ip_address,
        shorturl_id,
        created_at
    };
});

export { ClicksFactory };