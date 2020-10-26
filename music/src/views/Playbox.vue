<template>
    <div class="palybox">
        
         <img :src="nowPlay.img?nowPlay.img:require('../assets/logo.png')"  width="50px" height="50px" class="mesgImg" ref="musicImg">
        <div style="margin-left:60px" class="songname">
            {{nowPlay.songname?nowPlay.songname:''}}
        </div>
        <div >
            <img src="../assets/play/stop.png" alt="" width="18px" height="18px" @click="handleplay" ref="control">
            <img src="../assets/play/playlist.png" alt="" width="18px" height="18px" @click="showList(playList)">
        </div>
        <audio ref='audio' loop>
            <source :src="nowPlay.musicUrl?nowPlay.musicUrl:''">
        </audio>
    </div>
</template>
<script>
export default {
    data(){
        return{
            nowPlay:{},
            playList:this.$store.state.playList,
            palyFlag:false
        }
    },
    created(){
        
        
    },
    mounted(){
       
    },
    updated(){
        
    },
    watch:{
        '$store.state.playList':{
            handler(newVal,oldVal){
                this.playList = this.$store.state.playList
                if(this.playList.length>0){
                    this.nowPlay = this.playList[0]
                    //console.log(this.nowPlay)
                }else{
                    this.nowPlay = {}
                }
                
            },
            immediate:true,
            deep:true
        },
        '$store.state.nowPlayIndex':{
            handler(newVal,oldVal){
                
                console.log(this.playList)
                if(this.playList.length>0){
                    this.nowPlay = this.playList[this.$store.state.nowPlayIndex]
                    //console.log(this.playList)
                   
                    this.$refs.audio.src = this.nowPlay.musicUrl
                    
                    this.$refs.audio.autoplay = true
                    this.palyFlag = true
                    if(this.palyFlag){
                            this.$refs.control.src = require('../assets/play/play.png')
                            this.$refs.audio.play()
                            
                            this.$refs.musicImg.style.animationPlayState = 'running'
                        }else{
                            this.$refs.control.src = require('../assets/play/stop.png')
                            this.$refs.audio.pause()
                            this.$refs.musicImg.style.animationPlayState = 'paused'
                        }
                }else{
                    //console.log('aaa')
                    this.palyFlag = false
                    if(this.palyFlag){
                            this.$refs.control.src = require('../assets/play/play.png')
                            this.$refs.audio.play()
                            
                            this.$refs.musicImg.style.animationPlayState = 'running'
                        }else{
                            this.$refs.control.src = require('../assets/play/stop.png')
                            this.$refs.audio.pause()
                            this.$refs.musicImg.style.animationPlayState = 'paused'
                        }
                    this.nowPlay = {}
                }
                
                
            },
            deep:true
        },
        nowPlay:{
            handler(){
                console.log(this.nowPlay)
                return this.nowPlay
            },
            deep:true
        }
    },
    methods:{
        handleplay(){
            if(this.playList.length<1)return
            this.palyFlag = !this.palyFlag
            if(this.palyFlag){
                this.$refs.control.src = require('../assets/play/play.png')
                this.$refs.audio.play()
                console.log(this.$refs.audio)
                this.$refs.musicImg.style.animationPlayState = 'running'
            }else{
                this.$refs.control.src = require('../assets/play/stop.png')
                this.$refs.audio.pause()
                this.$refs.musicImg.style.animationPlayState = 'paused'
            }

        },
        showList(list){
            this.$emit('showList',list)
        },
    }
}
</script>
<style lang="scss" scoped>
    .palybox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        background: #fafafa;
        z-index: 50;
        height: 50px;
        position: relative;
        bottom: 50px;
        left: 0;
        .songname{
            margin-left: 10px;
            overflow: hidden;
            width: 50%;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .mesgImg{
            position: absolute;
            top: -15px;
            left: 10px;
            border-radius: 50%;
            animation: route 10s linear infinite;
            animation-play-state: paused;
        }
        div:nth-of-type(2){
            img{
                margin-right: 20px;
                
            }
        }
    }
    
    @keyframes route {
        0%{transform: rotate(0deg);}
        25%{transform: rotate(90deg)}
        50%{transform: rotate(180deg);}
        75%{transform: rotate(270deg);}
        100%{transform: rotate(360deg);}
    }
</style>