import { HttpError } from 'routing-controllers';

export class SampleUserNotFoundError extends HttpError {
  constructor() {
    super(404, 'SampleUser not found!');
  }
}
