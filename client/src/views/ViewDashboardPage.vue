<template>
  <div
    class="dashboard"
    :class="{
      'hide-cursor': !isCursorVisible
    }"
    @mousemove="updateTimer"
    @click="updateTimer"
  >
    <grid-layout
      :layout.sync="layout"
      :col-num="gridValues.MAX_COLUMNS"
      :max-rows="gridValues.MAX_ROWS"
      :row-height="rowHeight(windowHeight)"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :autoSize="false"
      :vertical-compact="true"
      :margin="[0, 0]"
      :use-css-transforms="true"
      @layout-updated="updateAllTileLayouts"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :drag-allow-from="'.drag'"
        :resize-ignore-from="'.tile'"
        class="grid-item"
      >
        <BaseTile
          v-if="tiles[item.i]"
          :tile="tiles[item.i]"
          :columns="dashboard.columns"
          :rows="dashboard.rows"
          @edit="openEditView"
          @update="updateTile"
          @refresh="fetchTiles"
        />
        <div class="drag" />
      </grid-item>
    </grid-layout>
    <Modal
      v-if="isEditView"
      @close="closeEditView"
    >
      <EditTile
        :tile="editTile"
        @update="updateTile"
        @close="closeEditView"
      />
    </Modal>
    <Fab
      :isCursorVisible="isCursorVisible"
      @create-tile="createTile"
    />
  </div>
</template>

<script>
import router from '@/router'

import DashboardsService from '@/services/DashboardsService'

import VueGridLayout from 'vue-grid-layout'
import TilesService from '@/services/TilesService'
import BaseTile from '@/components/tiles/BaseTile'
import EditTile from '@/components/tiles/EditTile'
import Modal from '@/components/Modal'
import Fab from '@/components/Fab'
import { backgroundCSS, rowsCSS, columnsCSS } from '@/utils/styleUtils'
import {
  gridValues,
  rowHeight,
  getTileWidth,
  getTileHeight,
  getLayout
} from '@/utils/gridUtils'

export default {
  name: 'ViewDashboardPage',
  data () {
    return {
      dashboard: {},
      tiles: [],
      isEditView: false,
      movementTimer: 3000,
      movementTimeout: null,
      isCursorVisible: true,
      windowHeight: 0,
      layout: [],
      gridValues: gridValues,
      rowHeight: rowHeight
    }
  },
  components: {
    BaseTile,
    EditTile,
    Fab,
    Modal,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  mounted () {
    this.windowHeight = window.innerHeight
    window.addEventListener('resize', () => {
      this.windowHeight = window.innerHeight
    })
    this.fabTimeout = setTimeout(
      () => (this.isCursorVisible = false),
      this.movementTimer
    )
    this.getDashboard()
      .then(() => this.fetchTiles())
      .then(() => this.checkEditStatus())
  },
  methods: {
    async getDashboard () {
      await DashboardsService.getDashboard({
        dashboard_id: this.$route.params.dashboard_id
      }).then((response) => (this.dashboard = response.data))
    },
    async fetchTiles () {
      await TilesService.fetchTiles({
        dashboard_id: this.$route.params.dashboard_id
      }).then((response) => {
        this.tiles = response.data.tiles
        this.layout = getLayout(this.tiles)
      })
    },
    async getTile (tileId) {
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
        dashboard_id: this.$route.params.dashboard_id,
        layout: {
          width: getTileWidth(this.dashboard.columns),
          height: getTileHeight(this.dashboard.rows),
          x: 0,
          y: 0
        }
      }).then(() => this.fetchTiles())
    },
    updateAllTileLayouts (newLayout) {
      newLayout.forEach(tile => {
        this.updateTileLayout(tile.i, tile.h, tile.w, tile.x, tile.y)
      })
    },
    updateTileLayout (i, newHeight, newWidth, newX, newY) {
      const tile = this.tiles[i]
      const newTile = {
        ...tile,
        tile_id: tile._id,
        layout: {
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight
        }
      }
      this.updateTile(newTile)
    },
    async updateTile (newTile) {
      await TilesService.updateTile(newTile).then(() => this.getTile(newTile.tile_id))
    },
    updateTimer () {
      this.isCursorVisible = true
      clearTimeout(this.movementTimeout)
      this.movementTimeout = setTimeout(
        () => (this.isCursorVisible = false),
        this.movementTimer
      )
    },
    checkEditStatus (route = this.$route) {
      if (this.editTile) {
        this.openEditView()
      } else if (this.isEditView) {
        this.closeEditView()
      }
    },
    openEditView (tile = this.editTile) {
      router.push({
        path: `/dashboards/${this.dashboard._id}/tiles/${tile._id}/edit`,
        query: { ...this.$route.query }
      })
      // this.isOptionsView = false
      this.isEditView = true
    },
    closeEditView () {
      router.push({
        path: `/dashboards/${this.dashboard._id}/view`
      })
      // this.isOptionsView = true // Clicking the modal tile will toggle the edit view
      this.isEditView = false
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
    },
    editTile () {
      return (this.$route.params)
        ? this.tiles.find(tile => this.$route.params.tile_id === tile._id) : null
    }
  },
  watch: {
    $route (to, from) {
      this.checkEditStatus(to)
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
    .grid-item {
      .drag {
        position: absolute;
        top: 0px;
        left: 0px;
        margin: 10px;
        width: 10px;
        height: 10px;
        border-radius: 100%;
        z-index: 1001;
        background: color('background');
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      &:hover > .drag {
        opacity: 0.3;
      }
    }
  }
</style>

<style lang="scss">
  // Unscoped style for vue-grid

  .vue-grid-item.vue-grid-placeholder {
    background: #42b983;
  }
  .grid-item {
    .vue-resizable-handle {
      transform: scale(1.5);
      margin: 7px;
      height: 10px;
      width: 10px;
      opacity: 0;
      z-index: 10;
      transition: opacity 0.3s ease;
      color: color('background');
    }
    &:hover > .vue-resizable-handle {
      opacity: 0.5;
    }
  }
</style>
