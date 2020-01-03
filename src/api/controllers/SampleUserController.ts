import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import {
  Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, Req,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { SampleUserNotFoundError } from '../errors/SampleUserNotFoundError';
import { SampleUser } from '../models/SampleUser';
import { SampleUserService } from '../services/SampleUserService';
import { SamplePetResponse } from './SamplePetController';

class SampleBaseUser {
  @IsNotEmpty()
  public firstName: string;

  @IsNotEmpty()
  public lastName: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public username: string;
}

export class SampleUserResponse extends SampleBaseUser {
  @IsUUID()
  public id: string;

  @ValidateNested({ each: true })
  @Type(() => SamplePetResponse)
  public pets: SamplePetResponse[];
}

class SampleCreateUserBody extends SampleBaseUser {
  @IsNotEmpty()
  public password: string;
}

@Authorized()
@JsonController('/sampleUsers')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class SampleUserController {

  constructor(
    private userService: SampleUserService,
  ) {
  }

  @Get()
  @ResponseSchema(SampleUserResponse, { isArray: true })
  public find(): Promise<SampleUser[]> {
    return this.userService.find();
  }

  @Get('/me')
  @ResponseSchema(SampleUserResponse, { isArray: true })
  public findMe(@Req() req: any): Promise<SampleUser[]> {
    return req.user;
  }

  @Get('/:id')
  @OnUndefined(SampleUserNotFoundError)
  @ResponseSchema(SampleUserResponse)
  public one(@Param('id') id: string): Promise<SampleUser | undefined> {
    return this.userService.findOne(id);
  }

  @Post()
  @ResponseSchema(SampleUserResponse)
  public create(@Body() body: SampleCreateUserBody): Promise<SampleUser> {
    const user = new SampleUser();
    user.email = body.email;
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.password = body.password;
    user.username = body.username;

    return this.userService.create(user);
  }

  @Put('/:id')
  @ResponseSchema(SampleUserResponse)
  public update(@Param('id') id: string, @Body() body: SampleBaseUser): Promise<SampleUser> {
    const user = new SampleUser();
    user.email = body.email;
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.username = body.username;

    return this.userService.update(id, user);
  }

  @Delete('/:id')
  public delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }

}
