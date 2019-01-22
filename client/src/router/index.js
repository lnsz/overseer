import Vue from 'vue'
import Router from 'vue-router'
import Dashboards from '@/views/DashboardList'
import NewDashboard from '@/views/NewDashboard'
import ViewDashboard from '@/views/ViewDashboard'
import EditDashboard from '@/views/EditDashboard'
import HomePage from '@/views/HomePage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
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
