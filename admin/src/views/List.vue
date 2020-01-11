<template>
    <div>
        <div>
            <el-button type="success" @click="create()" style="margin-bottom:10px">新建</el-button>
        </div>
        <div>
            <h4 style="display:inline-block;margin-right:20px">{{origin=="courses"?"课程":"课时"}}名称:</h4>
            <el-input v-model="searchVal" placeholder="请输入课程名称" clearable size="small" style="display:inline-block;width:200px;margin-right:40px"></el-input>
            <el-button type="success" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button type="success" size="small" icon="el-icon-delete" @click="handleRemove">清空</el-button>
        </div>
        <el-table :data="data.data" border>
            <el-table-column v-for="(field,name) in fields" :sortable="field.label=='课程ID'"
                :prop="name"
                :key="name"
                :label="field.label"
                :width="field.width">
               <template v-if="name=='cover'" v-slot="{row}">
                   <img :src="row.cover"/>
               </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="200px">
                <template v-slot="{row}">
                    <el-button size="small" type="success" @click="edit(row)">编辑</el-button>
                    <el-button size="small" type="warning" @click="remove(row)">删除</el-button>
                </template>
            </el-table-column>
            
        </el-table>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5,10,15,20]"
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total"
        style="margin-top:10px">
        </el-pagination>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop,Watch} from 'vue-property-decorator';


@Component({})
export default class List extends Vue {
        
        data={}
        public origin:string="";
        public searchVal:string="";
        public fields:Object=null;
        public pageData={
            total:0,
            pageSize:5,
            curPageSize:0
        }
        async fetch(){
            const res=await this.$http.get(`${this.origin}`,{params:{limit:this.pageData.pageSize,curPageSize:this.pageData.curPageSize}});
            this.origin=="courses"?this.data=res.data:this.data=res
            this.pageData.total=res.data.count
        }
        created(){
            this.origin=this.$route.meta.from;
            this.origin=="courses"?this.fields={
                _id:{label:"课程ID"},
                name:{label:"课程名称"},
                cover:{label:"课程封面图"}
            }:this.fields={
                 _id:{label:"课时ID"},
                originCourse:{label:"所属课程"},
                name:{label:"课时名称"},
               
            }
            this.fetch();
        }
        async remove(row){
            let conf=null;
            try{
                conf=await this.$confirm("是否确定删除?")
            }catch(e){
                return
            }
            if(conf==="confirm"){
                const res=await this.$http.delete(`/${this.origin}/${row._id}`);
                if(res.data.status=="success"){
                    this.$message("删除成功")
                    this.fetch();
                }
            }
        }
        edit(row){
            this.$router.push(`/${this.origin}/edit/${row._id}`)
        }
        create(){
            this.$router.push(`/${this.origin}/create`)
        }
        handleSizeChange(val){
            this.pageData.pageSize=val;
            this.fetch()
        }
        handleCurrentChange(val){
            this.pageData.curPageSize=val;
            this.fetch()
        }
        
        @Watch("searchVal")     //监听searchVal的变化
        async handleSearch(){
            const res=await this.$http.get(`/${this.origin}/findByKey`,{params:{key:this.searchVal}})
            global.console.log(res)
            this.data=res;
        }
        handleRemove(){
            this.searchVal="";
            this.fetch();
        }
}
</script>


<style scoped>
.el-table__row img{
    width: 60px;
}
</style>
