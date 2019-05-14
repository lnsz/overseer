<template>
  <div class="header">
    <div class="top" />
    <router-link
      :to="{ name: 'Home' }"
      class="link"
    >
      <Logo />
    </router-link>
    <NavBar :navLinks="navLinks" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Logo from '@/components/Logo.vue'
  import NavBar from '@/components/NavBar.vue'

  @Component({
    components: {
      Logo,
      NavBar
    }
  })
  export default class Header extends Vue {
    private navLinks = [
      { name: 'About', page: 'Home' },
      { name: 'Sign Up', page: 'Home' },
      { name: 'Log in', page: 'Home' },
    ]
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
