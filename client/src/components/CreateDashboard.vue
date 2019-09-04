<template>
  <div class="create-dashboard">
    <div class="title">Create Dashboard</div>
    <div class="content-wrapper">
      <div class="input-wrapper">
        <div>Name</div>
        <input
          class="input-field"
          v-model="name"
        />
      </div>
      <div class="input-wrapper">
        <div>Description</div>
        <textarea
          class="input-field"
          v-model="description"
        />
      </div>
      <div
        v-if="$store.state.user"
        class="input-wrapper"
      >
        <div>Private?</div>
        <ToggleButton
          color="#42b983"
          :width="50"
          :height="25"
          sync
          v-model="isPrivate"
        />
      </div>
    </div>
    <ActionButton
      text="create"
      @click="createDashboard"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { ToggleButton } from 'vue-js-toggle-button'
  import strings from '../shared/constants/strings'
  import ActionButton from '@/components/ActionButton.vue'
  import { DashboardApi } from '../api'

  @Component({
    components: {
      ActionButton,
      ToggleButton
    }
  })
  export default class CreateDashboard extends Vue {
    // Data
    private name = ''
    private description = ''
    private isPrivate = false

    // Methods
    private async createDashboard(): Promise<void> {
      const res = await DashboardApi.createDashboard({
        name: this.name,
        description: this.description,
        permissions: {
          private: this.isPrivate
        }
      })
      console.log(res)
      this.$router.push({
        path: `/dashboards/${res.data.dashboard._id}/view`
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

  .create-dashboard {
    color: textColor('default');
    width: calc(35vw - 20px);
    height: calc(45vh - 90px);
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px;
    position: relative;
    .title {
      font-size: 28px;
    }
    .content-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      .input-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        margin: 10px 0;
        .input-field {
          background: bgColor('default');
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          transition: all 0.2s ease;
          color: textColor('default');
          background: bgColor('default');
          border: 1px solid bgColor('secondary');
          padding: 7px;
          border-radius: 3px;
          resize: none;
          width: 200px;
          &:focus {
            border: 1px solid bgColor('primary');
          }
        }
      }
    }
  }
</style>
