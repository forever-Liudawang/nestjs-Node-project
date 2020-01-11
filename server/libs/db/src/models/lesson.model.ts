import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
export class Lesson {
    @prop()
    @ApiProperty({description: '课时名称'})
    name: string;

    @prop()
    @ApiProperty({description: ''})
    file: string;

    // @prop({ref: 'Course'})
    @prop()
    @ApiProperty({description: '所属课程'})
    // originCourse: Ref<Course>;
    originCourse: string;
}
