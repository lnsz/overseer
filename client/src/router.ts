import Vue from 'vue'
import Router from 'vue-router'
import DashboardListPage from './views/DashboardListPage.vue'

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
      component: DashboardListPage,
    },
  ],
})
