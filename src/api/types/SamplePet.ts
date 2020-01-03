import { Field, ID, Int, ObjectType } from 'type-graphql';

import { SampleUser } from './SampleUser';

@ObjectType({
  description: 'SamplePet object.',
})
export class SamplePet {

  @Field(type => ID)
  public id: string;

  @Field({
    description: 'The name of the pet.',
  })
  public name: string;

  @Field(type => Int, {
    description: 'The age of the pet in years.',
  })
  public age: number;

  @Field(type => SampleUser, {
    nullable: true,
  })
  public owner: SampleUser;

}
