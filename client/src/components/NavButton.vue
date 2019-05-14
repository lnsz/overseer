<template>
  <router-link
    :to="{ name: page }"
    class="nav-button"
  >
    {{name}}
  </router-link>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class Logo extends Vue {
    @Prop({ default: '' })
    private name: string

    @Prop({ default: '' })
    private page: string
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions.scss";



  .nav-button {
    font-family: font('segoe');
    color: textColor('default');
    font-size: fontsize('nav');
    text-decoration: none;
    margin: 20px;
    border-radius: values('border-radius');
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  // Mobile view
  @media only screen and (max-width: breakpoints('mobile')) {
    .nav-button {
      color: textColor('primary');
      text-align: right;
      margin: 0;
      padding: 15px;
      min-width: 100px;
      &:hover {
        color: textColor('reverse');
        background: bgColor('reverse');
        text-decoration: none;
      }
    }
  }
</style>

