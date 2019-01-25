<template>
  <div class="card" v-bind:class="{ 'last': isLast }">
    <router-link
      v-bind:to="{ name: 'ViewDashboard', params: { dashboard_id: dashboard._id } }"
      class="thumbnail link"
      tag="button"
    />
    <div class="text">
      <div class="dashboard-name">
        <router-link
          class="link"
          v-bind:to="{ name: 'ViewDashboard', params: { dashboard_id: dashboard._id } }"
        >
          {{dashboard.name}}
        </router-link>
      </div>
      <div class="dashboard-description">
        <router-link
          class="link"
          v-bind:to="{ name: 'ViewDashboard', params: { dashboard_id: dashboard._id } }"
        >
          {{dashboard.description}}
        </router-link>
      </div>
      <div class="dashboard-info">
        <div class="dashboard-creator">Created By: {{dashboard.creator}}</div>
        <div class="dashboard-stats">
          <div class="dashboard-star"><font-awesome-icon icon="star" /> {{dashboard.stars}}</div>
          <div class="dashboard-copy"><font-awesome-icon icon="copy" /> {{dashboard.copies}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    dashboard: {
      type: Object,
      default: () => ({
        name: '',
        description: '',
        creator: '',
        stars: 0,
        copies: 0
      })
    },
    isLast: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .card {
    display: flex;
    padding: 15px 0 15px 0;
    margin: 0 15px 0 15px;
    border-bottom: 1px solid color('foreground');
  }
  .card.last {
    border-bottom: none;
  }
  .text {
    width: 100%;
    color: color('text');
    padding: 10px 15px 10px 15px;
  }
  .dashboard-info {
    color: color('foreground');
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .dashboard-copy {
    padding: 0 5px 0 20px;
  }
  .dashboard-stats {
    display: flex;
  }
  .link {
    border: none;
    cursor: pointer;
    color: color('text');
    text-decoration: none;
  }
  .link:focus {
    outline: none;
  }
  .dashboard-name {
    font-size: 20px;
    padding-bottom: 10px;
  }
  .dashboard-creator {
    color: color('foreground');
  }
  .thumbnail {
    height: 100px;
    width: 100px;
    min-width: 100px;
    background: color('foreground');
  }
  .button {
    text-decoration: none;
  }
  .description {
    color: color('text');
  }
  .edit-button {
    color: color('accent1');
  }
  .delete-button{
    color: color('accent2');
  }
</style>
