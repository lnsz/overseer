<template>
  <div
    class="fab"
    :class="{
      'visible': isVisible,
      'open': isOpen
    }"
    :style="{'width': `${isOpen && isVisible ? 110 * buttons.length : 70}px`}"
  >
    <FabOption
      v-for="(button) in buttons"
      :key="button.name"
      :button="button"
      :isOpen="isOpen"
    />
    <button
      class="fab-button"
      @mouseover="$emit('mouse-over')"
      @mouseleave="$emit('mouse-leave')"
      :class="{
        'visible': isVisible,
        'open': isOpen
      }"
      @click="toggleOpen"
    >
      <font-awesome-icon
        class="icon"
        :icon="isOpen ? 'times' : 'bars'"
      />
    </button>
  </div>
</template>

<script>
import FabOption from '@/components/FabOption'
export default {
  name: 'Fab',
  components: {
    FabOption
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    locked: {
      type: Boolean,
      default: false
    },
    buttons: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isOpen: false,
      isHovering: false
    }
  },
  methods: {
    setHovering (value) {
      this.isHovering = value
    },
    toggleOpen () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .fab {
    position: fixed;
    bottom: -100px;
    right: 50px;
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    transition: all 0.5s ease;

    &.visible {
      transform: translateY(-150px);
      &.open {
        width: 300px;
      }
    }

    .fab-button {
      width: 70px;
      height: 70px;
      z-index: 100;
      box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
      transition: all 0.2s ease;
      cursor: pointer;
      font-size: 25px;
      border: none;
      text-decoration: none;
      border-radius: 100%;
      background-color: color('green');
      color: color('text');

      &:hover {
        transform: translateY(-1px);
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
        background-color: tint(color('green'), 20%);
      }
      &:active {
        transform: translateY(1px);
        background-color: shade(color('green'), 20%);
      }
      &.visible {
        &.open {
          width: 50px;
          height: 50px;
          margin: 10px;
          margin-left: 0px;
          transform: translateX(0px);
          background-color: color('foreground');
        }
        &.open:hover {
          transform: translateY(-1px);
          box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
          background-color: tint(color('foreground'), 20%);
        }
        &.open:active {
          transform: translateY(1px);
          background-color: shade(color('foreground'), 20%);
        }
      }

      .icon {
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
      }
    }
  }
</style>
