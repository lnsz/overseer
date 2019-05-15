<template>
  <router-link
    :to="{ query: { ...$route.query, tab: name.toLowerCase() } }"
    :class="{ 'selected': isSelected }"
    class="tab"
  >
    {{name}}
  </router-link>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component({})
  export default class TabButton extends Vue {
    // Props
    @Prop({ default: '' })
    private name: string

    // Computed
    get isSelected(): boolean {
      return this.$route.query.tab === this.name.toLowerCase()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

  .tab {
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    transition: all 0.2s ease;
    font-size: 15px;
    cursor: pointer;
    background: bgColor('default');
    text-decoration: none;
    color: textColor('default');
    margin: 2px -1px -1px 0;
    padding: 12px 22px 13px 22px;
    border: 1px solid bgColor('primary');
    text-transform: capitalize;
  }
  .tab:hover {
    background: bgColor('secondary');
  }
  .tab.selected {
    border-radius: 3px 3px 0px 0px;
    margin: 0 -1px -1px 0;
    padding: 13px 22px 13px 22px;
    z-index: 1;
    background: bgColor('primary');
  }
</style>