// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

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
  faCog
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
  faCog
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
