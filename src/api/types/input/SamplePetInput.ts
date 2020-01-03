import { Field, InputType, Int } from 'type-graphql';

import { SamplePet } from '../SamplePet';

@InputType()
export class SamplePetInput implements Partial<SamplePet> {

  @Field()
  public name: string;

  @Field(type => Int, {
    description: 'The age of the pet in years.',
  })
  public age: number;

}
