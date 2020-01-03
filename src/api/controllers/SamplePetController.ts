import { IsNotEmpty, IsNumber, IsUUID, ValidateNested } from 'class-validator';
import {
  Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { SamplePetNotFoundError } from '../errors/SamplePetNotFoundError';
import { SamplePet } from '../models/SamplePet';
import { SamplePetService } from '../services/SamplePetService';
import { SampleUserResponse } from './SampleUserController';

class BasePet {
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  public age: number;
}

export class SamplePetResponse extends BasePet {
  @IsUUID()
  public id: string;

  @ValidateNested()
  public user: SampleUserResponse;
}

class CreatePetBody extends BasePet {
  @IsUUID()
  public userId: string;
}

@Authorized()
@JsonController('/samplePets')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class SamplePetController {

  constructor(
    private petService: SamplePetService,
  ) {
  }

  @Get()
  @ResponseSchema(SamplePetResponse, { isArray: true })
  public find(): Promise<SamplePet[]> {
    return this.petService.find();
  }

  @Get('/:id')
  @OnUndefined(SamplePetNotFoundError)
  @ResponseSchema(SamplePetResponse)
  public one(@Param('id') id: string): Promise<SamplePet | undefined> {
    return this.petService.findOne(id);
  }

  @Post()
  @ResponseSchema(SamplePetResponse)
  public create(@Body({ required: true }) body: CreatePetBody): Promise<SamplePet> {
    const pet = new SamplePet();
    pet.age = body.age;
    pet.name = body.name;
    pet.userId = body.userId;

    return this.petService.create(pet);
  }

  @Put('/:id')
  @ResponseSchema(SamplePetResponse)
  public update(@Param('id') id: string, @Body() body: BasePet): Promise<SamplePet> {
    const pet = new SamplePet();
    pet.age = body.age;
    pet.name = body.name;

    return this.petService.update(id, pet);
  }

  @Delete('/:id')
  public delete(@Param('id') id: string): Promise<void> {
    return this.petService.delete(id);
  }

}
