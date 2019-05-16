<template>
  <div class="dashboard-list-page">
    <Header @update="() => {}" />
    <div class="filters">
      <TabBar :tabs="tabs" />
      <SearchBox @search="() => {}" />
    </div>
    <DashboardList
      :dashboards="filteredDashboards"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Header from '@/components/Header.vue'
  import SearchBox from '@/components/SearchBox.vue'
  import TabBar from '@/components/TabBar.vue'
  import DashboardList from '@/components/DashboardList.vue'
  import { DashboardApi } from '../api'
  import { Dashboard } from '../types'

  @Component({
    components: {
      DashboardList,
      Header,
      SearchBox,
      TabBar
    }
  })
  export default class DashboardListPage extends Vue {
    // Data
    private tabs = ['best', 'hot', 'newest', 'private', 'stars']
    private dashboardFilter = ''
    private dashboards = []

    // Mounted
    private mounted() {
      this.getDashboards()
      document.title = 'Dashboard List'
    }

    // Computed
    get filteredDashboards(): Dashboard[] {
      return this.dashboards.filter(
        (dashboard) => dashboard.name.toUpperCase().includes(
          this.dashboardFilter.toUpperCase()
        )
      )
    }

    get tab(): string {
      return `${this.$route.query.tab}`
    }

    // Methods
    private async getDashboards(): Promise<void> {
      const response = await DashboardApi.fetchDashboards()
      this.dashboards = response.data.dashboards
    }

    private async updateFilter(event: Event): Promise<void> {
      this.dashboardFilter = (event.target as HTMLInputElement).value
    }
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

  .filters{
    display: flex;
    justify-content: space-between;
    max-height: 46px;
    margin: 0 30px;
    padding: 30px 0 0 0;
  }
  .dashboard-list-page {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    justify-content: flex-start;
    min-height: 100%;
    background-color: bgColor('default');
  }
</style>
