import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { ShortUrl } from '../../src/models/ShortUrl.mjs';

const ShortUrlFactory = Factory.define(({ onCreate, sequence, params }) => {
  // onCreate(async (shortUrl) => {
  //   if (!params.id) {
  //     shortUrl.id = sequence;
  //   }
  //   return await ShortUrl.query().insert(shortUrl);
  // });

  onCreate(async (short_url) => ShortUrl.query().insert(short_url));

  const {
    id = sequence,
    original_url = faker.internet.url(),
    short_url = `http://localhost:3000/${faker.string.alphanumeric(6)}`,
    utm_parameters = {
      utm_source: faker.lorem.word(),
      utm_medium: faker.lorem.word(),
      utm_campaign: faker.lorem.word()
    },
    user_id = null,

    created_at = new Date().toISOString()
  } = params;

  return {
    id,
    original_url,
    short_url,
    user_id,
    utm_parameters,
    created_at
  };
});

export { ShortUrlFactory };