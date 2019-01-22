<template>
  <div class="container">
    <Header />
    <div class="content">
      <div class="slideshow">
        <div class="img" />
        <div class="text">
          <b> Title </b>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
        </div>
      </div>
      <div class="view-dashboard">
        <router-link v-bind:to="{ name: 'DashboardList' }" tag="button" class="view-dashboard-button">
          View Dashboards
        </router-link>
      </div>
      <div class="extra" />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'HomePage',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  h1 {
    font-weight: normal;
  }
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    justify-content: flex-start;
    min-height: 100%;
    background-color: color('background');
  }
  .slideshow {
    display: flex;
    justify-content: center;
  }
  .img {
    width: 600px;
    height: 400px;
    background: color('foreground');
  }
  .text {
    padding-left: 30px;
    width: 200px;
    color: color('text');
  }
  .view-dashboard {
    display: flex;
    justify-content: center;
    padding: 50px;
  }
  .view-dashboard-button {
    cursor: pointer;
    padding: 15px;
    font-size: 20px;
    border: none;
    text-decoration: none;
    border-radius: 3px;
    background-color: color('accent1');
    color: color('text');
  }
  .view-dashboard-button:hover {
    background-color: shade(color('accent1'), 20%);
  }
  .extra {
    height: 500px;
    background: color('foreground');
  }

</style>
