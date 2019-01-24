<template>
  <div class="tab-bar">
    <div v-bind:key="tab" v-for="tab in tabs">
      <TabButton v-bind:name="tab" />
    </div>
  </div>
</template>

<script>
import TabButton from '@/components/TabButton'

export default {
  name: 'TabBar',
  components: {
    TabButton
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
