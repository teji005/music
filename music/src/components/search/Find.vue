<template>
    <div class="find">
        <div class="searchBox">
            <input type="text" placeholder="搜索音乐、视频、歌单、歌手、用户名等等" @focus="search" ref='search' v-model.trim="searchCode" @change="find">
            <img src="../../assets/x.png" alt="" v-if="searchCode.length" @click="clearCode"/>
        </div>
        <div class="banner">
            <div v-if="flag===0">
            <div class="history" v-if="history.length>0">
                <div class="d-flex jc-between">
                    <h3>历史搜索</h3>
                    <img src="../../assets/delete.png" alt="" width="18px" @click="claerHistory">
                </div>
                <div><span v-for="(item,index) in history" :key="index" @click="historySearch">{{item}}</span></div>
            </div>
            <div class="top">
                <h3>热门搜索</h3>
                <div v-for=" (hot,index) in hotkey" :key="index" class="rank text-md" @click="hotSearch(hot.k)">
                    <div class="d-flex" >
                        <div :class="{active:index<3?true:''}" style="margin-right:10px" >{{Number(index)+1}}</div>
                        <div>{{hot.k}}</div>
                    </div>
                    <div class="text-gray1">{{hot.n}}</div>
                </div>
            </div>
        </div>
        <div v-if="flag===1" class="searchCon">
            <ul>
               <li v-for="song in searchCon" :key="song.songid">{{song.songname}}</li>
            </ul>
        </div>
        <div v-if="flag===2" class="list">
            <ul>
                <li v-for="list in searchList" :key="list.songid" class="d-flex jc-between ai-center">
                    <div>
                        <p>{{list.songname}}</p>
                        <p>{{list.singer[0].name}}</p>
                    </div>
                    <div class="d-flex jc-between">
                        <img src="../../assets/add.png" alt="" width="12px" height="12px" @click="addMusci(list.songmid,list.albummid,list.songname,list.singer[0].name)">
                       
                    </div>
                </li>
            </ul>
            <div @click="more" style="text-align:center">点击加载更多</div>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            searchCode:'',
            flag:0,
            history:[],
            page:1,
            num:15,
            searchCon:[],
            searchList:[],
            musicInfo:{}
        }
    },
    watch:{
        searchCode(){
            if(this.searchCode===''){
                this.flag=0
            }
            this.getSearch()
        }
    },

    props:{
        hotkey:{
            type:Array
        }
    },
    mounted(){
        
        if(localStorage.getItem('history')){
            this.history = JSON.parse(localStorage.getItem('history'))
        }else{
            localStorage.setItem('history',JSON.stringify(this.history))
        }
        
        
    },
    updated(){
        
        
    },
    methods:{
        search(event){
            
            this.$refs.search.style.outline = 'none'
           
        },
        async getSearch(){
            if(this.searchCode!==''){
                this.flag = 1
            }
            this.page = 1
            let url = `http://111.229.20.115:8001/music/list?w=${this.searchCode}&p=${this.page}&n=${this.num}&catZhida=0`
            let res = await this.$http.get(url)
            this.searchCon = res.data.data.list
            
        },
        async find(){
            if(this.searchCode ==='')return
            this.flag=2
            this.page = 1
            this.history.push(this.searchCode)
            localStorage.setItem('history',JSON.stringify(this.history))
            let url = `http://111.229.20.115:8001/music/list?w=${this.searchCode}&p=${this.page}&n=${this.num}&catZhida=1`
            let res = await this.$http.get(url)
            this.searchList = res.data.data.list
            console.log(this.searchList)
        },
        clearCode(){
            this.searchCode = ''
        },
        claerHistory(){
            this.history = []
            localStorage.setItem('history',JSON.stringify(this.history))
        },
        async more(){
            this.page+=1
            let url = `http://111.229.20.115:8001/music/list?w=${this.searchCode}&p=${this.page}&n=${this.num}&catZhida=1`
            let res = await this.$http.get(url)
            this.searchList = this.searchList.concat(res.data.data.list)
            
        },
        async addMusci(mid,albummid,songname,singer){
            let url = `http://111.229.20.115:8001/music/song?songmid=${mid}&guid=85640610&lyric=1`

            let res = await this.$http.get(url)
            this.musicInfo = {}
            this.musicInfo = res.data.data
            this.musicInfo.img =`http://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}_1.jpg?max_age=2592000`
            this.musicInfo.songname = songname
            this.musicInfo.singer = singer

            
            let list = []
            if(!localStorage.getItem('playList')){
                localStorage.setItem('playList',JSON.stringify(list))
            }
            list = JSON.parse(localStorage.getItem('playList'))
            
            
            let arr = list.some((item)=>{
                return item.musicUrl === this.musicInfo.musicUrl
            })
            if(!arr){
                list.push(this.musicInfo)
                localStorage.setItem('playList',JSON.stringify(list))
            }
           
            this.$store.commit('getPlayList',list)

            
           
            
        },
        async historySearch(event){
            
            
            
            this.flag=2
            this.page = 1
            
            let url = `http://111.229.20.115:8001/music/list?w=${event.target.childNodes[0].data}&p=${this.page}&n=${this.num}&catZhida=1`
            let res = await this.$http.get(url)
            this.searchList = res.data.data.list
            
        },
        async hotSearch(key){
            this.flag=2
            this.page = 1
            this.history.push(key)
            localStorage.setItem('history',JSON.stringify(this.history))
            let url = `http://111.229.20.115:8001/music/list?w=${key}&p=${this.page}&n=${this.num}&catZhida=1`
            let res = await this.$http.get(url)
            this.searchList = res.data.data.list
        }
        
        

    },
    
}
</script>
<style lang="scss" scoped>
    .searchBox{
        position: relative;
        input{
            width: 90%;height: 30px;
            box-sizing: border-box;
             padding-left: 30px;
             padding-right: 30px;
             background: url('../../assets/search.png') no-repeat 6px 6px/18px 18px;
             font-size: 18px;
             margin-left: 20px;
             border: 1px solid #fafafa;
             border-radius: 15px;
             overflow: hidden;
             white-space: nowrap;
             text-overflow: ellipsis;
             
        }
        img{width: 18px;height: 18px;position: absolute;top: 6px;right: 25px;}
    }
    .top{margin: 15px 10px 0 10px;
        h3{font-size: 18px;font-weight: bold;}
    }
    .rank{
        display: flex;
        justify-content: space-between;
        padding:10px 0;
    }
    .active{color:red}
    .banner{height: 520px;overflow: scroll;}
    .searchCon{
        li{
            padding-left: 30px;
            background: url('../../assets/search.png') no-repeat 0 8px / 16px 16px;
            margin-left: 10px;
            height: 30px;
            line-height: 30px;
        }
    }
    .history{
        margin: 15px 10px 0 10px;
        h3{font-size: 18px;font-weight: bold;}
        div{
            display: flex;
            flex-wrap: wrap;
            margin-top: 10px;
            span{font-size: 16px; margin-right: 10px;background: #ccc;padding: 5px;border-radius: 13px;}
        }
    }
    .list{
        margin: 10px;
        margin-bottom: 60px;
        

        li{
            margin-bottom: 15px;
        }
        div{
            p:nth-child(1){
                width: 260px;
                padding: 10px 0;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            img:nth-child(1){
                margin-right: 30px;
            }
        }
    }
</style>