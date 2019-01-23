<template>
  <div class="dashboard-list">
      <div v-if="dashboards.length > 0" class="table-wrap">
        <div>
          <router-link v-bind:to="{ name: 'NewDashboard' }" class="">Create Dashboard</router-link>
        </div>
        <table>
          <tr>
            <td>Title</td>
            <td width="550">Description</td>
            <td width="100" align="center">Action</td>
          </tr>
          <tr v-bind:key="dashboard.id" v-for="dashboard in dashboards">
            <td>
              <router-link v-bind:to="{ name: 'ViewDashboard', params: { dashboard_id: dashboard._id } }">
                {{ dashboard.title }}
              </router-link>
            </td>
            <td class="description">{{ dashboard.description }}</td>
            <td align="center">
              <router-link v-bind:to="{ name: 'EditDashboard', params: { dashboard_id: dashboard._id } }">Edit</router-link> |
              <a class="delete-button" href="#" @click="$emit('delete-dashboard', dashboard._id)">Delete</a>
            </td>
          </tr>
        </table>
      </div>
      <div v-else>
        There are no dashboards.. Lets create one now!!! <br /><br />
        <router-link v-bind:to="{ name: 'NewDashboard' }" class="create_dashboard_link">Create Dashboard</router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardList',
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

  .dashboard-list{
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
