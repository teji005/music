<template>
    <div class="load">
        <div class="musicBox">
            <img src="../assets/xia.png" alt="" width="30px" height="30px" class="back" @click="back">
            <h3>{{nowplay.songname}}</h3>
            <h4>-- {{nowplay.singer}} --</h4>
            <img v-if="nowplay" :src="nowplay.img" alt="" width="300px" height="300px" class="ani_img" ref="playCon">
            <p ref="lyc" style="text-align:center;color:white">{{lyc}}</p>
            <div class="d-flex jc-between" style="margin:10px">
                <span ref="curr" class="text-gray1">{{curr}}</span>
                <input type="range" id="slider" name="slider" class="ne-range" value="0" min="0" max="100" ref="range" />
                <span ref="dur" class="text-gray1">{{dur}}</span>
            </div>
            <div class="d-flex ai-center playload">
                <img src="../assets/load/pre.png" alt="" width="50px" height="50px" @click="pre">
                <img src="../assets/load/stop.png" alt="" width="60px" height="60px" @click="play" ref="play">
                <img src="../assets/load/next.png" alt="" width="47px" height="47px" style="margin-left:10px" @click="next">
            </div>
            <div class="d-flex listCon" >
                <img src="../assets/load/list.png" alt="" width="40px" height="40px" @click="showList(playList)">
            </div>
            <div class="listBox" ref="listBox">
                <h3>歌单列表{{playList.length}}首</h3>
                <ul class="list">
                    <li v-for="(list,index) in playList" :key="index" @click.prevent="changeMusic(index)" :class="{active:$store.state.nowPlayIndex===index?'true':''}">
                        <div  >
                        <span class="text-md">{{list.songname}} </span>
                        <span class="text-gray1"> -{{list.singer}}</span>
                        </div>
                        <img src="../assets/x.png" width="16px" height="16px" @click="deleteMusic(index)"/>
                    
                    </li>
                </ul>
                <div class="close" @click="hideList">关闭</div>
            </div>
            <div class="mask" ref="mask" @click="hideList"></div>
        </div>
        <div class="bg_blur">
            <img v-if="nowplay" :src="nowplay.img" alt="" width="100%" height="100%">
        </div>
        
    </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
