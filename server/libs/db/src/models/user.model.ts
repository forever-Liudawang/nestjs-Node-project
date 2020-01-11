import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
export class User {
    @prop()
    @ApiProperty({description: '名字'})
    name: string;

    @prop()
    @ApiProperty({description: '密码'})
    password: string;
}
