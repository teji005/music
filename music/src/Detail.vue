<template>
    <div class="detail">
        <Background :moreflag="moreflag"/>
        
    </div>
</template>
<script>

export default {
    name:'Detail',
    data(){
        return{
            playList:[],
            moreflag :true
        }
    },
    components:{
        Background:()=>import('./components/detail/Background.vue'),
        PlayBox:()=>import('./views/Playbox')
    },
    
    created(){
        this.getList(this.$route.query.name,this.$route.query.img)
        this.getTop(this.$route.query.id)
    },
    methods:{
        async getList(name,img){
            let page = 1
            let url = `http://111.229.20.115:8001/music/list?w=${name}&p=${page}&n=${30}&catZhida=1`
            let res = await this.$http.get(url)
            let list = res.data.data.list.map(item=>{
                item.img = img
                item.page = page
                return item
            })
            this.$store.commit('getDetailList',list)
            console.log(list)
        },
        async getTop(id){
            let toplistUrl = ''
            let  commonParams = {
                        g_tk: 1015893922,
                        inCharset: 'utf-8',
                        outCharset: 'utf-8',
                        notice: 0,
                        format: 'jsonp'
                    }
            const data = Object.assign({}, commonParams, {
                topid: id
            })
            let options = {
                        param: 'jsonpCallback'
                    }
            let res =await this.$http.get('/toplist')
            toplistUrl = res.data.url[0]
            let list =await this.$jsonp(toplistUrl, data, options)
            console.log(list.songlist)
            
            list = list.songlist.map(item=>{
                let obj = {}
                obj.albumid = item.data.albumid
                obj.albummid = item.data.albummid
                obj.albumname = item.data.albumname
                obj.singer = item.data.singer
                obj.songid = item.data.songid
                obj.songmid = item.data.songmid
                obj.songname = item.data.songname
                obj.img = list.topinfo.MacDetailPicUrl
                return obj
            })
            this.$store.commit('getDetailList',list)
            this.moreflag = false
            console.log(list)
        }
    },
}
</script>
<style lang="scss" scoped>
    .detail{
        height: 100%;
        overflow: hidden;
        
    }
    
</style>