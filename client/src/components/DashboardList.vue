<template>
  <div class="dashboard-list">
    <div
      v-bind:key="dashboard.id"
      v-for="(dashboard, index) in dashboards"
    >
      <DashboardCard
        v-bind:isLast="index == dashboards.length - 1"
        v-bind:dashboard="dashboard"
      />
    </div>
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
