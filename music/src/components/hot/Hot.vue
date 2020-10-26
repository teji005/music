<template>
  <div class="hotbox">
    <swiper :options="swiperOption"  v-if="banners.length>0" >
      <swiper-slide v-for="item in banners" :key="item">
        <img :src="item" alt="" width="100%">
      </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <ul class="hot">
      <li v-for="item in hotList" :key="item.url">
        <img :src="item.url"/>
        <div>
        <p class="text-md" style="margin:15px 0">{{item.name}}</p>
        <p class="text-sm text-gray1" style="margin:15px 0">{{item.title}}</p>
      </div>
    </li>
  </ul>
  </div>
</template>

<script>

import 'swiper/swiper-bundle.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    components: {
        swiper,
        swiperSlide
    },
    
    data(){
        return{
            hotList:[],
            banners:[],
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable:true,
                  },
                    // ...
                loop:true,
                autoplay:{
                  delay:3000,
                  stopOnLastSlide: false,
                  disableOnInteraction: false

                }
              },
               
        }
    },
    mounted() {
      
      
      this.getSwiper()
      this.getHotList()
    },
    methods:{
       
        async getSwiper(){
            let res = await this.$http.get('/lbt')
            res = res.data.lbt.data.map((item)=>'http://www.zhouyongju.com/usr/themes/zhouyongju/resource/app/music/lbt/'+item.img+'.jpg')
            this.banners = res
            
        },
        async getHotList(){
          let res = await this.$http.get('/recommend')
          let hoturl = res.data.url[0]
          let data=''
          res=await this.$jsonp(hoturl,data)

          res=res.playlist.data.v_playlist.map((item)=>{
            let obj={}
            obj.url=item.cover_url_small
            obj.title=item.title
            obj.name=item.creator_info.nick
            return obj
          })
          this.hotList = res
          console.log(res)
        }
    }
}
</script>

<style lang="scss">
  .hotbox{height:550px;overflow: scroll;}
  .hot{
    margin:20px;
    margin-bottom: 60px;
    
    li{
      display:flex;
      width: 100%;
      height: 80px;
      margin-bottom:30px;
      img{width: 80px;height: 80px;margin-right:15px}
    }
  }
</style>