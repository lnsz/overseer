import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: { name: 'Dashboards' }
    },
    {
      path: '/dashboards',
      name: 'Dashboards',
      component: () => import('./views/DashboardListPage.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/DashboardListPage.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/DashboardListPage.vue'),
    },
    {
      path: '/dashboards/create',
      name: 'CreateDashboard',
      component: () => import('./views/DashboardListPage.vue'),
    },
    {
      path: '/dashboards/:dashboard_id/view',
      alias: '/dashboards/:dashboard_id/edit',
      name: 'ViewDashboardPage',
      component: () => import('./views/DashboardPage.vue')
    },
    {
      path: '/dashboards/:dashboard_id/tiles/:tile_id/edit',
      name: 'EditTilePage',
      component: () => import('./views/DashboardPage.vue')
    },
    {
      path: '/dashboards/:dashboard_id/tiles/create',
      name: 'TileTypePickerPage',
      component: () => import('./views/DashboardPage.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/NotFound.vue')
    },
    {
      path: '/500',
      name: '500',
      component: () => import('./views/ServerError.vue')
    }
  ],
})
