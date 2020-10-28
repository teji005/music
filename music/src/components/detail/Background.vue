<template>
    <div class="background">
        <img v-if="detailList" :src="detailList[0].img" alt="" width="100%" height="240px">
        <div class="back" ><img src="../../assets/zuo.png" alt="" width="50px" height="50px" @click="back"></div>
        <div class="list">
            <div class="playAll">
                <img src="../../assets/play/stop.png" alt="" width="25px" height="25px" @click="playAll">
                <span>全部播放({{detailList.length}})</span>
            </div>
            <ul>
                <li v-for="(list,index) in detailList" :key="index" class="d-flex jc-between ai-center">
                    
                    <div class="d-flex ai-center">
                        <span style="margin-right:8px" class="text-md">{{index+1}}</span>
                        <div class="listBox">
                            <p>{{list.songname}}</p>
                            <p class="text-gray1">{{list.singer[0].name}}</p>
                        </div>
                    </div>
                    <div>
                        <img src="../../assets/add.png" alt="" width="18px" height="18px">
                    </div>
                </li>
                <div style="text-align:center" @click="more(detailList[detailList.length-1].page,detailList[0].singer[0].name)" v-if="moreflag">加载更多</div>
                <div style="text-align:center" v-else>没有更多了</div>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex' 
export default {
    computed:{
        ...mapState(['detailList'])
    },
    props:['moreflag'],
    data(){
        return{
            
        }
    },
    methods:{
        back(){
            this.$router.push({path:'/'})
        },
        async more(page,name){
            
            let pages = Number(page)+1
            let url = `http://111.229.20.115:8001/music/list?w=${name}&p=${pages}&n=${30}&catZhida=1`
            let res = await this.$http.get(url)
            let list = res.data.data.list.map(item=>{
               
                item.page = pages
                return item
            })
            list = this.detailList.concat(list)
            this.$store.commit('getDetailList',list)
            if(list.length<30){
                this.flag = false
            }
          
        },
        async playAll(){
            let playlist = []
            let info = {}
            this.detailList.map(item=>{
                let url = `http://111.229.20.115:8001/music/song?songmid=${item.songmid}&guid=85640610&lyric=1`
                
                this.$http.get(url).then(res=>{
                    info = res.data.data
                    info.songname = item.songname
                    info.singer = item.singer[0].name
                    info.img = item.img
                    playlist.push(info)
                    localStorage.setItem('playList',JSON.stringify(playlist))
                    this.$store.commit('getPlayList',playlist)
                }) 
            })
            this.$store.commit('getIndex',0)
            this.$router.push('/')
        }
    }
}
</script>
<style lang="scss" scoped>
    .back{
        position: absolute;
        top: 10px;
        left: 10px;
        
    }
    .list{
        margin: 12px;
        
        height: 400px;
        overflow: scroll;
        .playAll{
            height: 25px;
            display: flex;
            align-items: center;
            margin-bottom:20px ;
            img{
                margin-right: 10px;
            }
        }
        ul{
            padding-bottom: 40px;
            li{
                margin-bottom: 15px;
                p{
                    margin-bottom: 5px;
                }
                
            }
        }
    }
</style>