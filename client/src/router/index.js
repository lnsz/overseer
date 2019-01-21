import Vue from 'vue'
import Router from 'vue-router'
import Dashboards from '@/components/DashboardList'
import NewDashboard from '@/components/NewDashboard'
import ViewDashboard from '@/components/ViewDashboard'
import EditDashboard from '@/components/EditDashboard'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboards',
      name: 'DashboardList',
      component: Dashboards
    },
    {
      path: '/dashboards/:dashboard_id',
      name: 'ViewDashboard',
      component: ViewDashboard
    },
    {
      path: '/dashboards/new',
      name: 'NewDashboard',
      component: NewDashboard
    },
    {
      path: '/dashboards/:dashboard_id/edit',
      name: 'EditDashboard',
      component: EditDashboard
    }
  ]
})
