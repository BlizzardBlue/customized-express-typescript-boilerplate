import { EntityRepository, Repository } from 'typeorm';

import { SamplePet } from '../models/SamplePet';

@EntityRepository(SamplePet)
export class SamplePetRepository extends Repository<SamplePet> {

  /**
   * Find by user_id is used for our data-loader to get all needed pets in one query.
   */
  public findByUserIds(ids: string[]): Promise<SamplePet[]> {
    return this.createQueryBuilder()
      .select()
      .where(`pet.user_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
      .getMany();
  }

}
