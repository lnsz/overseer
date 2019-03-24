<template>
  <div
    class="dashboard"
    :class="{
      'hide-cursor': !isCursorVisible
    }"
    @mousemove="updateTimer"
    @click="updateTimer"
    :style="dashboardStyle"
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
      :vertical-compact="verticalCompact"
      :margin="margin"
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
          :columns="layoutStyle.columns"
          :rows="layoutStyle.rows"
          @edit="openTileEditView"
          @update-tile="updateTile"
          @refresh="fetchTiles"
        />
        <div class="drag" />
      </grid-item>
    </grid-layout>
    <Modal
      v-if="isTileEditView"
      @close="closeTileEditView"
    >
      <EditTile
        :tile="editTile"
        @update-tile="updateTile"
        @close="closeTileEditView"
      />
    </Modal>
    <div
      v-if="isCursorVisible && !isDashboardEditView && !isTileEditView"
    >
      <router-link
        :to="{ query: { tab: 'best' }, name: 'DashboardListPage' }"
        tag="button"
        class="back-button"
      >
        <font-awesome-icon
          class="icon"
          icon="arrow-left"
        />
      </router-link>
    </div>
    <Fab
      :isCursorVisible="isCursorVisible && !isDashboardEditView && !isTileEditView"
      @create-tile="createTile"
      @edit-dashboard="openDashboardEditView"
    />
    <Modal
      v-if="isDashboardEditView"
      @close="closeDashboardEditView"
    >
      <EditDashboard
        :dashboard="dashboard"
        @update-dashboard="updateDashboard"
        @delete-dashboard="deleteDashboard"
        @close="closeDashboardEditView"
      />
    </Modal>
  </div>
</template>

<script>
import router from '@/router'

import DashboardsService from '@/services/DashboardsService'

import VueGridLayout from 'vue-grid-layout'
import TilesService from '@/services/TilesService'
import BaseTile from '@/components/tiles/BaseTile'
import EditTile from '@/components/tiles/EditTile'
import EditDashboard from '@/components/EditDashboard'
import Modal from '@/components/Modal'
import Fab from '@/components/Fab'
import { backgroundCSS } from '@/utils/styleUtils'
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
      isTileEditView: false,
      isDashboardEditView: false,
      movementTimer: 3000,
      movementTimeout: null,
      refreshTimeout: null,
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
    EditDashboard,
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
      () => {
        this.isCursorVisible = false
        this.refresh()
      },
      this.movementTimer
    )
    this.getDashboard()
      .then(() => (document.title = this.dashboard.name))
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
    async deleteDashboard () {
      await DashboardsService.deleteDashboard({ dashboard_id: this.dashboard._id }).then(() => {
        this.$router.push({ name: 'DashboardListPage' })
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
          width: getTileWidth(this.layoutStyle.columns),
          height: getTileHeight(this.layoutStyle.rows),
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
    async updateDashboard (newDashboard) {
      await DashboardsService.updateDashboard(newDashboard).then(() => this.getDashboard())
    },
    refresh () {
      this.refreshTimeout = setTimeout(() => {
        this.fetchTiles()
        this.refresh()
      }, this.dashboard.refreshTimer)
    },
    updateTimer () {
      this.isCursorVisible = true
      clearTimeout(this.movementTimeout)
      clearTimeout(this.refreshTimeout)
      this.movementTimeout = setTimeout(
        () => {
          this.isCursorVisible = false
          this.refresh()
        },
        this.movementTimer
      )
    },
    checkEditStatus (route = this.$route) {
      if (this.editTile) {
        this.isTileEditView = true
      } else if (this.isTileEditView) {
        this.isTileEditView = false
      } else if (this.editDashboard) {
        this.isDashboardEditView = true
      } else if (this.isDashboardEditView) {
        this.isDashboardEditView = false
      }
    },
    openTileEditView (tile = this.editTile) {
      router.push({
        path: `/dashboards/${this.dashboard._id}/tiles/${tile._id}/edit?tab=general`,
        params: { dashboard_id: this.dashboard._id, tile_id: tile._id },
        query: { ...this.$route.query }
      })
      this.isTileEditView = true
    },
    closeTileEditView () {
      router.push({
        path: `/dashboards/${this.dashboard._id}/view`
      })
      this.isTileEditView = false
    },
    openDashboardEditView () {
      router.push({
        path: `/dashboards/${this.dashboard._id}/edit?tab=general`,
        query: { ...this.$route.query }
      })
      this.isDashboardEditView = true
    },
    closeDashboardEditView () {
      router.push({
        path: `/dashboards/${this.dashboard._id}/view`
      })
      this.isDashboardEditView = false
    }
  },
  computed: {
    dashboardStyle () {
      return {
        ...this.background
      }
    },
    colorStyle () {
      return (this.dashboard.style && this.dashboard.style.color) ? this.dashboard.style.color : {}
    },
    layoutStyle () {
      return (this.dashboard.style && this.dashboard.style.layout) ? this.dashboard.style.layout : {}
    },
    verticalCompact () {
      return (this.layoutStyle.verticalCompact != null && this.layoutStyle.verticalCompact)
    },
    margin () {
      const marginX = this.layoutStyle && this.layoutStyle.marginX != null ? this.layoutStyle.marginX : 0
      const marginY = this.layoutStyle && this.layoutStyle.marginY != null ? this.layoutStyle.marginY : 0
      return [marginX, marginY]
    },
    background () {
      return backgroundCSS(this.colorStyle.backgroundColor)
    },
    editTile () {
      return (this.$route.params)
        ? this.tiles.find(tile => this.$route.params.tile_id === tile._id) : null
    },
    editDashboard () {
      return this.$route.path.includes('edit')
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
    .back-button {
      position: absolute;
      top: 25px;
      left: 25px;
      background: transparent;
      border: none;
      color: white;
      font-size: 30px;
      cursor: pointer;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
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
