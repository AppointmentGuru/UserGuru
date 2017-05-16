// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import router from './router'
import store from 'vuex-requests/src/store/plugin'
import AppointmentGuruBackend from 'vuex-requests/src/store/backends/appointmentguru'

import './assets/vuetify.min.css'

let backends = [
  {
    name: 'appointmentguru',
    class: AppointmentGuruBackend
  }
]

Vue.config.productionTip = false

Vue.use(store, backends)
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

