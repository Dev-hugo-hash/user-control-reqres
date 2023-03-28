/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { User, UserDocument } from '../models/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private apiModel: Model<UserDocument>) {}

  async createListFromAPI() {
    // Obter dados da API
    const response = await axios.get('https://reqres.in/api/users/');
    const apiData: string[] = response.data.data;
    apiData.map((item) => {
      const newApiData = new this.apiModel(item);
      console.log(newApiData);
      // Salvar o produto no banco de dados
      const savedApiData = newApiData.save();
      return savedApiData;
    });
  }
  async createUser(user: User) {
    const userExists = await this.apiModel.findOne({ id: user.id });
    if (userExists) {
      throw new Error('Product with this ID already exists');
    }
    const newUser = new this.apiModel(user);
    return newUser.save();
  }
  async findAll() {
    return await this.apiModel.find().exec();
  }
  async findById(id: string) {
    const user = await this.apiModel.findById(id).exec();
    return user;
  }
  async remove(id: string) {
    await this.apiModel
      .findByIdAndDelete(id)
      .exec()
      .then(() => console.log('finish!'));
  }
}
