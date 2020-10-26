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
    nowPlayIndex:''
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
       
    }
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
