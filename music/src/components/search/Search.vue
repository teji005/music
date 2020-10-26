<template>
    <div>
        <Find :hotkey="topList"/>
    </div>
</template>
<script>
export default {
    components:{
        Find:()=>import('./Find')
    },
    data(){
        return{
            topList:[]
        }
    },
    created(){
        this.getTopList()
    },
    methods:{
        async getTopList(){
            let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
            let data = {
                        g_tk: 1015893922,
                        inCharset: 'utf-8',
                        outCharset: 'utf-8',
                        notice: 0,
                        format: 'jsonp',
                        platform:'h5',
                        needNewCode:1
                    }
            let options =  {
                        param: 'jsonpCallback'
                    }
            let topList =await  this.$jsonp(url,data,options)
            this.topList = topList.data.hotkey
            console.log(topList)
            
        },
    }
}
</script>
<style lang="scss" scoped>

</style>