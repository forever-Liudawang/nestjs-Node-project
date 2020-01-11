import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import CourseEdit from '../views/course/CourseEdit.vue'
import LessonEdit from '../views/lesson/LessonEdit.vue'
import List from '../views/List.vue'
Vue.use(VueRouter)

const routes:RouteConfig [] = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {name:'home',component:Home,path:'/'},
      {name:'course-list',component:List,path:'/courses/list',meta:{from:"courses"}},
      {name:'course-edit',component:CourseEdit,path:'/courses/edit/:id',props:true},
      {name:'course-create',component:CourseEdit,path:'/courses/create'},
      {name:'lessons-list',component:List,path:'/lessons/list',meta:{from:"lessons"}},
      {name:'lessons-edit',component:LessonEdit,path:'/lessons/edit/:id',props:true},
      {name:'lessons-create',component:LessonEdit,path:'/lessons/create'},
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
