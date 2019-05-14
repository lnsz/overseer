<template>
  <div class="dashboard-list-page">
    <Header @update="() => {}" />
    <div class="filters">
      <!-- <TabBar :tabs="tabs" /> -->
      <div>tabs</div>
      <SearchBox @search="() => {}" />
    </div>
    <!-- <DashboardList
      :dashboards="filteredDashboards"
    /> -->
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Header from '@/components/Header.vue'
  import SearchBox from '@/components/SearchBox.vue'

  @Component({
    components: {
      Header,
      SearchBox
    }
  })
  export default class DashboardList extends Vue {}
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
