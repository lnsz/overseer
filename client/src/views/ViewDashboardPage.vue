<template>
  <div class="dashboard" :style="dashboardStyle">
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
      tiles: []
    }
  },
  components: {
    Tile
  },
  mounted () {
    this.getDashboard()
    this.getTiles()
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
    display: grid;
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
    background-color: color('background');
  }
</style>
