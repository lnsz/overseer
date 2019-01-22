<template>
  <div class="dashboards">
    <Header />
    <div class="dashboard-list">
      <h1>Dashboards</h1>
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
            <td>{{ dashboard.description }}</td>
            <td align="center">
              <router-link v-bind:to="{ name: 'EditDashboard', params: { dashboard_id: dashboard._id } }">Edit</router-link> |
              <a class="delete-button" href="#" @click="deleteDashboard(dashboard._id)">Delete</a>
            </td>
          </tr>
        </table>
      </div>
      <div v-else>
        There are no dashboards.. Lets create one now!!! <br /><br />
        <router-link v-bind:to="{ name: 'NewDashboard' }" class="create_dashboard_link">Create Dashboard</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardsService from '@/services/DashboardsService'
import Header from '@/components/Header'

export default {
  name: 'dashboards',
  components: {
    Header
  },
  data () {
    return {
      dashboards: []
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
      this.$router.push({ name: 'Dashboards' })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  h1 {
    color: color('text');
    font-weight: 300;
  }
  .dashboards {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    justify-content: flex-start;
    min-height: 100%;
    background-color: color('background');
  }
  .table-wrap {
    width: 60%;
    margin: 0 auto;
    text-align: center;
  }
  table th, table tr {
    text-align: left;
  }
  table thead {
    background: #f2f2f2;
  }
  table tr td {
    padding: 10px;
  }
  table tr:nth-child(odd) {
    background: #f2f2f2;
  }
  table tr:nth-child(1) {
    background: color('accent1');
    color: color('text');
  }
  a {
    color: color('accent1');
    text-decoration: none;
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
