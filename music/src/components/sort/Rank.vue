<template>
    <div class="rank">
        <ul class="rankList">
            <li v-for="item in topList" :key="item.id" class="d-flex rankBox">
                <img :src="item.picUrl" alt="">
                <div>
                    <ul class="d-flex">
                        <h5 class="text-md" >{{item.topTitle}}</h5>
                        <li v-for="(song,index) in item.songList" :key="index"  >
                            
                            <span>{{index+1}}. </span>
                            <span>{{song.songname}} </span>
                            <span class="text-gray1">- {{song.singername}}</span>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        topList:{
            type:Array,
            require:true
        }
    }
}
</script>
<style lang="scss" scoped>
    .rank{
        height: 550px;
        overflow: scroll;
    }
    .rankList{
        margin: 10px 15px 0 15px;
        
        .rankBox{
            margin-bottom: 15px;
            
            box-shadow: 0 0 10px #ccc;
            padding: 10px;
            box-sizing: border-box;
            border-radius: 10px;
            img{
                width: 120px;
                height: 120px;
            }
            div{
                ul{
                     flex-direction: column;
                     
                    h5{
                        font-weight: bold;
                        margin: 5px 0 0 10px;
                    }
                    li{
                       margin: 10px 0 10px 10px;
                       width: 180px;
                       overflow: hidden;
                       white-space: nowrap;
                       text-overflow: ellipsis;
                       span:nth-child(3){
                           
                       }
                    }
                }
            }
        }
    }
    .rankBox:hover{transform: translateY(-5px);transition: all .5s;}
</style>