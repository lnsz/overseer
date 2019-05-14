import Vue from 'vue'
import Router from 'vue-router'
import DashboardList from './views/DashboardList.vue'

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
      component: DashboardList,
    },
  ],
})
