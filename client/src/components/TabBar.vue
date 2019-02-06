<template>
  <div class="tab-bar">
    <div v-bind:key="tab" v-for="tab in tabs">
      <TabButton v-bind:name="tab" />
    </div>
  </div>
</template>

<script>
import router from '@/router'

import TabButton from '@/components/TabButton'

export default {
  name: 'TabBar',
  components: {
    TabButton
  },
  mounted () {
    if (this.tabs.length > 0 &&
        (!this.$router.query ||
        !(this.$router.query.tab in this.tabs))) {
      router.replace({
        query: { ...this.$router.query, tab: this.tabs[0].toLowerCase() }
      })
    }
  },
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .tab-bar {
    display: flex;
  }

</style>
