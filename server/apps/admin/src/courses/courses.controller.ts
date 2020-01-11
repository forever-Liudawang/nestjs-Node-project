import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Course } from '@libs/db/models/course.model';
import { ModelType, Ref } from '@typegoose/typegoose/lib/types';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Lesson } from '@libs/db/models/lesson.model';
import { arrayProp } from '@typegoose/typegoose';

class courseObj {

    @ApiProperty({description: '用户名称'})
    @IsNotEmpty({message: '请填写课程名称'})
    name: string;

    @ApiProperty({description: '封面'})
    @IsNotEmpty({message: '请上传封面'})
    cover: string;

    // @ApiProperty({description: '课时'})
    // @arrayProp({itemsRef: 'Lesson'})
    // lesson: Ref<Lesson>;
}


class pageObj {
    limit: number;
    pageSize: number;
}

// tslint:disable-next-line: max-classes-per-file
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
    constructor(
        @InjectModel(Course) private  readonly  courseModel: ModelType <Course>,
    ) {}
    @Get()
    @ApiOperation({summary: '课程列表'})
    async index(@Query() query) {
        const {limit, curPageSize} = query;
        const res = {data: null, count: 0};
        res.count = await this.courseModel.count({});
        // tslint:disable-next-line: max-line-length
        res.data = await this.courseModel.find({}).skip(Number(limit) * Number((Number(curPageSize) === 0 ? curPageSize : curPageSize - 1))).limit(Number(limit));
        return res;
    }


    @Get('/findByKey')
    @ApiOperation({summary: '根据关键词搜索'})
    async findByKey(@Query() query) {
        const key = query.key;
        const reg = new RegExp(key, 'i');
        return await this.courseModel.find({name: {$regex: reg}});
    }

   
    @Get(':id')
    @ApiOperation({summary: '寻找课程'})
    async detail(@Param( 'id') id: string) {
        return  await this.courseModel.findById(id);
    }

    @Post()
    @ApiOperation({summary: '创建课程'})
    async create(@Body() body: courseObj) {
        console.log(body);
        await this.courseModel.create(body);
        return {
            status: 'success',
        };
    }

   
    @Put(':id')
    @ApiOperation({summary: '更新课程'})
    async update(@Param('id') id: string, @Body() body: courseObj) {
        console.log(id, body);
        await this.courseModel.findByIdAndUpdate(id, body);
        return {
            status: 'success',
        };
    }


    @Delete(':id')
    @ApiOperation({summary: '删除课程'})
    async remove(@Param('id') id: string) {
        await this.courseModel.findByIdAndDelete(id);
        return {
            status: 'success',
        };
    }
}
