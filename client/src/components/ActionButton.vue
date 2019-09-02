<template>
  <div class="button-wrapper">
    <router-link
      class="button"
      v-if="link"
      :to="{ name: link }"
    >
      {{text.toUpperCase()}}
      <slot />
    </router-link>
    <input
      v-else-if="submit"
      class="button"
      type="submit"
      :value="text.toUpperCase()"
    />
    <div
      v-else
      class="button"
      :class="[color, size]"
      @click="$emit('click')"
    >
      {{text.toUpperCase()}}
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class ActionButton extends Vue {
    // Props
    @Prop({ default: '' })
    private text: string

    @Prop({ default: false })
    private submit: boolean

    @Prop({ default: '' })
    private link: string

    @Prop({ default: 'green' })
    private color: string

    @Prop({ default: 'normal' })
    private size: string
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

  .button-wrapper {
    display: flex;
    justify-content: center;
  }
  .button {
    cursor: pointer;
    align-self: center;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.7);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    font-family: 'Roboto', sans-serif;
    letter-spacing: 0.5px;
    padding: 12px 20px 12px 20px;
    margin: 0px;
    font-size: 20px;
    border: none;
    text-decoration: none;
    border-radius: 3px;
    color: textColor('default');
    transition: all 0.2s ease;
    background-color: bgColor('green');
    &:hover {
      transform: translateY(-1px);
      box-shadow: 3px 3px 11px rgba(0, 0, 0, 0.7);
        background-color: shade(bgColor('green'), 20%);
    }
    &:active {
      transform: translateY(1px);
      box-shadow: none;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7)
    }

    // Modifiers
    &.small {
      padding: 2px 10px 2px 10px;
      font-size: 12px;
    }
    &.red {
      background-color: bgColor('red');
      &:hover {
        background-color: shade(bgColor('red'), 20%);
      }
    }
    &.grey {
      background-color: bgColor('grey');
      &:hover {
        background-color: shade(bgColor('grey'), 20%);
      }
    }
  }
</style>
