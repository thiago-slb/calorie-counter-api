import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { FoodEntryModule } from './food-entry/food-entry.module';
import { FoodModule } from './food/food.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    }),
    ,
    AuthModule,
    UserModule,
    FoodEntryModule,
    FoodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
