<template>
    <div>
        <div v-if="this.$store.state.loadflag">
            <Head @navClick="navclick"></Head>
            
        </div>
        <div v-else>
            <Load/>
        </div>
        <Playbox @showList="showList" v-show="this.$store.state.loadflag"/>
            <div class="listBox" ref="listBox">
                <h3>歌单列表{{playList.length}}首</h3>
                <ul class="list">
                    <li v-for="(list,index) in playList" :key="index" @click.prevent="changeMusic(index)" :class="{active:$store.state.nowPlayIndex===index?'true':''}">
                        <div  >
                        <span class="text-md">{{list.songname}} </span>
                        <span class="text-gray1"> -{{list.singer}}</span>
                        </div>
                        <img src="./assets/x.png" width="16px" height="16px" @click="deleteMusic(index)"/>
                    
                    </li>
                </ul>
                <div class="close" @click="hideList">关闭</div>
            </div>
            <div class="mask" ref="mask" @click="hideList"></div>
    </div>
</template>
<script>
import Head from './components/head/Head'
export default {
    name:'index',
    components:{
        Head,
        Playbox:()=>import('./views/Playbox'),
        Load:()=>import('./views/Load')

    },
    data(){
        return{
            playList:[]
        }
    },
    watch:{
        playList:{
            handler(newVal,oldVal){
                
                return this.playList
            },
            deep:true
        }
    },
    methods:{
        navclick(path){
            this.$router.push(path)
        },
        showList(list){
            this.playList = list
            this.$refs.mask.style.display = 'block'
            this.$refs.listBox.style.display = 'block'
        },
        hideList(){
            this.$refs.mask.style.display = 'none'
            this.$refs.listBox.style.display = 'none'
        },
        changeMusic(index){
            this.$store.commit('getIndex',index)
            this.hideList()
        },
        deleteMusic(index){
            let list = JSON.parse(localStorage.getItem('playList'))
            
            list.splice(index,1)
            //console.log(list)
            if(list.length>0){
                localStorage.setItem('playList',JSON.stringify(list))
                this.$store.commit('getIndex',0)
                
            }else{
                localStorage.removeItem('playList')
                this.$store.commit('getIndex','')
            }
            this.$store.commit('getPlayList',list)
            
            
        }
       
    }

}
</script>
<style lang="scss" scoped>
    .listBox{
            position: absolute;
            bottom: 0;
            left: 0;
            background: #fff;
            width: 100%;
            height: 70%;
            z-index: 120;
            display: none;
            overflow: scroll;
            h3{
                font-size: 18px;
                margin-left: 10px;
                margin-top: 10px;
            }
            .list{
                margin: 10px;
                overflow: scroll;
                li{
                    height: 25px;
                    
                    border-top: 1px solid #fafafa;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    div{
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
        .mask{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background:rgba(0,0,0,0.2);
            z-index: 100;
            display: none;
        }
        .close{
            position: fixed;
            border-top: 1px solid #fafafa;
            font-size: 18px;
            bottom: 0;
            left: 0;
            z-index: 100;
            text-align: center;
            width: 100%;
            height: 50px;
            line-height: 50px;
            background: white;
        }
        .active{
            color: greenyellow;
        }
</style>