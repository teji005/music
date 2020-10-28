<template>
    <div class="palybox" >
        
         <img :src="nowPlay.img?nowPlay.img:require('../assets/logo.png')"  width="50px" height="50px" class="mesgImg" ref="musicImg" @click="cangeLoad">
        <div style="margin-left:60px" class="songname" @click="cangeLoad">
            {{nowPlay.songname?nowPlay.songname:''}}
        </div>
        <div >
            <img src="../assets/play/stop.png" alt="" width="18px" height="18px" @click="handleplay" ref="control">
            <img src="../assets/play/playlist.png" alt="" width="18px" height="18px" @click="showList(playList)">
        </div>
        <audio ref='audio' loop @timeupdate="timeupdate">
            <source :src="nowPlay.musicUrl" ref="source">
        </audio>
    </div>
</template>
<script>
export default {
    data(){
        return{
            nowPlay:{},
            playList:this.$store.state.playList,
            palyFlag:false,
            playIndex:this.$store.state.nowPlayIndex
        }
    },
    created(){
        
        
    },
    mounted(){
       
    },
    updated(){
        
    },
    watch:{
        '$store.state.playflag'(){
            this.palyFlag = this.$store.state.playflag
            
            if(this.palyFlag){
                
                let promise = this.$refs.audio.play()
                if(promise){
                    promise.then(()=>{
                        
                        this.$refs.audio.play()
                        //console.log(this.$refs.audio)
                        this.$store.commit('getduration',this.$refs.audio.duration)
                        //console.log(this.$refs.audio.duration)
                    }).catch(()=>{
                        this.palyFlag =false
                        this.$store.commit('getPlayflag',this.palyFlag)
                    })
                }
            }else{
                
                this.$refs.audio.pause()
            }
        },
        '$store.state.nowPlayIndex'(){
            //console.log(this.$store.state.nowPlayIndex)
           this.$refs.audio.pause()
           if(this.playList.length>0){
                //console.log('11')
                this.nowPlay = this.playList[this.$store.state.nowPlayIndex]
                this.palyFlag = true
                this.$refs.audio.src = this.nowPlay.musicUrl
                this.$refs.audio.autoplay = true
                this.$refs.audio.load()
                
                this.$store.commit('getduration',this.$refs.audio.duration)
                if(this.palyFlag){
                    let promise = this.$refs.audio.play()
                    if(promise){
                        promise.then(()=>{
                            
                            this.$refs.audio.play()
                            //console.log(this.$refs.audio)
                            this.$store.commit('getduration',this.$refs.audio.duration)
                            //console.log(this.$refs.audio.duration)
                            this.$refs.control.src = require('../assets/play/play.png')
                            this.$refs.musicImg.style.animationPlayState = 'running'
                        }).catch(()=>{
                            this.palyFlag =false
                            this.$store.commit('getPlayflag',this.palyFlag)
                        })
                    }
                      
                }
           }else{
               this.nowPlay = {}
                this.palyFlag  = false
                
                this.$refs.control.src = require('../assets/play/stop.png')
                this.$refs.audio.pause()
                this.$refs.musicImg.style.animationPlayState = 'paused'
           }
        },
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
        nowPlay:{
            handler(){
                return this.nowPlay

            },
            deep:true
        }
    },
    methods:{
        cangeLoad(){
            this.$store.commit('getLoadflag',false)
            this.$store.commit('getIndex',this.playIndex)

        },
        handleplay(){
            
            if(this.playList.length<1)return
            this.palyFlag = !this.palyFlag
            if(this.palyFlag){
                let promise = this.$refs.audio.play()
                if(promise){
                    promise.then(()=>{
                        this.$store.commit('getPlayflag',this.palyFlag)
                        this.$refs.control.src = require('../assets/play/play.png')
                        this.$refs.audio.play()
                        //console.log(this.$refs.audio)
                        this.$refs.musicImg.style.animationPlayState = 'running'
                        this.$store.commit('getduration',this.$refs.audio.duration)
                        console.log(this.$refs.audio.currentTime)
                    }).catch(()=>{
                        this.palyFlag =false
                        this.$store.commit('getPlayflag',this.palyFlag)
                    })
                }
                
            }else{
                this.$store.commit('getPlayflag',this.palyFlag)
                this.$refs.control.src = require('../assets/play/stop.png')
                this.$refs.audio.pause()
                this.$refs.musicImg.style.animationPlayState = 'paused'
            }

        },
        showList(list){
            this.$emit('showList',list)
        },
        timeupdate(){
            
            this.$store.commit('getcurrentTime',this.$refs.audio.currentTime)
            //console.log(this.$store.state.currentTime)
            
        }
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
        width: 100%;
        position: fixed;
        bottom: 0px;
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