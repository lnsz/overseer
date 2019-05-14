<template>
  <div class="dashboard-list">
    <DashboardCard
      v-for="(dashboard, index) in dashboards"
      :key="dashboard.id"
      :isLast="index == dashboards.length - 1"
      :dashboard="dashboard"
    />
  </div>
</template>

<script>
import DashboardCard from '@/components/DashboardCard'

export default {
  name: 'DashboardList',
  components: {
    DashboardCard
  },
  props: {
    dashboards: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .dashboard-list {
    border-radius: 0px 3px 3px 3px;
    margin: 0 30px 0 30px;
    border: 1px solid color('green');
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
