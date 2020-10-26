<template>
    <div class="singerList">
        <ul class="singerList">
            <li v-for="item in ok" :key="item.singer_id" class="d-flex ai-center">
                <img :src="item.singer_pic" alt="" style="width:70px;height:70px;border-radius:50%">
                <span class="text-gray1">{{item.singer_name}}</span>
            </li>
        </ul>
    </div>

</template>
<script>
export default {
    data(){
        return{
            singerList:this.$store.state.singerList
        }
    },
    props:['ok'],
    created(){
        
        
    }

}
</script>
<style lang="scss" scoped>
    .singerList{
        ul{
            height: 420px;
            overflow: auto;
            li{
                margin: 10px 25px;
                img{margin-right: 25px;}
            }
        }
    }
</style>