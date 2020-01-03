import { Connection } from 'typeorm';
import { Factory, Seed } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { SampleUser } from '../../api/models/SampleUser';

export class CreateSampleBruce implements Seed {

  public async seed(factory: Factory, connection: Connection): Promise<SampleUser> {
    // const userFactory = factory<SampleUser, { role: string }>(SampleUser as any);
    // const adminUserFactory = userFactory({ role: 'admin' });

    // const bruce = await adminUserFactory.make();
    // console.log(bruce);

    // const bruce2 = await adminUserFactory.seed();
    // console.log(bruce2);

    // const bruce3 = await adminUserFactory
    //     .map(async (e: SampleUser) => {
    //         e.firstName = 'Bruce';
    //         return e;
    //     })
    //     .seed();
    // console.log(bruce3);

    // return bruce;

    // const connection = await factory.getConnection();
    const em = connection.createEntityManager();

    const user = new SampleUser();
    user.id = uuid.v1();
    user.firstName = 'Bruce';
    user.lastName = 'Wayne';
    user.email = 'bruce.wayne@wayne-enterprises.com';
    user.username = 'bruce';
    user.password = '1234';
    return await em.save(user);
  }

}
