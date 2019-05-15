<template>
  <div
    class="nav-button-wrapper"
  >
    <router-link
      v-if="page"
      :to="{ name: page }"
      :class="{ 'border': border }"
      class="nav-button"
    >
      {{name}}
    </router-link>
    <div
      v-else
      :class="{ 'border': border }"
      class="nav-button"
      @click="notifyParent"
    >
      {{name}}
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class Logo extends Vue {
    @Prop({ default: '' })
    private name: string

    @Prop({ default: '' })
    private page: string

    @Prop({ default: '' })
    private action: string

    @Prop({ default: false })
    private border: boolean

    private notifyParent(): void {
      if (this.action) {
        this.$parent.$emit(this.action)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions.scss";

  .nav-button-wrapper {
    display: flex;
    align-content: center;
    .nav-button {
      font-family: font('segoe');
      color: textColor('default');
      font-size: fontsize('nav');
      text-decoration: none;
      margin: 0px 10px;
      border-radius: values('border-radius');
      padding: 4px 10px 6px 10px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
      &.border {
        border: 1px solid bgColor('reverse');
        border-radius: 3px;
        &:hover {
          background: bgColor('reverse');
          color: textColor('secondary');
          text-decoration: none;
        }
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
        &.border {
          border: none;
        }
      }
    }
  }
</style>