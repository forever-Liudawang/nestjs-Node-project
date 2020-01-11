import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Lesson } from './models/lesson.model';

const models = TypegooseModule.forFeature([User, Course, Lesson]);
global.console.log(process.env.DB, process.env);
@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useCreateIndex: true,
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        };
      },
    }),
    //  TypegooseModule.forRoot('mongodb://localhost/nest-vue-project', {
    //    useCreateIndex: true,
    //    useNewUrlParser: true,
    //    useFindAndModify: false,
    //    useUnifiedTopology: true,
    //  }),
     models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
