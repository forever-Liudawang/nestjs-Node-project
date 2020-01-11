import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Lesson } from './lesson.model';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
export class Course {
    @prop()
    @ApiProperty({description: '课程名称'})
    name: string;

    @prop()
    @ApiProperty({description: '课程封面'})
    cover: string;
}
