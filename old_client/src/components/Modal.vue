<template>
  <transition name="fade">
    <div
      class="modal"
      @mousedown.self="closeModal"
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
  props: {
    width: {
      type: Number,
      default: 80
    },
    height: {
      type: Number,
      default: 80
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    }
  },
  computed: {
    modalSize () {
      return 1
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

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
    background: color('background');
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
    border-radius: 3px;
    padding: 10px;
   }
</style>
