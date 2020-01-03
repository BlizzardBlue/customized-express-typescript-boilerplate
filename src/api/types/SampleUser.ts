import { Field, ID, ObjectType } from 'type-graphql';

import { SamplePet } from './SamplePet';

@ObjectType({
  description: 'SampleUser object.',
})
export class SampleUser {

  @Field(type => ID)
  public id: string;

  @Field({
    description: 'The first name of the user.',
  })
  public firstName: string;

  @Field({
    description: 'The last name of the user.',
  })
  public lastName: string;

  @Field({
    description: 'The email of the user.',
  })
  public email: string;

  @Field(type => [SamplePet], {
    description: 'A list of pets which belong to the user.',
  })
  public pets: SamplePet[];

}
