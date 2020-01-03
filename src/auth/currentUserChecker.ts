import { Action } from 'routing-controllers';
import { Connection } from 'typeorm';

import { SampleUser } from '../api/models/SampleUser';

export function currentUserChecker(connection: Connection): (action: Action) => Promise<SampleUser | undefined> {
  return async function innerCurrentUserChecker(action: Action): Promise<SampleUser | undefined> {
    return action.request.user;
  };
}
