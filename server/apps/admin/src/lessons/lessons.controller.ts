import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Lesson } from '@libs/db/models/lesson.model';
import { IsNotEmpty } from 'class-validator';
import { Course } from '@libs/db/models/course.model';

// tslint:disable-next-line: class-name
class lessonObj {

    @ApiProperty({description: '课时名称'})
    @IsNotEmpty({message: '请填写课时名称'})
    name: string;

    @ApiProperty({description: '课时内容'})
    @IsNotEmpty({message: ''})
    file: string;

    @ApiProperty({description: '所属课程'})
    @IsNotEmpty({message: ''})
    originCourse: string;

}

// tslint:disable-next-line: max-classes-per-file
@Controller('lessons')
@ApiTags('课时')
export class LessonsController {
    constructor(
        @InjectModel(Lesson) private  readonly  lessonModel: ModelType <Lesson>,
        @InjectModel(Course) private  readonly  CourseModel: ModelType <Course>,
    ) {}

    @Get('/getCourseCate')
    @ApiOperation({summary: '获取课程分类'})
    async getOptions() {
        const cates = await this.CourseModel.find();
        return cates;
    }

    @Get('/findByKey')
    @ApiOperation({summary: '根据关键词搜索'})
    async findByKey(@Query() query) {
        const key = query.key;
        global.console.log(key)
        const reg = new RegExp(key, 'i');
        return await this.lessonModel.find({name: {$regex: reg}});
        
    }
    
    @Get()
    @ApiOperation({summary: '课时列表'})
    async index() {
        return await this.lessonModel.find();
    }
    @Get(':id')
    @ApiOperation({summary: '寻找课时'})
    async detail(@Param( 'id') id: string) {
        return  await this.lessonModel.findById(id);
    }

    @Post()
    @ApiOperation({summary: '创建课时'})
    async create(@Body() body: lessonObj) {
        console.log(body);
        await this.lessonModel.create(body);
        return {
            status: 'success',
        };
    }

    @Put(':id')
    @ApiOperation({summary: '更新课时'})
    async update(@Param('id') id: string, @Body() body: lessonObj) {
        await this.lessonModel.findByIdAndUpdate(id, body, (err, res) => {
            console.log(err, res);
        });
        return {
            status: 'success',
        };
    }

    @Delete(':id')
    @ApiOperation({summary: '删除课时'})
    async remove(@Param('id') id: string) {
        await this.lessonModel.findByIdAndDelete(id);
        return {
            status: 'success',
        };
    }



}
