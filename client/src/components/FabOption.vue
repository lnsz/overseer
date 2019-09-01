<template>
  <button
    class="fab-option"
    :style="{'pointer-events': isOpen ? 'all' : 'none'}"
    :class="{'open': isOpen}"
    @mouseover="$parent.$emit('mouse-over')"
    @mouseleave="$parent.$emit('mouse-leave')"
    @click="click()"
  >
    <font-awesome-icon
      class="icon"
      :icon="icon"
    />
    <div class="tooltip">{{name}}</div>
  </button>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { FabData } from '../types'

  @Component({
    components: {
      FabOption
    }
  })
  export default class FabOption extends Vue {
    @Prop({ default: '' })
    private icon: string

    @Prop({ default: '' })
    private name: string

    @Prop()
    private click: () => void

    @Prop({ default: false })
    private isOpen: boolean
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

  .fab-option {
    box-shadow: none;
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
    z-index: 1;
    text-decoration: none;
    border-radius: 100%;
    background-color: bgColor('secondary');
    position: relative;
    width: 70px;
    height: 70px;
    font-size: 25px;
    color: textColor('default');
    margin-left: -140px;
    transform: translateX(140px);
    &.open {
      box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
    }

    .tooltip {
      transition: all 0.4s ease;
      text-align: center;
      display: block;
      position: absolute;
      padding: 3px;
      z-index: 2;
      top: 100%;
      left: 0px;
      width: 100%;
      font-size: 14px;
      background-color: rgba(0, 0, 0, 0.5);
      color: textColor('default');
      opacity: 0;
    }

    &:hover {
      transform: translate(140px, -1px);
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
      background-color: tint(bgColor('secondary'), 20%);
      .tooltip {
        opacity: 1;
      }
    }
    &:active {
      transform: translate(140px, 1px);
      background-color: shade(bgColor('secondary'), 20%);
    }

    .icon {
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
    }
  }
</style>
