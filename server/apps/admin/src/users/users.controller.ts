import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import {User} from '@libs/db/models/user.model';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
class userObj {

    @ApiProperty({description: '用户名称'})
    @IsNotEmpty({message: '请填写用户名称'})
    name: string;

    @ApiProperty({description: '密码'})
    @IsNotEmpty({message: '请填写密码'})
    password: string;
}
// tslint:disable-next-line: max-classes-per-file
@Controller('users')
@ApiTags('用户')
export class UsersController {
     constructor(@InjectModel(User) private readonly userModel: ModelType<User>) {

    }
    @Get()
    @ApiOperation({summary: '用户列表'})
    async index() {
        return await this.userModel.find();
    }
    @Get(':id')
    @ApiOperation({summary: '寻找用户'})
    async detail(@Param( 'id') id: string) {
        return  await this.userModel.findById(id);
    }

    @Post()
    @ApiOperation({summary: '创建用户'})
    async create(@Body() body: userObj) {
        console.log(body);
        await this.userModel.create(body);
        return {
            status: 'success',
        };
    }

    @Put()
    @ApiOperation({summary:'更新用户'})
    async update(@Param('id') id: string, @Body() body: userObj) {
        await this.userModel.findOneAndUpdate(id, body, (err, res) => {
            console.log(err, res);
        });
        return {
            status: 'success',
        };
    }

    @Delete()
    @ApiOperation({summary:'删除用户'})
    async remove(@Param('id') id: string) {
        await this.userModel.deleteOne(id);
        return {
            status: 'success',
        };
    }
}
