import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/reset.css'
import './assets/style.css'
import http from './http'
import jsonp from '../jsonp'

Vue.config.productionTip = false
Vue.prototype.$http=http
Vue.prototype.$jsonp=jsonp

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
