<template>
  <div class="dashboards">
    <h1>Create Dashboard</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
        </div>
        <div>
          <button class="app_dashboard_btn" @click="createDashboard">Create</button>
        </div>
      </div>
  </div>
</template>

<script>
import DashboardsService from '@/services/DashboardsService'
export default {
  name: 'NewDashboard',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    async createDashboard () {
      await DashboardsService.createDashboard({
        title: this.title,
        description: this.description
      })
      this.$router.push({ name: 'Dashboards' })
    }
  }
}
</script>

<style lang="scss" scoped>
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_dashboard_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
