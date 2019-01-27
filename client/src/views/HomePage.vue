<template>
  <div class="home-page">
    <Header />
    <div class="home-page-content">
      <div class="slideshow">
        <div class="img" />
        <div class="text">
          <p class="title">Title</p>
          <p class="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum
          </p>
        </div>
      </div>
      <div class="view-dashboard">
        <router-link
          v-bind:to="{ query: { tab: 'best' }, name: 'DashboardListPage' }"
          tag="button"
          class="view-dashboard-button"
        >
          Explore Dashboards
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

  .home-page {
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
    width: 250px;
    color: color('text');
  }
  .title {
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;
    font-size: 20px;
  }
  .description {
    font-weight: 300;
  }
  .view-dashboard {
    display: flex;
    justify-content: center;
    padding: 50px;
  }
  .view-dashboard-button {
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    transition: all 0.2s ease;
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
    transform: translate(0, -1px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: shade(color('accent1'), 20%);
  }
  .view-dashboard-button:active {
    transform: translate(0, 1px);
    box-shadow: none;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  }
  .extra {
    height: 500px;
    background: color('foreground');
  }

</style>
