<template>
  <div class="nav-bar">
    <NavButton text="About" />
    <NavButton text="New Dashboard" link="NewDashboardPage" />
    <NavButton text="Sign Up" border />
    <NavButton text="Login" />
    <div class="mobile-nav-bar">
      <div class="hamburger" />
      <div class="hamburger" />
      <div class="hamburger" />
    </div>
  </div>
</template>

<script>
import NavButton from '@/components/NavButton'

export default {
  name: 'NavBar',
  components: {
    NavButton
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
    width: 400px;
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
