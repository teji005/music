import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    swiperList:[],
    singerCategory:{},
    singerList:[],
    searchCode:'',
    playList:localStorage.getItem('playList')?JSON.parse(localStorage.getItem('playList')):[],
    nowPlayIndex:0,
    detailList:[],
    loadflag:true,
    duration:0,
    currentTime:0,
    playflag:false
  },
  mutations: {
    getSwiper(state,list){
      state.swiperList = list
    },
    getSingerList(state,list){
      Vue.set(state,'singerList',list)
    },
    getSearchCode(state,code){
      state.searchCode = code
    },
    getPlayList(state,list){
     Vue.set(state,'playList',list)
    },
    getIndex(state,index){
      state.nowPlayIndex = index
    },
    playList(state){
      if(localStorage.getItem('playList')){
         state.playList = JSON.parse(localStorage.getItem('playList'))
      }
       
    },
    getDetailList(state,list){
      state.detailList = list
    },
    getLoadflag(state,bool){
      state.loadflag = bool
    },
    getduration(state,duration){
        state.duration = duration
    },
    getcurrentTime(state,currentTime){
      state.currentTime = currentTime
  },
    getPlayflag(state,bool){
      state.playflag = bool
    },
  },
  actions: {
   
  },
  modules: {
  },
  getters:{
    singer:(state)=>{
      return state.singerList
    },
    List:(state)=>{
      return state.playList
    },
    
    

  }
})
