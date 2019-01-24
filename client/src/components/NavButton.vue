<template>
  <div class="nav-button">
    <router-link
      v-bind:to="{ name: link }"
      v-bind:class="{ 'border': border }"
      class="nav-button-link"
      tag="button"
    >
      {{text}}
    </router-link>
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
      default: 'HomePage'
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

  .nav-button-link {
    background: transparent;
    border: none;
    text-decoration: none;
    font-size: 18px;
    cursor: pointer;
    color: color('text');
    padding: 5px;
  }
  .nav-button-link:hover {
    text-decoration: underline;
  }
  .nav-button-link:focus {
    outline: none;
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
