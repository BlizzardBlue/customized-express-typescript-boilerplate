import { Connection } from 'typeorm';
import { Factory, Seed, times } from 'typeorm-seeding';

import { SamplePet } from '../../api/models/SamplePet';
import { SampleUser } from '../../api/models/SampleUser';

export class CreateSamplePets implements Seed {

  public async seed(factory: Factory, connection: Connection): Promise<any> {
    const em = connection.createEntityManager();
    await times(10, async (n) => {
      const pet = await factory(SamplePet)().seed();
      const user = await factory(SampleUser)().make();
      user.pets = [pet];
      return await em.save(user);
    });
  }

}
