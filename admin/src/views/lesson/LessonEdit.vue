<template>
<div>
 <h3>{{isCreate?"创建":"编辑"}}课时</h3>
    <div style="padding:50px 300px">
        <el-form label-width="100px" style="text-align:center">
            <el-form-item label="所属课程 :">
                <el-select v-model="data.lesson.originCourse" clearable placeholder="请选择">
                <el-option
                v-for="item in selectOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="课时名称 :">
                <el-input v-model="data.lesson.name"></el-input>
            </el-form-item>
            <el-form-item label="课时内容 :">
                <el-input v-model="data.lesson.file"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handleSub">提交</el-button>
            <el-button type="primary" @click="$router.go(-1)">返回</el-button>
        </el-form>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';


@Component({})
export default class LessonEdit extends Vue {
        @Prop(String) id:string
        data={
            lesson:{
                name:"",
                file:"",
                originCourse:"",
            }
        }
        public selectOptions:string []=[]
        fields={
            name:{label:"课程名称"},
            cover:{label:"课程封面图"}
        }
        get isCreate(){
            return !this.id
        }
        async fetch(){
            const cates=await this.$http.get('/lessons/getCourseCate')
            if(cates.data){
                const res=cates.data.map(item=>{return {
                    value:item.name,
                    label:item._id
                }})
                this.selectOptions=res;
            }
        }
        async handleSub(){
            let res=null;
            const dataobj={name:this.data.lesson.name,file:this.data.lesson.file,originCourse:this.data.lesson.originCourse}
            if(this.isCreate){
                res=await this.$http.post("/lessons",dataobj);
                global.console.log(res)
                if(res.data.status=="success"){
                    this.$message.success("课程创建成功")
                    this.$router.go(-1)
                }
            }else{
                global.console.log(this.id)
                res=await this.$http.put(`/lessons/${this.id}`,dataobj)
                if(res.data.status=="success"){
                    this.$message.success("课时修改成功")
                    this.$router.go(-1)
                }
            }
           
        }
        created(){

            let res=null;
            this.fetch();
            if(!this.isCreate){
                this.$http.get(`/lessons/${this.id}`).then((data)=>{
                    res=data.data;
                    this.data.lesson=res;
                })
            }
        }
}
</script>


<style>
.el-select{
    width: 100%;
}
</style>
