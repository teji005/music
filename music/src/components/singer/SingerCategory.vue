<template>
    <div class="category">
        <ul class="d-flex text-md text-gray1" v-for="(item,index) in singerCategory" :key="index">
            <li v-for="(category,cindex) in item" :key="category.id" :class="{ctactive:flagName[index]===cindex?true:''}" @click="changeCt(index,cindex)">{{category.name}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'singerCategory',
   
    
    data(){
        return{
            singerCategory:{},
            flagName:{
                sex:0,
                area:0,
                genre:0
            }
        }
    },
    created(){
        this.getSingerList()
    },
   mounted(){
       
       
   },
    methods:{
         async getSingerList(){
           
           let singerUrl = 'https://u.y.qq.com/cgi-bin/musics.fcg?-=getUCGI6025857591695991&g_tk=5381&sign=zzass0eqywxs6tgu2f3fef04bda3a286eeb40136f6b80f4a&loginUin=85640610&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%2C%22singerList%22%3A%7B%22module%22%3A%22Music.SingerListServer%22%2C%22method%22%3A%22get_singer_list%22%2C%22param%22%3A%7B%22area%22%3A-100%2C%22sex%22%3A-100%2C%22genre%22%3A-100%2C%22index%22%3A-100%2C%22sin%22%3A0%2C%22cur_page%22%3A1%7D%7D%7D'
           let data=''
           let singerList=await this.$jsonp(singerUrl,data)
           this.$set(this.singerCategory,'sex',singerList.singerList.data.tags.sex)
           this.$set(this.singerCategory,'area',singerList.singerList.data.tags.area)
           this.$set(this.singerCategory,'genre',singerList.singerList.data.tags.genre)
           
           
           
        },
        changeCt(index,cindex){
            this.flagName[index]= cindex
            let parmas = {}
            for(let item in this.flagName){
                parmas[item] = this.singerCategory[item][this.flagName[item]].id
            }
            this.$emit('selectCt',parmas)
        }
        
    }

}
</script>

<style lang="scss">
    .category{
        ul{
            flex-wrap: wrap;
            margin: 0 0 10px 10px;
            li{
                width: 50px;height: 30px;
                text-align: center;
                line-height: 30px;
                border-radius: 15px;
            }
        }
    }
    .ctactive{background-color: aqua;color: white;}
</style>