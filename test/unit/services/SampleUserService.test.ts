import { SampleUser } from '../../../src/api/models/SampleUser';
import { SampleUserService } from '../../../src/api/services/SampleUserService';
import { events } from '../../../src/api/subscribers/events';
import { EventDispatcherMock } from '../lib/EventDispatcherMock';
import { LogMock } from '../lib/LogMock';
import { RepositoryMock } from '../lib/RepositoryMock';

describe('SampleUserService', () => {

  test('Find should return a list of users', async (done) => {
    const log = new LogMock();
    const repo = new RepositoryMock();
    const ed = new EventDispatcherMock();
    const user = new SampleUser();
    user.id = '1';
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.email = 'john.doe@test.com';
    repo.list = [user];
    const userService = new SampleUserService(repo as any, ed as any, log);
    const list = await userService.find();
    expect(list[0].firstName).toBe(user.firstName);
    done();
  });

  test('Create should dispatch subscribers', async (done) => {
    const log = new LogMock();
    const repo = new RepositoryMock();
    const ed = new EventDispatcherMock();
    const user = new SampleUser();
    user.id = '1';
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.email = 'john.doe@test.com';
    const userService = new SampleUserService(repo as any, ed as any, log);
    const newUser = await userService.create(user);
    expect(ed.dispatchMock).toBeCalledWith([events.sampleUser.created, newUser]);
    done();
  });

});
