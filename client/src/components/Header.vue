<template>
  <div class="header">
     <router-link
      v-bind:to="{ name: 'HomePage' }"
      class="title"
      tag="button"
    >
      Overseer
    </router-link>
    <NavBar />
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

  .title {
    background: transparent;
    cursor: pointer;
    border: none;
    text-decoration: none;
    font-size: 30px;
    color: color('text');
  }
  .header {
    background: color('background');
    display: flex;
    justify-content: space-between;
    padding: 20px 3vw 20px 3vw;
    margin-bottom: 70px;
  }
</style>
