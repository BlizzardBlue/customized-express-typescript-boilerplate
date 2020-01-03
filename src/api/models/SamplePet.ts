import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { SampleUser } from './SampleUser';

@Entity()
export class SamplePet {

  @PrimaryColumn('uuid')
  public id: string;

  @IsNotEmpty()
  @Column()
  public name: string;

  @IsNotEmpty()
  @Column()
  public age: number;

  @Column({
    name: 'user_id',
    nullable: true,
  })
  public userId: string;

  @ManyToOne(type => SampleUser, user => user.pets)
  @JoinColumn({ name: 'user_id' })
  public user: SampleUser;

  public toString(): string {
    return `${this.name}`;
  }

}
