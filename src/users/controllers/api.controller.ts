/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { User } from '../models/entities/user.entity';
import { UsersService } from '../service/users.service';

@Controller('api/users/')
export class ApiController {
  constructor(private readonly userService: UsersService) {}

  // @Post()
  // async createListFromAPI() {
  //   const createdApiData = await this.apiService.createListFromAPI();
  //   return createdApiData;
  // }

  @Post()
  async create(@Body() user: User) {
    const newUser = await this.userService.createUser(user);
    return newUser;
  }

  @Get()
  async findAll() {
    const products = await this.userService.findAll();
    return products;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
  // }
}
