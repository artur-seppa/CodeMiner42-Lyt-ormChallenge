import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { User } from '../../src/models/User.mjs';

const UserFactory = Factory.define(({ onCreate, sequence, params }) => {
  onCreate(async (user) => await User.query().insert(user));

  const {
    id = sequence,
    name = faker.person.fullName(),
    email = faker.internet.email(),
    password = faker.internet.password({ length: 10 }),
  } = params;

  return {
    id,
    name,
    email,
    password,
  };
});

export { UserFactory };