import { Factory, Seed } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import { SampleUser } from '../../api/models/SampleUser';

export class CreateSampleUsers implements Seed {

  public async seed(factory: Factory, connection: Connection): Promise<any> {
    await factory(SampleUser)().seedMany(10);
  }

}
