<template>
    <div>
        <Singer-category @selectCt="selected"></Singer-category>
        <singerList :ok="singerList"></singerList>
    </div>
</template>

<script>
import SingerCategory from './SingerCategory'
export default {
    components:{
        SingerCategory,
        singerList:()=>import('./singerList')
    },

    data(){
        return{
            singerCategory:{},
            singerList:[]
        }
    },
    created(){
      this.getSingerList()
       
       
    },
    methods:{
        async getSingerList(){
           
           let singerUrl = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=getUCGI6025857591695991&g_tk=5381&sign=zzass0eqywxs6tgu2f3fef04bda3a286eeb40136f6b80f4a&loginUin=85640610&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%2C%22singerList%22%3A%7B%22module%22%3A%22Music.SingerListServer%22%2C%22method%22%3A%22get_singer_list%22%2C%22param%22%3A%7B%22area%22%3A-100%2C%22sex%22%3A-100%2C%22genre%22%3A-100%2C%22index%22%3A-100%2C%22sin%22%3A0%2C%22cur_page%22%3A1%7D%7D%7D'
           let data=''
           let singerList=await this.$jsonp(singerUrl,data)
           singerList.singerList.data.singerlist.map((item,index)=>this.$set(this.singerList,index,item))
           
           console.log(singerList)
            this.$store.commit('getSingerList',this.singerList)
           
           
           
        },
        async selected(parmas){
            let singerUrl = `https://u.y.qq.com/cgi-bin/musics.fcg?-=getUCGI6025857591695991&g_tk=5381&sign=zzass0eqywxs6tgu2f3fef04bda3a286eeb40136f6b80f4a&loginUin=85640610&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%2C%22singerList%22%3A%7B%22module%22%3A%22Music.SingerListServer%22%2C%22method%22%3A%22get_singer_list%22%2C%22param%22%3A%7B%22area%22%3A${parmas.area}%2C%22sex%22%3A${parmas.sex}%2C%22genre%22%3A${parmas.genre}%2C%22index%22%3A-100%2C%22sin%22%3A0%2C%22cur_page%22%3A1%7D%7D%7D`
          
           
            let data= ''
            
           console.log(singerUrl)
           let singerList=await this.$jsonp(singerUrl,data)
           console.log(singerList)
        }
    }
}
</script>