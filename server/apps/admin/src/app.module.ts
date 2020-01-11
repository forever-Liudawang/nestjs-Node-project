import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsController } from './lessons/lessons.controller';
import { LessonsModule } from './lessons/lessons.module';
import { MulterModule } from '@nestjs/platform-express';
// const MAO = require('multer-aliyun-oss'); 用于云存储
@Module({
  imports: [
    MulterModule.register({   //配置图片的存放地址
      dest: 'uploads',
      //   storage: MAO({      //云存储
      //     config: {
      //         region: '<region>',
      //         accessKeyId: '<accessKeyId>',
      //         accessKeySecret: '<accessKeySecret>',
      //         bucket: '<bucket>',
      //     },
      // }),
    }),
    DbModule,
    UsersModule,
    CoursesModule,
    LessonsModule,
  ],
  controllers: [AppController, LessonsController],
  providers: [AppService],
})
export class AppModule {}
