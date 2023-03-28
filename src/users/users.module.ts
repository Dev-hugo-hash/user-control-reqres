import { Module } from '@nestjs/common';
import { User, UserSchema } from './models/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ApiController } from './controllers/api.controller';
import { UsersService } from './service/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
  ],
  controllers: [ApiController],
  providers: [UsersService],
})
export class UsersModule {}
