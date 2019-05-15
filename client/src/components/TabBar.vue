<template>
  <div class="tab-bar">
    <TabButton
      v-for="tab in tabs"
      :key="tab"
      :name="tab"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import TabButton from '@/components/TabButton.vue'
  import router from '../router'

  @Component({
    components: {
      TabButton
    }
  })
  export default class TabBar extends Vue {
    // Props
    @Prop({ default: [] })
    private tabs: [string]

    // Mounted
    private mounted() {
      if (this.tabs.length > 0 && this.isTabInRoute()) {
        router.replace({
          query: {
            ...this.$route.query,
            tab: this.tabs[0].toLowerCase()
          }
        })
      }
    }

    // Methods
    private isTabInRoute(): boolean {
      return !(this.$route.query &&
        this.tabs.includes(`${this.$route.query.tab}`))
    }
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

  .tab-bar {
    display: flex;
  }
</style>