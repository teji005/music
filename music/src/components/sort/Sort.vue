<template>
    <div>
        <Rank :topList="rankList" />
    </div>
</template>
<script>
export default {
    components:{
        Rank:()=>import('./Rank')
    },
    data(){
        return{
            rankList:[]
        }
    },
    created(){
        this.getRnak()
    },
    methods:{
        async getRnak(){
            let res = await this.$http.get('/top')
            let rankUrl = res.data.url[0]
            let  commonParams = {
                        g_tk: 1015893922,
                        inCharset: 'utf-8',
                        outCharset: 'utf-8',
                        notice: 0,
                        format: 'jsonp'
                    }
            let data = Object.assign({}, commonParams, {
                        uin: '',
                        needNewCode: '',
                        platform: ''
                    })
            let options = {
                        param: 'jsonpCallback'
                    }
            let rankList = await this.$jsonp(rankUrl,data,options)
            this.rankList = rankList.data.topList
            console.log(this.rankList)
        },
    }
}
</script>