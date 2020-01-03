import { HttpError } from 'routing-controllers';

export class SamplePetNotFoundError extends HttpError {
  constructor() {
    super(404, 'SamplePet not found!');
  }
}
