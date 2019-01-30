<template>
  <div class="dashboard"
    :style="dashboardStyle"
    v-on:mousemove="updateTimer"
    v-on:click="updateTimer"
  >
    <div
      v-bind:key="tile.id"
      v-for="(tile) in tiles"
    >
      <Tile
        v-bind:tile="tile"
        v-bind:columns="dashboard.columns"
        v-bind:rows="dashboard.rows"
      />
    </div>
    <button
      class="fab-button"
      v-on:mouseover="mouseOverFab"
      v-on:mouseleave="mouseLeaveFab"
      v-bind:class="{
        'visible': isFabVisible,
        'active': isFabActive
      }"
      v-on:click="toggleActive"
    >
      <font-awesome-icon
        class="icon"
        v-bind:icon="isFabActive ? 'times' : 'bars'"
      />
    </button>
    <button
      class="fab-option edit"
      v-on:mouseover="mouseOverFab"
      v-on:mouseleave="mouseLeaveFab"
      v-bind:class="{
        'visible': isFabVisible,
        'active': isFabActive
      }"
    >
      <font-awesome-icon
        class="icon"
        icon="edit"
      />
    </button>
    <button
      class="fab-option new"
      v-on:click="createTile"
      v-on:mouseover="mouseOverFab"
      v-on:mouseleave="mouseLeaveFab"
      v-bind:class="{
        'visible': isFabVisible,
        'active': isFabActive
      }"
    >
      <font-awesome-icon
        class="icon"
        icon="plus"
      />
    </button>
    <button
      class="fab-option copy"
      v-on:mouseover="mouseOverFab"
      v-on:mouseleave="mouseLeaveFab"
      v-bind:class="{
        'visible': isFabVisible,
        'active': isFabActive
      }"
    >
      <font-awesome-icon
        class="icon"
        icon="copy"
      />
    </button>
    <button
      class="fab-option star"
      v-on:mouseover="mouseOverFab"
      v-on:mouseleave="mouseLeaveFab"
      v-bind:class="{
        'visible': isFabVisible,
        'active': isFabActive
      }"
    >
      <font-awesome-icon
        class="icon"
        icon="star"
      />
    </button>
  </div>
</template>

<script>
import DashboardsService from '@/services/DashboardsService'
import TilesService from '@/services/TilesService'
import Tile from '@/components/Tile'
import { backgroundCSS, rowsCSS, columnsCSS } from '@/utils/styleHelper'

export default {
  name: 'ViewDashboardPage',
  data () {
    return {
      dashboard: {},
      tiles: [],
      isFabVisible: true,
      isFabActive: false,
      isMouseOverFab: false,
      fabTimeout: null,
      fabTimer: 3000
    }
  },
  components: {
    Tile
  },
  mounted () {
    this.getDashboard()
    this.getTiles()
    this.fabTimeout = setTimeout(
      () => ([this.isFabVisible, this.isFabActive] = [false, false]),
      this.fabTimer
    )
  },
  methods: {
    async getDashboard () {
      const response = await DashboardsService.getDashboard({
        dashboard_id: this.$route.params.dashboard_id
      })
      this.dashboard = response.data
    },
    async getTiles () {
      const response = await TilesService.fetchTiles({
        dashboard_id: this.$route.params.dashboard_id
      })
      this.tiles = response.data.tiles
    },
    async createTile () {
      await TilesService.createTile({
        dashboard_id: this.$route.params.dashboard_id,
        type: 'status',
        style: {},
        chart: {},
        status: {}
      }).then(() => this.getTiles())
    },
    updateTimer () {
      this.isFabVisible = true
      this.clearFabTimeout()
      if (!this.isMouseOverFab) {
        this.fabTimeout = setTimeout(
          () => ([this.isFabVisible, this.isFabActive] = [false, false]),
          this.fabTimer
        )
      }
    },
    toggleActive () {
      this.isFabActive = !this.isFabActive
    },
    clearFabTimeout () {
      clearTimeout(this.fabTimeout)
    },
    mouseOverFab () {
      this.clearFabTimeout()
      this.isMouseOverFab = true
    },
    mouseLeaveFab () {
      this.isMouseOverFab = false
    }
  },
  computed: {
    dashboardStyle () {
      return {
        ...this.columns,
        ...this.rows,
        ...this.background
      }
    },
    columns () {
      return columnsCSS(this.dashboard.columns)
    },
    rows () {
      return rowsCSS(this.dashboard.rows)
    },
    background () {
      return backgroundCSS(this.dashboard.backgroundColor)
    },
    maxTiles () {
      return this.dashboard.rows * this.dashboard.columns
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .dashboard {
    position: relative;
    display: grid;
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
    background-color: color('background');
  }
  .icon {
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
  }
  .fab-button {
    width: 70px;
    height: 70px;
    bottom: -100px;
    right: 50px;
    z-index: 2;
    transition: all 0.5s ease;
    position: absolute;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
    transition: all 0.2s ease;
    cursor: pointer;
    font-size: 25px;
    border: none;
    text-decoration: none;
    border-radius: 100%;
    background-color: color('green');
    color: color('text');
  }
  .fab-button.visible {
    transform: translateY(-150px);
  }
  .fab-button.active {
    width: 50px;
    height: 50px;
    transform: translate(-10px, -160px);
    background-color: color('foreground');
  }
  .fab-button.visible:hover {
    transform: translateY(-151px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: shade(color('green'), 20%);
  }
  .fab-button.active:hover {
    transform: translate(-10px, -161px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-button.visible:active {
    transform: translateY(-149px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: shade(color('green'), 20%);
  }
  .fab-button.active:active {
    transform: translate(-10px, -159px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option {
    width: 70px;
    height: 70px;
    position: absolute;
    bottom: -100px;
    right: 50px;
    visibility: hidden;
    z-index: 1;
    transition: all 0.2s ease;
    position: absolute;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
    transition: all 0.2s ease;
    cursor: pointer;
    font-size: 25px;
    border: none;
    text-decoration: none;
    border-radius: 100%;
    background-color: color('foreground');
    color: color('text');
  }
  .fab-option.visible {
    transform: translateY(-150px);
  }
  .fab-option.active {
    visibility: visible;
  }
  .fab-option.edit.active:hover {
    transform: translate(-100px, -151px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option.new.active:hover {
    transform: translate(-200px, -151px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option.copy.active:hover {
    transform: translate(-300px, -151px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option.star.active:hover {
    transform: translate(-400px, -151px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option.edit.active:active {
    transform: translate(-100px, -149px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option.new.active:active {
    transform: translate(-200px, -149px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option.copy.active:active {
    transform: translate(-300px, -149px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: tint(color('foreground'), 20%);
  }
  .fab-option.star.active:active {
    transform: translate(-400px, -149px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: color('yellow');
  }
  .fab-option.edit.active {
    transform: translate(-100px, -150px);
  }
  .fab-option.new.active {
    transform: translate(-200px, -150px);
  }
  .fab-option.copy.active {
    transform: translate(-300px, -150px);
  }
  .fab-option.star.active {
    transform: translate(-400px, -150px);
  }
</style>
