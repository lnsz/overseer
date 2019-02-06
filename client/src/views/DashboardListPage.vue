<template>
  <div class="dashboard-list-page">
    <Header />
    <div class="filters">
      <TabBar :tabs="tabs" />
      <SearchBox @search="updateFilter" />
    </div>
    <DashboardList
      @delete-dashboard="deleteDashboard"
      :dashboards="filteredDashboards"
    />
  </div>
</template>

<script>
import DashboardsService from '@/services/DashboardsService'
import Header from '@/components/Header'
import SearchBox from '@/components/SearchBox'
import DashboardList from '@/components/DashboardList'
import TabBar from '@/components/TabBar'

export default {
  name: 'DashboardListPage',
  components: {
    Header,
    SearchBox,
    DashboardList,
    TabBar
  },
  data () {
    return {
      dashboards: [],
      dashboardFilter: '',
      tabs: ['Best', 'Hot', 'Newest', 'Private', 'Stars']
    }
  },
  mounted () {
    this.getDashboards()
  },
  methods: {
    async getDashboards () {
      const response = await DashboardsService.fetchDashboards()
      this.dashboards = response.data.dashboards
    },
    async deleteDashboard (id) {
      await DashboardsService.deleteDashboard({ dashboard_id: id })
      this.getDashboards()
      this.$router.push({ name: 'DashboardListPage' })
    },
    async updateFilter (event) {
      this.dashboardFilter = event.target.value
    }
  },
  computed: {
    filteredDashboards () {
      return this.dashboards.filter(
        dashboard => dashboard.name.toUpperCase().includes(
          this.dashboardFilter.toUpperCase()
        )
      )
    },
    tab () {
      return this.$route.query.tab
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .filters{
    display: flex;
    justify-content: space-between;
    max-height: 46px;
    margin: 0 30px 0 30px;
  }
  .dashboard-list-page {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    justify-content: flex-start;
    min-height: 100%;
    background-color: color('background');
  }
</style>
