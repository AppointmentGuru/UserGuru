import Vue from 'vue'
import Router from 'vue-router'
import WhoAmI from '@/components/WhoAmI'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WhoAmI',
      component: WhoAmI
    }
  ]
})
