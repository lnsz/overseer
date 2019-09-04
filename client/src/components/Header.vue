<template>
  <div class="header">
    <div class="top" />
    <router-link
      :to="{ name: 'Home' }"
      class="link"
    >
      <Logo />
    </router-link>
    <NavBar
      :navLinks="navLinks"
      @open-login="openLoginView"
      @open-register="openRegisterView"
      @open-create-dashboard="openCreateDashboardView"
      @logout="logout"
    />
    <Modal
      v-if="isRegisterView"
      @close="closeModals"
    >
      <Register
        @login="closeModals"
      />
    </Modal>
    <Modal
      v-if="isLoginView"
      @close="closeModals"
    >
      <Login
        @login="closeModals"
      />
    </Modal>
    <Modal
      v-if="isCreateDashboardView"
      @close="closeModals"
    >
      <CreateDashboard
        @create-dashboard="closeModals"
      />
    </Modal>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { NavLink } from '../types'
  import Login from '@/components/Login.vue'
  import Register from '@/components/Register.vue'
  import CreateDashboard from '@/components/CreateDashboard.vue'
  import Logo from '@/components/Logo.vue'
  import Modal from '@/components/Modal.vue'
  import NavBar from '@/components/NavBar.vue'
  import strings from '../shared/constants/strings'
  import { UserApi } from '../api'

  @Component({
    components: {
      Login,
      Logo,
      Modal,
      NavBar,
      Register,
      CreateDashboard
    }
  })
  export default class Header extends Vue {
    // Data
    private isLoginView = false
    private isRegisterView = false
    private isCreateDashboardView = false

    // Mounted
    private mounted(): void {
      this.getCurrentView()
    }

    // Computed
    get navLinks(): NavLink[] {
      if (this.$store.state.user) {
        return [
          {
            name: strings.about,
            page: 'Home',
            border: false,
          },
          {
            name: strings.create,
            border: false,
            action: 'open-create-dashboard'
          },
          {
            name: this.$store.state.user,
            page: 'Home',
            border: false
          },
          {
            name: strings.logOut,
            border: false,
            action: 'logout'
          }
        ]
      } else {
      return [
          {
            name: strings.about,
            page: 'Home',
            border: false,
          },
          {
            name: strings.create,
            border: false,
            action: 'open-create-dashboard'
          },
          {
            name: strings.signUp,
            border: true,
            action: 'open-register'
          },
          {
            name: strings.logIn,
            border: false,
            action: 'open-login'
          },
        ]
      }
    }

    get loginView(): boolean {
      return this.$route.path.includes('login')
    }

    get registerView(): boolean {
      return this.$route.path.includes('register')
    }

    get createDashboardView(): boolean {
      return this.$route.path.includes('dashboards/create')
    }

    // Methods
    private openLoginView(): void {
      this.$router.push({
        path: `/login`,
        query: { ...this.$route.query }
      })
      this.isLoginView = true
    }

    private openRegisterView(): void {
      this.$router.push({
        path: `/register`,
        query: { ...this.$route.query }
      })
      this.isRegisterView = true
    }

    private openCreateDashboardView(): void {
      this.$router.push({
        path: `/dashboards/create`,
        query: { ...this.$route.query }
      })
      this.isCreateDashboardView = true
    }

    private closeModals(): void {
      this.$router.push({
        path: `/dashboards`,
        query: { ...this.$route.query }
      })
      this.isCreateDashboardView = false
      this.isRegisterView = false
      this.isLoginView = false
    }

    private async logout(): Promise<void> {
      const res = await UserApi.logout()
      if (res.data && res.data.success) {
        this.$store.dispatch('logout')
      }
    }

    private async createDashboard(name, description, isPrivate): Promise<void> {

    }

    private getCurrentView(route = this.$route): void {
      if (this.loginView) {
        this.isLoginView = true
      } else if (this.isLoginView) {
        this.isLoginView = false
      } else if (this.registerView) {
        this.isRegisterView = true
      } else if (this.isRegisterView) {
        this.isRegisterView = false
      } else if (this.createDashboardView) {
        this.isCreateDashboardView = true
      } else if (this.isCreateDashboardView) {
        this.isCreateDashboardView = false
      }
    }

    // Watchers
    @Watch('route')
    private onRouteChanged(to, from) {
      this.getCurrentView(to)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions.scss";

  .header {
    .top {
      height: 5px;
      width: 100%;
      top: 0px;
      right: 0px;
      background: bgColor('primary');
      position: fixed;
    }
    margin: 0 40px 0 40px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: bgColor('secondary') 0.5px solid;
    .link {
      text-decoration: none;
      align-self: center;
    }
  }

  // Mobile view
  @media only screen and (max-width: breakpoints('mobile')) {
    .header {
      margin: 0px;
      background: bgColor('primary');
      .top {
        display: none;
      }
      .link {
        align-self: start;
      }
    }
  }
</style>
