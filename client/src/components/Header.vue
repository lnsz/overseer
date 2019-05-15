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
    />
    <Modal
      v-if="isRegisterView"
      @close="isRegisterView = false"
    >
      <Register
        @login="isRegisterView = false"
      />
    </Modal>
    <Modal
      v-if="isLoginView"
      @close="isLoginView = false"
    >
      <Login
        @login="isLoginView = false"
      />
    </Modal>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Login from '@/components/Login.vue'
  import Register from '@/components/Register.vue'
  import Logo from '@/components/Logo.vue'
  import Modal from '@/components/Modal.vue'
  import NavBar from '@/components/NavBar.vue'
  import strings from '../shared/constants/strings'

  @Component({
    components: {
      Login,
      Logo,
      Modal,
      NavBar,
      Register
    }
  })
  export default class Header extends Vue {
    // Data
    private navLinks = [
      {
        name: strings.about,
        page: 'Home',
        border: false,
      },
      {
        name: strings.create,
        page: 'Home',
        border: false,
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
    private isLoginView = false
    private isRegisterView = false

    // Methods
    private openLoginView(): void {
      this.isLoginView = true
    }

    private openRegisterView(): void {
      this.isRegisterView = true
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
