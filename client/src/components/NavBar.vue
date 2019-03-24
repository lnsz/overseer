<template>
  <div class="nav-bar">
    <NavButton text="About" />
    <NavButton text="New Dashboard" link="NewDashboardPage" />
    <NavButton
      @click="isRegisterView = true"
      v-if="!user"
      text="Sign Up"
      border
    />
    <NavButton
      @click="isLoginView = true"
      v-if="!user"
      text="Login"
    />
    <NavButton
      v-if="user"
      :text="user.username"
    />
    <NavButton
      @click="logout"
      v-if="user"
      text="Logout"
    />
    <Modal
      v-if="isRegisterView"
      @close="isRegisterView = false"
    >
      <Register />
    </Modal>
    <Modal
      v-if="isLoginView"
      @close="isLoginView = false"
    >
      <Login @login="() => { isLoginView = false; getUserStatus() }" />
    </Modal>
    <div class="mobile-nav-bar">
      <div class="hamburger" />
      <div class="hamburger" />
      <div class="hamburger" />
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService'

import Login from '@/components/Login'
import Modal from '@/components/Modal'
import NavButton from '@/components/NavButton'
import Register from '@/components/Register'

export default {
  name: 'NavBar',
  components: {
    Login,
    Modal,
    NavButton,
    Register
  },
  mounted () {
    this.getUserStatus()
  },
  data () {
    return {
      isRegisterView: false,
      isLoginView: false,
      user: null
    }
  },
  methods: {
    async getUserStatus () {
      let status = await UserService.getStatus()
      console.log(status)
      if (status && status.data) this.user = status.data.user
    },
    async logout () {
      await UserService.logout()
      await this.getUserStatus()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .mobile-nav-bar {
    display: none;
  }
  .nav-bar {
    display: flex;
    width: 450px;
    justify-content: space-evenly;
  }
  #sign-up {
    border: 1px solid color('text');
    border-radius: 3px;
  }
  #sign-up:hover {
    background: color('text');
    color: color('background');
    text-decoration: none;
  }
  .hamburger {
    width: 20px;
    height: 3px;
    background-color: color('text');
    margin: 5px 7px;
  }

  @media only screen and (max-width: 700px){
    .nav-bar {
      justify-content: flex-end;
    }
    .mobile-nav-bar {
      cursor: pointer;
      border: 1px solid color('text');
      border-radius: 3px;
      display: inline;
      padding: 3px;
    }
  }
</style>
