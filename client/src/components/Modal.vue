<template>
  <transition name="fade">
    <div
      class="modal"
      @click="closeModal"
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

<script>

export default {
  name: 'Modal',
  methods: {
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .modal {
    cursor: pointer;
    z-index: 30000000;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
  }
  .modal-content {
    z-index: 100;
    position: absolute;
    top: 10vh;
    left: 10vw;
    height: 80vh;
    width: 80vw;
    background: color('background');
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
    border-radius: 3px;
    padding: 10px;
   }
</style>
