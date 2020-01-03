import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { SamplePet } from '../../src/api/models/SamplePet';
import { SamplePetService } from '../../src/api/services/SamplePetService';
import { closeDatabase, createDatabaseConnection, migrateDatabase } from '../utils/database';
import { configureLogger } from '../utils/logger';

describe('SamplePetService', () => {

  // -------------------------------------------------------------------------
  // Setup up
  // -------------------------------------------------------------------------

  let connection: Connection;
  beforeAll(async () => {
    configureLogger();
    connection = await createDatabaseConnection();
  });
  beforeEach(() => migrateDatabase(connection));

  // -------------------------------------------------------------------------
  // Tear down
  // -------------------------------------------------------------------------

  afterAll(() => closeDatabase(connection));

  // -------------------------------------------------------------------------
  // Test cases
  // -------------------------------------------------------------------------

  test('should create a new pet in the database', async (done) => {
    const pet = new SamplePet();
    pet.id = 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx';
    pet.name = 'test';
    pet.age = 1;
    const service = Container.get<SamplePetService>(SamplePetService);
    const resultCreate = await service.create(pet);
    expect(resultCreate.name).toBe(pet.name);
    expect(resultCreate.age).toBe(pet.age);

    const resultFind = await service.findOne(resultCreate.id);
    if (resultFind) {
      expect(resultFind.name).toBe(pet.name);
      expect(resultFind.age).toBe(pet.age);
    } else {
      fail('Could not find pet');
    }
    done();
  });

});
