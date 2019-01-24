<template>
  <div class="dashboard-list">
    <div v-bind:key="dashboard.id" v-for="dashboard in dashboards">
      <DashboardCard v-bind:dashboard="dashboard" />
      <router-link
        v-bind:to="{
          name: 'EditDashboard',
          params: { dashboard_id: dashboard._id }
        }"
      >
        Edit
      </router-link> |
      <a
        class="delete-button"
        href="#"
        @click="$emit('delete-dashboard', dashboard._id)"
      >
        Delete
      </a>
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
    margin: 0 30px 0 30px;
    border: 1px solid color('accent1');
    display: flex;
    justify-content: center;
  }
  .table-wrap {
    width: 60%;
    margin: 0 auto;
    text-align: center;
  }
  table th, table tr {
    text-align: left;
  }
  table tr td {
    padding: 10px;
  }
  table tr:nth-child(1) {
    background: color('accent1');
    color: color('text');
  }
  a {
    color: color('accent1');
    text-decoration: none;
  }
  .description {
    color: color('text');
  }
  .delete-button{
    color: color('accent2');
  }
  a.create_dashboard_link {
    background: color('accent1');
    color: color('text');
    padding: 10px 80px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }
</style>
