import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Confirmation from '@/components/Confirmation'
import Portfolio from '@/components/Portfolio'
import Faq from '@/components/Faq'


import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: ['UA-142913413-1']
})

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/faq/:top?',
      name: 'Faq',
      component: Faq
    },
    {
      path: '/confirmation/:txnId?',
      name: 'Confirmation',
      component: Confirmation
    },
    {
      path: '/portfolio/:user?',
      name: 'Portfolio',
      component: Portfolio
    }
  ]
})
