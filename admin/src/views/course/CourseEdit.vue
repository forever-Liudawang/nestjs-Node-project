<template>
<div>
 <h3>{{isCreate?"创建":"编辑"}}课程</h3>
    <div style="padding:50px 300px">
        <el-form label-width="100px" style="text-align:center">
            <el-form-item label="课程名称 :">
                <el-input v-model="data.course.name"></el-input>
            </el-form-item>
            <el-form-item label="课程封面图 :">
               <el-upload
                class="avatar-uploader"
                action="http://localhost:3000/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSub">提交</el-button>
                <el-button type="primary" @click="$router.go(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';


@Component({})
export default class CourseEdit extends Vue {
        @Prop(String) id:string
        data={
            course:{
                name:"",
                cover:""
            }
        }
        public imageUrl:string="";
        fields={
            name:{label:"课程名称"},
            cover:{label:"课程封面图"}
        }
        get isCreate(){
            return !this.id
        }
        async fetch(url,method){
            global.console.log(url,method)
            const res=await this.$http[method](url);
            return res;
        }
        async handleSub(){
            let res=null;
            const dataobj={name:this.data.course.name,cover:this.data.course.cover}
            if(this.isCreate){
                res=await this.$http.post("/courses",dataobj);
                if(res.data.status=="success"){
                    this.$message.success("课程创建成功")
                    this.$router.go(-1)
                }
            }else{
                global.console.log(this.id)
                res=await this.$http.put(`/courses/${this.id}`,dataobj)
                if(res.data.status=="success"){
                    this.$message.success("课程修改成功")
                    this.$router.go(-1)
                }
            }
           
        }
        created(){
            let res=null;
            if(!this.isCreate){
                this.$http.get(`/courses/${this.id}`).then((data)=>{
                    res=data.data;
                    // global.console.log(res)
                    this.imageUrl=res.cover
                    this.data.course=res;
                })
            }
        }
        handleAvatarSuccess(res, file) {
            this.data.course.cover=res.url
            this.imageUrl = URL.createObjectURL(file.raw);
        }
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            global.console.log(file)
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
}
</script>


<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
