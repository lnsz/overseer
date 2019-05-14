<template>
  <div
    class="nav-button-wrapper"
    @click="$emit('click')"
  >
    <router-link
      v-if="link"
      :to="{ name: link }"
      :class="{ 'border': border }"
      class="nav-button"
    >
      {{text}}
    </router-link>
    <div
      v-else
      :class="{ 'border': border }"
      class="nav-button"
    >
      {{text}}
    </div>
  </div>

</template>

<script>
export default {
  name: 'NavButton',
  props: {
    text: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .nav-button-wrapper {
    display: flex;
    justify-content: center;
  }
  .nav-button {
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;
    transition: all 0.2s ease;
    background: transparent;
    border: none;
    text-decoration: none;
    font-size: 18px;
    cursor: pointer;
    color: color('text');
    padding: 8px 10px 8px 10px;
  }
  .nav-button:hover {
    text-decoration: underline;
  }
  .border {
    border: 1px solid color('text');
    border-radius: 3px;
  }
  .border:hover {
    background: color('text');
    color: color('background');
    text-decoration: none;
  }
  @media only screen and (max-width: 700px){
    .nav-button{
      display: none;
    }
  }
</style>
