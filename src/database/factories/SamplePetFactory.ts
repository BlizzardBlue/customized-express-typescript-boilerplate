import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { SamplePet } from '../../api/models/SamplePet';

define(SamplePet, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const name = faker.name.firstName(gender);

  const pet = new SamplePet();
  pet.id = uuid.v1();
  pet.name = name;
  pet.age = faker.random.number();
  return pet;
});
