<template>
  <transition name="fade">
    <div
      class="modal"
      @mousedown.self="$emit('close')"
    >
      <div
        class="modal-content"
        @click.stop
      >
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class Modal extends Vue {
    // Props
    @Prop({ default: 80 })
    private width: number

    @Prop({ default: 80 })
    private height: number
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

  .modal {
    z-index: 30000000;
    position: fixed;
    justify-content: center;
    display: flex;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
  }
  .modal-content {
    z-index: 100;
    display: flex;
    align-self: center;
    position: relative;
    background: bgColor('default');
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
    border-radius: 3px;
    padding: 10px;
   }
</style>
