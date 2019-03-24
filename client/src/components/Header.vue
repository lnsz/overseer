<template>
  <div class="header">
    <div class="top" />
    <div class="header-content">
      <router-link
        :to="{ name: 'HomePage' }"
        class="title"
      >
        Overseer
      </router-link>
      <NavBar />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'Header',
  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .top {
    height: 5px;
    background: color('green');
  }
  .title {
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;
    background: transparent;
    cursor: pointer;
    border: none;
    text-decoration: none;
    font-size: 30px;
    color: color('text');
  }
  .title:hover {
    text-decoration: underline;
  }
  .header {
    display: flex;
    flex-direction: column;
  }
  .header-content {
    background: color('background');
    display: flex;
    justify-content: space-between;
    padding: 20px 15px 20px 15px;
    margin: 0 15px 40px 15px;
    border-bottom: 1px solid color('foreground');
  }
</style>
