<template>
  <div class="dashboard-list-page">
    <Header />
    <div class="title">Dashboards</div>
    <SearchBox @search="updateFilter" />
    <DashboardList
      @delete-dashboard="deleteDashboard"
      v-bind:dashboards="filteredDashboards"
    />
  </div>
</template>

<script>
import DashboardsService from '@/services/DashboardsService'
import Header from '@/components/Header'
import SearchBox from '@/components/SearchBox'
import DashboardList from '@/components/DashboardList'

export default {
  name: 'DashboardListPage',
  components: {
    Header,
    SearchBox,
    DashboardList
  },
  data () {
    return {
      dashboards: [],
      dashboardFilter: ''
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
        dashboard => dashboard.title.toUpperCase().includes(
          this.dashboardFilter.toUpperCase()
        )
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .dashboard-list-page {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    justify-content: flex-start;
    min-height: 100%;
    background-color: color('background');
  }
  .title {
    text-align: center;
    font-size: 25px;
    color: color('text');
    font-weight: 300;
    margin-bottom: 30px;
  }
</style>
