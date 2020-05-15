import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import animated from 'animate.css'

import './assets/gg.less'
import './assets/cover.less'

// import Mock from 'mockjs'

Vue.config.productionTip = false

Vue.use(animated)
Vue.use(ElementUI)
// 全局注册--无效
// Vue.use(Mock)

function startup () {
  new Vue({
    router,
    render: (h) => h(App)
  }).$mount('#app')
}

startup()
