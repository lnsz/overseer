<template>
  <transition name="fade">
    <div
      class="modal"
      @click="closeModal"
    >
      <div
        class="modal-content"
        @click.stop="stopTheEvent"
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
    },
    stopTheEvent (event) {
      event.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .modal {
    cursor: pointer;
    z-index: 3;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }
  .modal-content {
    z-index: 100;
    pointer-events: none;
    position: fixed;
    top: 10%;
    left: 10%;
    height: 80%;
    width: 80%;
    background: color('foreground');
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
    border-radius: 3px;
   }
</style>
