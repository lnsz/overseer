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
        <ActionButton
          @click="goToDashboardListPage"
          text="Explore Dashboards"
          link="DashboardListPage"
        />
      </div>
      <div class="extra" />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import ActionButton from '@/components/ActionButton'

import { goToPage, openPageInNewTab } from '@/utils/routerUtils'

export default {
  name: 'HomePage',
  components: {
    Header,
    ActionButton
  },
  methods: {
    goToDashboardListPage () {
      goToPage(this, 'DashboardListPage', { tab: 'best' })
    },
    openDashboardListPageInNewTab () {
      openPageInNewTab(this, 'DashboardListPage', { tab: 'best' })
    }
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
  .extra {
    height: 500px;
    background: color('foreground');
  }

</style>
