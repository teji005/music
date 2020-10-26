<template>
    <div>
        <h1 class="text-primary text-lg" style="text-align:center;font-weight:bold;margin-top:10px;margin-bottom:20px">Function Music</h1>
        <img src="../../assets/logo.png" alt="" class="pos-a" style="right:20px;top:10px; border-radius:50%;width:20px;height:20px">
        <div class="d-flex jc-around" style="margin-bottom:20px">
            <div v-for="item in navList" :key="item.name" :class="{'nav-active':item.path===$route.path,'text-gray1':true,'text-md':true}" @click="navClick(item.path)">{{item.name}}</div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
   data(){
       return{
           navList:[
               {path:'/hot',name:'推荐'},
               {path:'/singer',name:'歌手'},
               {path:'/sort',name:'排行'},
               {path:'/search',name:'搜索'}
           ]
       }
   },
   methods:{
       navClick(path){
           this.$emit('navClick',path)
       }
   }
}
</script>

<style lang="scss" >
   
   .nav-active{color:aqua;font-weight: bold;}
</style>