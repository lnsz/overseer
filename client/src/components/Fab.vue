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
      :icon="button.icon"
      :name="button.name"
      :click="button.click"
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

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import FabOption from '@/components/FabOption.vue'
  import { FabData } from '../types'

  @Component({
    components: {
      FabOption
    }
  })
  export default class Fab extends Vue {
    // Props
    @Prop({ default: false })
    private isVisible: boolean

    @Prop({ default: false })
    private locked: boolean

    @Prop({ default: [] })
    private buttons: FabData[]

    // Data
    private isOpen = false
    private isHovering = false

    // Methods
    private setHovering(value: boolean): void {
      this.isHovering = value
    }

    private toggleOpen() {
      this.isOpen = !this.isOpen
    }
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

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
      background-color: bgColor('primary');
      color: textColor('default');

      &:hover {
        transform: translateY(-1px);
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
        background-color: tint(bgColor('primary'), 20%);
      }
      &:active {
        transform: translateY(1px);
        background-color: shade(bgColor('primary'), 20%);
      }
      &.visible {
        &.open {
          width: 50px;
          height: 50px;
          margin: 10px;
          margin-left: 0px;
          transform: translateX(0px);
          background-color: bgColor('secondary');
        }
        &.open:hover {
          transform: translateY(-1px);
          box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
          background-color: tint(bgColor('secondary'), 20%);
        }
        &.open:active {
          transform: translateY(1px);
          background-color: shade(bgColor('secondary'), 20%);
        }
      }

      .icon {
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
      }
    }
  }
</style>
