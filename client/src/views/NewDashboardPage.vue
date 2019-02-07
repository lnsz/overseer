<template>
  <div class="new-dashboard-page">
    <Header />
    <div class="title">Create Dashboard</div>
    <div class="form-container">
      <div class="form">
        <input class="field text-field" type="text" placeholder="Name" v-model="name">
        <textarea class="field text-field" rows="10" placeholder="Description" v-model="description"></textarea>
        <input class="field text-field" type="text" placeholder="Creator" v-model="creator">
        <div class="number-fields">
          <input class="field number-field" type="number" placeholder="Stars" v-model="stars">
          <input class="field number-field" type="number" placeholder="Copies" v-model="copies">
          <input class="field number-field" type="number" placeholder="Rows" v-model="rows">
          <input class="field number-field" type="number" placeholder="Columns" v-model="columns">
        </div>
        <button class="button" @click="createDashboard">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardsService from '@/services/DashboardsService'
import Header from '@/components/Header'

export default {
  name: 'NewDashboardPage',
  components: {
    Header
  },
  data () {
    return {
      name: '',
      description: '',
      creator: '',
      stars: '',
      copies: '',
      rows: '',
      columns: ''
    }
  },
  methods: {
    async createDashboard () {
      await DashboardsService.createDashboard({
        name: this.name,
        description: this.description,
        creator: this.creator,
        stars: this.stars,
        copies: this.copies,
        refreshTimer: 30000,
        style: {
          layout: {
            rows: this.rows,
            columns: this.columns
          }
        }
      })
      this.$router.push({ query: { tab: 'best' }, name: 'DashboardListPage' })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .button {
    margin-top: 15px;
    align-self: center;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    transition: all 0.2s ease;
    cursor: pointer;
    padding: 10px 20px 10px 20px;
    font-size: 20px;
    border: none;
    text-decoration: none;
    border-radius: 3px;
    background-color: color('green');
    color: color('text');
  }
  .button:hover {
    transform: translateY(-1px);
    box-shadow: 3px 3px 11px rgba(0, 0, 0, 1);
    background-color: shade(color('green'), 20%);
  }
  .button:active {
    transform: translateY(1px);
    box-shadow: none;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  }
  .filters{
    display: flex;
    justify-content: space-between;
    margin: 0 30px 0 30px;
  }
  .new-dashboard-page {
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
  .form-container {
    display: flex;
    justify-content: center;
  }
  .form {
    display: flex;
    flex-direction: column;
    width: 500px;
  }
  .number-fields {
    width: 100%;
  }
  .field {
    margin: 5px 0 5px 0;
    padding: 10px;
    color: color('text');
    background: color('background');
    border: 1px solid color('foreground');
    resize: none;
    border-radius: 3px;
    width: 478px;
  }
  .field:focus {
    border: 1px solid color('green');
  }
  .field.number-field {
    width: calc(50% - 25px);
  }
</style>
