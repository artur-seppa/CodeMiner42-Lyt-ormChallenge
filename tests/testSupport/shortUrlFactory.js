import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { ShortUrl } from '../../src/models/ShortUrl.mjs';

const ShortUrlFactory = Factory.define(({ onCreate, sequence, params }) => {
  onCreate(async (shortUrl) => {
    if (!params.id) {
      shortUrl.id = sequence;
    }
    return await ShortUrl.query().insert(shortUrl);
  });

  const {
    id = sequence,
    original_url = faker.internet.url(),
    short_url = `http://localhost:3000/${faker.string.alphanumeric(6)}`,
    user_id = null,
    created_at = new Date().toISOString()
  } = params;

  return {
    id,
    original_url,
    short_url,
    user_id,
    created_at
  };
});

export { ShortUrlFactory };