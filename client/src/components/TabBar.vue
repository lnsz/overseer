<template>
  <div class="tab-bar">
    <TabButton
      v-for="tab in tabs"
      :key="tab"
      :name="tab"
    />
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
        (!this.$route.query ||
        !(this.tabs.includes(this.$route.query.tab)))) {
      router.replace({
        query: { ...this.$route.query, tab: this.tabs[0].toLowerCase() }
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
