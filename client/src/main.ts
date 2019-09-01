import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Add font-awesome icon pack
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faStar,
  faCopy,
  faPlus,
  faMinus,
  faEdit,
  faTimes,
  faBars,
  faArrowLeft,
  faLock,
  faLockOpen,
  faCog,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(
  faStar,
  faCopy,
  faPlus,
  faMinus,
  faEdit,
  faTimes,
  faBars,
  faArrowLeft,
  faLock,
  faLockOpen,
  faCog,
  faEllipsisV
)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
