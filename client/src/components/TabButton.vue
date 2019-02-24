<template>
  <router-link
    :to="{ query: { ...$route.query, tab: name.toLowerCase() } }"
    :class="{ 'selected': isSelected }"
    tag="button"
    class="tab"
  >
    {{name}}
  </router-link>
</template>

<script>
export default {
  name: 'TabButton',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    isSelected () {
      return this.$route.query.tab === this.name.toLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .tab {
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    transition: all 0.2s ease;
    font-size: 15px;
    cursor: pointer;
    background: color('background');
    text-decoration: none;
    color: color('text');
    margin: 2px -1px -1px 0;
    padding: 12px 22px 13px 22px;
    border: 1px solid color('green');
    text-transform: capitalize;
  }
  .tab:hover {
    background: color('foreground');
  }
  .tab.selected {
    border-radius: 3px 3px 0px 0px;
    margin: 0 -1px -1px 0;
    padding: 13px 22px 13px 22px;
    background: color('green');
  }
</style>
