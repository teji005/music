import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/detail',
    name:'datail',
    component:()=>import('@/Detail')
  },
  
  {
    path: '/',
    name: 'index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../Index.vue'),
    redirect:'/hot',
    children:[
      {
        path:'/hot',
        name:'hot',
       
        component:()=>import('../components/hot/Hot')
      },
      {
        path:'/singer',
        name:'singer',
        component:()=>import('../components/singer/Singer')
      },
      {
        path:'/sort',
        name:'sort',
        component:()=>import('../components/sort/Sort')
      },
      {
        path:'/search',
        name:'search',
        component:()=>import('../components/search/Search')
      },
      
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
