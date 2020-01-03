import { FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { SampleUser as UserModel } from '../models/SampleUser';
import { SamplePetService } from '../services/SamplePetService';
import { SampleUserService } from '../services/SampleUserService';
import { SampleUser } from '../types/SampleUser';

@Service()
@Resolver(of => SampleUser)
export class SampleUserResolver {

  constructor(
    private userService: SampleUserService,
    private petService: SamplePetService,
  ) {
  }

  @Query(returns => [SampleUser])
  public users(): Promise<any> {
    return this.userService.find();
  }

  @FieldResolver()
  public async pets(@Root() user: UserModel): Promise<any> {
    return this.petService.findByUser(user);
  }

}
