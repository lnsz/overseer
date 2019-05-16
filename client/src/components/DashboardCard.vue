<template>
  <div class="card" :class="{ 'last': isLast }">
    <router-link
      :to="{ name: 'ViewDashboardPage', params: { dashboard_id: id } }"
      class="thumbnail link"
    />
    <div class="text">
      <div class="dashboard-name">
        <router-link
          class="link"
          :to="{ name: 'ViewDashboardPage', params: { dashboard_id: id } }"
        >
          {{name}}
        </router-link>
      </div>
      <div class="dashboard-description">
        {{description}}
      </div>
      <div class="dashboard-info">
        <div class="dashboard-creator">
          Created By: <div class="creator-name">{{creator}}</div>
        </div>
        <div class="dashboard-stats">
          <div class="dashboard-stars">
            <font-awesome-icon icon="star" />
              {{stars}}
            </div>
          <div class="dashboard-copies">
            <font-awesome-icon icon="copy" />
            {{copies}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class DashboardCard extends Vue {
    // Props
    @Prop({ default: '' })
    private id: string

    @Prop({ default: '' })
    private name: string

    @Prop({ default: '' })
    private description: string

    @Prop({ default: '' })
    private creator: string

    @Prop({ default: 0 })
    private stars: number

    @Prop({ default: 0 })
    private copies: number

    @Prop({ default: false })
    private isLast: boolean
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

  .card {
    display: flex;
    padding: 15px 0 15px 0;
    margin: 0 15px 0 15px;
    border-bottom: 1px solid bgColor('secondary');
    &.last {
      border-bottom: none;
    }

    .thumbnail {
      height: 100px;
      width: 100px;
      min-width: 100px;
      background: bgColor('secondary');
    }
    .text {
      width: 100%;
      color: textColor('secondary');
      padding: 10px 15px 10px 15px;
      .dashboard-name {
        font-size: 20px;
        padding-bottom: 10px;
        .link {
          color: textColor('default');
          &:hover {
            color: textColor('primary');
          }
        }
      }
      .dashboard-description {
        font-weight: 100;
          color: textColor('default');
      }
      .dashboard-info {
        color: textColor('secondary');
        font-weight: 300;
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
        .dashboard-creator {
          .creator-name {
            cursor: pointer;
            display: inline;
            &:hover {
              color: textColor('primary');
            }
          }
        }
        .dashboard-stats {
          display: flex;
          .dashboard-copies {
            cursor: pointer;
            padding: 0 5px 0 20px;
            &:hover {
              color: textColor('default');
            }
          }
          .dashboard-stars {
            cursor: pointer;
            &:hover {
              color: textColor('default');
            }
          }
        }
      }
    }
  }
</style>