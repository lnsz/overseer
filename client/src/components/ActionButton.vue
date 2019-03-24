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

<script>
export default {
  name: 'ActionButton',
  props: {
    text: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'green',
      validator: (val) => ['green', 'red'].includes(val)
    },
    size: {
      type: String,
      default: 'normal',
      validator: (val) => ['small', 'normal', 'large'].includes(val)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

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
    color: color('text');
    transition: all 0.2s ease;
    background-color: color('green');
    &:hover {
      transform: translateY(-1px);
      box-shadow: 3px 3px 11px rgba(0, 0, 0, 0.7);
        background-color: shade(color('green'), 20%);
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
      background-color: color('red');
      &:hover {
        background-color: shade(color('red'), 20%);
      }
    }
  }
</style>
