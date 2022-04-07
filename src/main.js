import Vue from 'vue'
import App from './App'
import store from './store'
import request from './utils/request.js'
import baseUrl from "../public/baseUrl.js";
Vue.prototype.baseUrl = baseUrl
Vue.config.productionTip = false
Vue.prototype.request = request
App.mpType = 'app'

const app = new Vue({
  ...App,
  store,
  request,
  baseUrl
})
app.$mount()
