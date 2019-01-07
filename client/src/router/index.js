import Vue from 'vue'
import Router from 'vue-router'
import Dashboards from '@/components/Dashboards'
import NewDashboard from '@/components/NewDashboard'
import EditDashboard from '@/components/EditDashboard'
import Hello from '@/views/Hello'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/dashboards',
      name: 'Dashboards',
      component: Dashboards
    },
    {
      path: '/dashboards/new',
      name: 'NewDashboard',
      component: NewDashboard
    },
    {
      path: '/dashboards/:id',
      name: 'EditDashboard',
      component: EditDashboard
    }
  ]
})
