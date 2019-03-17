import Vue from 'vue'
import Router from 'vue-router'
import DashboardListPage from '@/views/DashboardListPage'
import NewDashboardPage from '@/views/NewDashboardPage'
import ViewDashboardPage from '@/views/ViewDashboardPage'
import HomePage from '@/views/HomePage'
import RegisterPage from '@/views/RegisterPage'

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
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/dashboards',
      name: 'DashboardListPage',
      component: DashboardListPage
    },
    {
      path: '/dashboards/:dashboard_id/view',
      alias: '/dashboards/:dashboard_id/edit',
      name: 'ViewDashboardPage',
      component: ViewDashboardPage
    },
    {
      path: '/dashboards/:dashboard_id/tiles/:tile_id/edit',
      name: 'EditTilePage',
      component: ViewDashboardPage
    },
    {
      path: '/dashboards/new',
      name: 'NewDashboardPage',
      component: NewDashboardPage
    }
  ]
})
