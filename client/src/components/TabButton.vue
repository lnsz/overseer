<template>
  <router-link
    v-bind:to="{ query: { ...$route.query, tab: name.toLowerCase() } }"
    tag="button"
    class="tab"
    v-bind:class="{ 'selected': selected }"
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
    selected () {
      return this.$route.query.tab === this.name.toLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .tab {
    font-size: 15px;
    cursor: pointer;
    background: color('background');
    text-decoration: none;
    color: color('text');
    margin: 2px -1px -1px 0;
    padding: 12px 22px 13px 22px;
    border: 1px solid color('accent1');
  }
  .tab:focus {
    outline: none;
  }
  .tab:hover {
    background: color('foreground');
  }
  .tab.selected {
    margin: 0 -1px -1px 0;
    padding: 13px 22px 13px 22px;
    background: color('accent1');
  }
</style>
