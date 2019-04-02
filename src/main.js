import Vue from 'vue'
import App from './App'
import Toast from 'vue2-toast';
import router from './router'
import './assets/css/reset.css'
import './assets/fonts/style.css'
import './assets/css/common.css'
import './assets/css/border.css'
import 'vue2-toast/lib/toast.css'
import store from './store'
import 'jquery'

Vue.config.productionTip = false
Vue.use(Toast)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
