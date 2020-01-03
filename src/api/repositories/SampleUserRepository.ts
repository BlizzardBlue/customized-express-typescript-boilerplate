import { EntityRepository, Repository } from 'typeorm';

import { SampleUser } from '../models/SampleUser';

@EntityRepository(SampleUser)
export class SampleUserRepository extends Repository<SampleUser> {

}
