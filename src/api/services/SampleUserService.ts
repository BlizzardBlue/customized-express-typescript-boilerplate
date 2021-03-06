import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { SampleUser } from '../models/SampleUser';
import { SampleUserRepository } from '../repositories/SampleUserRepository';
import { events } from '../subscribers/events';

@Service()
export class SampleUserService {

  constructor(
    @OrmRepository() private userRepository: SampleUserRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    @Logger(__filename) private log: LoggerInterface,
  ) {
  }

  public find(): Promise<SampleUser[]> {
    this.log.info('Find all users');
    return this.userRepository.find({ relations: ['pets'] });
  }

  public findOne(id: string): Promise<SampleUser | undefined> {
    this.log.info('Find one user');
    return this.userRepository.findOne({ id });
  }

  public async create(user: SampleUser): Promise<SampleUser> {
    this.log.info('Create a new user => ', user.toString());
    user.id = uuid.v1();
    const newUser = await this.userRepository.save(user);
    this.eventDispatcher.dispatch(events.sampleUser.created, newUser);
    return newUser;
  }

  public update(id: string, user: SampleUser): Promise<SampleUser> {
    this.log.info('Update a user');
    user.id = id;
    return this.userRepository.save(user);
  }

  public async delete(id: string): Promise<void> {
    this.log.info('Delete a user');
    await this.userRepository.delete(id);
    return;
  }

}
