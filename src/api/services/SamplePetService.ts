import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { SamplePet } from '../models/SamplePet';
import { SampleUser } from '../models/SampleUser';
import { SamplePetRepository } from '../repositories/SamplePetRepository';
import { events } from '../subscribers/events';

@Service()
export class SamplePetService {

  constructor(
    @OrmRepository() private petRepository: SamplePetRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    @Logger(__filename) private log: LoggerInterface,
  ) {
  }

  public find(): Promise<SamplePet[]> {
    this.log.info('Find all pets');
    return this.petRepository.find();
  }

  public findByUser(user: SampleUser): Promise<SamplePet[]> {
    this.log.info('Find all pets of the user', user.toString());
    return this.petRepository.find({
      where: {
        userId: user.id,
      },
    });
  }

  public findOne(id: string): Promise<SamplePet | undefined> {
    this.log.info('Find all pets');
    return this.petRepository.findOne({ id });
  }

  public async create(pet: SamplePet): Promise<SamplePet> {
    this.log.info('Create a new pet => ', pet.toString());
    pet.id = uuid.v1();
    const newPet = await this.petRepository.save(pet);
    this.eventDispatcher.dispatch(events.samplePet.created, newPet);
    return newPet;
  }

  public update(id: string, pet: SamplePet): Promise<SamplePet> {
    this.log.info('Update a pet');
    pet.id = id;
    return this.petRepository.save(pet);
  }

  public async delete(id: string): Promise<void> {
    this.log.info('Delete a pet');
    await this.petRepository.delete(id);
    return;
  }

}
