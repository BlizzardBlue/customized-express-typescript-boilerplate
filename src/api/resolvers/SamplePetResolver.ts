import DataLoader from 'dataloader';
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { DLoader } from '../../decorators/DLoader';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Context } from '../Context';
import { SamplePet as PetModel } from '../models/SamplePet';
import { SampleUser as UserModel } from '../models/SampleUser';
import { SamplePetService } from '../services/SamplePetService';
import { SamplePetInput } from '../types/input/SamplePetInput';
import { SamplePet } from '../types/SamplePet';

@Service()
@Resolver(of => SamplePet)
export class SamplePetResolver {

  constructor(
    private petService: SamplePetService,
    @Logger(__filename) private log: LoggerInterface,
    @DLoader(UserModel) private userLoader: DataLoader<string, UserModel>,
  ) {
  }

  @Query(returns => [SamplePet])
  public pets(@Ctx() { requestId }: Context): Promise<PetModel[]> {
    this.log.info(`{${requestId}} Find all users`);
    return this.petService.find();
  }

  @Mutation(returns => SamplePet)
  public async addPet(@Arg('pet') pet: SamplePetInput): Promise<PetModel> {
    const newPet = new PetModel();
    newPet.name = pet.name;
    newPet.age = pet.age;
    return this.petService.create(newPet);
  }

  @FieldResolver()
  public async owner(@Root() pet: PetModel): Promise<any> {
    if (pet.userId) {
      return this.userLoader.load(pet.userId);
    }
    // return this.userService.findOne(`${pet.userId}`);
  }

  // user: createDataLoader(SampleUserRepository),

  //     petsByUserIds: createDataLoader(SamplePetRepository, {
  //         method: 'findByUserIds',
  //         key: 'userId',
  //         multiple: true,
  //     }),

}
