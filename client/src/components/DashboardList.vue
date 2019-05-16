<template>
  <div class="dashboard-list">
    <DashboardCard
      v-for="(dashboard, index) in dashboards"
      :key="dashboard.id"
      :isLast="index == dashboards.length - 1"
      :id="dashboard._id"
      :name="dashboard.name"
      :description="dashboard.description"
      :creator="dashboard.creator"
      :stars="dashboard.stars"
      :copies="dashboard.copies"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import DashboardCard from '@/components/DashboardCard.vue'
  import { Dashboard } from '../types'

  @Component({
    components: {
      DashboardCard
    }
  })
  export default class DashboardList extends Vue {
    // Props
    @Prop({ default: [] })
    private dashboards: Dashboard[]
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

  .dashboard-list {
    border-radius: 0px 3px 3px 3px;
    margin: 0 30px 0 30px;
    border: 1px solid bgColor('primary');
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
