<template>
  <div class="dashboard"
    :style="dashboardStyle"
    :class="{
      'hide-cursor': !isCursorVisible
    }"
    @mousemove="updateTimer"
    @click="updateTimer"
  >
    <BaseTile
      v-for="(tile) in tiles"
      :key="tile.id"
      :tile="tile"
      :columns="dashboard.columns"
      :rows="dashboard.rows"
      @update="updateTile"
      @refresh="getTiles"
    />
    <Fab
      :isCursorVisible="isCursorVisible"
      @create-tile="createTile"
    />
  </div>
</template>

<script>
import DashboardsService from '@/services/DashboardsService'
import TilesService from '@/services/TilesService'
import BaseTile from '@/components/tiles/BaseTile'
import Fab from '@/components/Fab'
import { backgroundCSS, rowsCSS, columnsCSS } from '@/utils/styleHelper'

export default {
  name: 'ViewDashboardPage',
  data () {
    return {
      dashboard: {},
      tiles: [],
      movementTimer: 3000,
      movementTimeout: null,
      isCursorVisible: true
    }
  },
  components: {
    BaseTile,
    Fab
  },
  mounted () {
    this.getDashboard()
    this.getTiles()
    this.fabTimeout = setTimeout(
      () => (this.isCursorVisible = false),
      this.movementTimer
    )
  },
  methods: {
    async getDashboard () {
      await DashboardsService.getDashboard({
        dashboard_id: this.$route.params.dashboard_id
      }).then((response) => (this.dashboard = response.data))
    },
    async getTiles () {
      await TilesService.fetchTiles({
        dashboard_id: this.$route.params.dashboard_id
      }).then((response) => (this.tiles = response.data.tiles))
    },
    async updateTile (tileId) {
      await TilesService.getTile({
        dashboard_id: this.$route.params.dashboard_id,
        tile_id: tileId
      }).then((response) => {
        // Hack to force an update only on one tile
        const tileIndex = this.tiles.findIndex(tile => tile._id === tileId)
        this.tiles.splice(tileIndex, 1)
        this.tiles.splice(tileIndex, 0, response.data)
      })
    },
    async createTile () {
      await TilesService.createTile({
        dashboard_id: this.$route.params.dashboard_id
      }).then(() => this.getTiles())
    },
    updateTimer () {
      this.isCursorVisible = true
      clearTimeout(this.movementTimeout)
      this.movementTimeout = setTimeout(
        () => (this.isCursorVisible = false),
        this.movementTimer
      )
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
    maxTiles () {
      return this.dashboard.rows * this.dashboard.columns
    },
    background () {
      return this.dashboard.style && backgroundCSS(this.dashboard.style.backgroundColor)
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
    &.hide-cursor {
      cursor: none;
    }
  }
</style>