export default {
    data(){
        return{
            nowplay:{},
            playList:this.$store.state.playList,
            dur:'00:00',
            curr:'00:00',
            lyc:'',
            lycs:[]
        }
    },
    computed:{
        
        ...mapState['playList','nowPlayIndex']
    },
    watch:{
        '$store.state.nowPlayIndex'(){
            this.nowplay = this.playList[this.$store.state.nowPlayIndex]
            let arr = this.nowplay.lyric.split('\n')
        
        
            this.lycs = arr.map(item=>{
                let obj = {}
                obj.a = item.split(']')[0].substr(1,item.split(']')[0].length)
                obj.b = item.split(']')[1] 
                return (obj)
            })
        },
        '$store.state.currentTime'(){
            let val = Math.ceil((this.$store.state.currentTime/this.$store.state.duration)*100)
            this.$refs.range.value = val
            //console.log(val)
            this.dur = this.formatSeconds(this.$store.state.duration)
            this.curr = this.formatSeconds(this.$store.state.currentTime)
            let that = this
            
            let a = this.lycs.filter((item)=>{
                
               return that.makeDurationToSeconds(item.a).toFixed(0) == that.$store.state.currentTime.toFixed(0)
            })
            if(a.length>0){
                this.lyc = a[0].b
            }
            //console.log(a)
            
        }
    },
    created(){
        this.nowplay = this.$store.state.playList[this.$store.state.nowPlayIndex]
        
        
        //console.log(this.playList)
    },
    mounted(){
        console.log(this.$store.state.playflag)
        if(this.$store.state.playflag){
            this.$refs.play.src = require('../assets/load/play.png')
            this.$refs.playCon.style.animationPlayState = 'running'
        }else{
            this.$refs.play.src = require('../assets/load/stop.png')
            this.$refs.playCon.style.animationPlayState = 'paused'
        }
        
        
        
    },
    methods:{
        back(){
            this.$store.commit('getLoadflag',true)
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
            this.$store.commit('getPlayflag',true)
            this.$refs.play.src = require('../assets/load/play.png')
            this.hideList()
        },  
        play(){
            if(this.playList.length<1)return
            if(this.$store.state.playflag){
                //console.log('1')
                this.$store.commit('getPlayflag',false)
                this.$refs.play.src = require('../assets/load/stop.png')
                this.$refs.playCon.style.animationPlayState = 'paused'

            }else{
                //console.log('2')
                this.$store.commit('getPlayflag',true)
                this.$refs.play.src = require('../assets/load/play.png')
                this.$refs.playCon.style.animationPlayState = 'running'
            }
        },
        pre(){
            if(this.playList.length<=1)return
            if(this.$store.state.nowPlayIndex===0){
                this.$store.commit('getIndex',this.$store.state.playList.length-1)
            }else{
                this.$store.commit('getIndex',this.$store.state.nowPlayIndex-1)
            }
            //this.$store.commit('getIndex')
        },
        next(){
            if(this.playList.length<=1)return
            if(this.$store.state.nowPlayIndex===this.$store.state.playList.length-1){
                this.$store.commit('getIndex',0)
            }else{
                let index = this.$store.state.nowPlayIndex+1
                //console.log(index)
                this.$store.commit('getIndex',index)
                
            }
        },
        formatSeconds(value){
             var theTime = parseInt(value);// 秒

                var middle= 0;// 分

                var hour= 0;// 小时

            

                if(theTime > 60) {
                    middle= parseInt(theTime/60);

                    theTime = parseInt(theTime%60);

                    if(middle> 60) {
                        hour= parseInt(middle/60);

                        middle= parseInt(middle%60);

                    }

                }

            var result = ''

            if(parseInt(theTime)>=10){
            result = "0"+":"+parseInt(theTime);

            }else{
            result = "0"+":"+"0"+parseInt(theTime);

            }

                if(middle >= 0 && parseInt(theTime)>=10) {
                    result = parseInt(middle)+":"+parseInt(theTime);

                }else{
                result = parseInt(middle)+":"+"0"+parseInt(theTime);

            }

                /* if(hour> 0) {
                    result = ""+parseInt(hour)+":"+result;

                } */

                return result;
        },
        makeDurationToSeconds(time){
            var str = time;
            var arr = str.split(':');
            var ms = parseInt(arr[0]*60);
            var ss = Number(arr[1]).toFixed(2);
            
            var seconds =  Number(ms) + Number(ss) ;
            return seconds;
        }
        
    }
}
</script>
<style lang="scss" scoped>
    .load{
        overflow: hidden;
    }
    .bg_blur{
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        z-index: -1;
        -webkit-filter: blur(5px);
        filter: blur(15px);
        transform: scale(1);
    }
    .musicBox{
        
        .back{
            position: absolute;
            top: 10px;
            left: 20px;
            
        }
        h3{
                text-align: center;
                font-size: 18px;
                margin-top:18px ;
                color: white;
        }
        h4{
                text-align: center;
                font-size: 14px;
                margin-top:18px ;
                color: white;
        }
        .ani_img{
            border:2px solid #ccc;
            border-radius: 50%;
            margin: 40px 0px 20px 25px;
            animation: route 10s linear infinite;
            animation-play-state: paused;
            
        }
        input.ne-range[type=range]::-webkit-slider-thumb{
            -webkit-appearance: none;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            border: 0;
            background-color:#fff;
            cursor: pointer;
        }
        input.ne-range[type=range]::-webkit-slider-thumb:active{
            background-color: greenyellow;
        }
        input.ne-range[type=range]{
            
            height: 2px;
            width: 80%;
        }
        .playload{
            margin-top: 20px;
            margin-left: 60px;
            img{
                margin-right: 30px;
            }
        }
        .listCon{
            position: absolute;
            bottom: 40px;
            right: 20px;
        }
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
        @keyframes route {
        0%{transform: rotate(0deg);}
        25%{transform: rotate(90deg)}
        50%{transform: rotate(180deg);}
        75%{transform: rotate(270deg);}
        100%{transform: rotate(360deg);}
    }
    .active{
        color:greenyellow
    }
</style>