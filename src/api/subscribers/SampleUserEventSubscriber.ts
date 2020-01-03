import { EventSubscriber, On } from 'event-dispatch';

import { Logger } from '../../lib/logger';
import { SampleUser } from '../models/SampleUser';
import { events } from './events';

const log = new Logger(__filename);

@EventSubscriber()
export class SampleUserEventSubscriber {

  @On(events.sampleUser.created)
  public onSampleUserCreate(user: SampleUser): void {
    log.info('User ' + user.toString() + ' created!');
  }

}
