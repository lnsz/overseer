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
      :row-height="rowHeight(windowHeight)"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :autoSize="false"
      :vertical-compact="!freePlacement"
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
        :isDraggable="!locked"
        :isResizable="!locked"
        :drag-allow-from="'.drag'"
        :resize-ignore-from="'.tile'"
        class="grid-item"
      >
        <BaseTile
          v-if="tiles[item.i]"
          :tile="tiles[item.i]"
          :columns="dashboardLayout.columns"
          :rows="dashboardLayout.rows"
          :locked="locked"
          @edit="openTileEditView"
          @update-tile="updateTile"
          @refresh="fetchTiles"
        />
        <div
          v-if="!locked"
          class="drag"
        />
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
    <router-link
      v-if="isButtonVisible"
      :to="{ query: { tab: 'best' }, name: 'DashboardListPage' }"
      class="back-button"
    >
      <font-awesome-icon
        @mouseover="setHovering(true)"
        @mouseleave="setHovering(false)"
        class="icon"
        icon="arrow-left"
      />
    </router-link>
    <Fab
      v-if="canUserEdit"
      :isVisible="isButtonVisible"
      :locked="locked"
      :buttons="fabButtons"
      @mouse-over="setHovering(true)"
      @mouse-leave="setHovering(false)"
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

import UserService from '@/services/UserService'
import DashboardsService from '@/services/DashboardsService'

import VueGridLayout from 'vue-grid-layout'
import TilesService from '@/services/TilesService'
import BaseTile from '@/components/tiles/BaseTile'
import EditTile from '@/components/tiles/EditTile'
import EditDashboard from '@/components/EditDashboard'
import Modal from '@/components/Modal'
import Fab from '@/components/Fab'

import { goToPage } from '@/utils/routerUtils'
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
      isHoveringButton: false,
      windowHeight: 0,
      layout: [],
      gridValues: gridValues,
      rowHeight: rowHeight,
      user: null
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
        this.isCursorVisible = this.isHoveringButton
        this.refresh()
      },
      this.movementTimer
    )
    this.getDashboard()
      .then(() => {
        if (!this.dashboard) {
          router.replace({ name: '404' })
        }
      })
      .then(() => (document.title = this.dashboard.name))
      .then(() => this.fetchTiles())
      .then(() => this.checkEditStatus())
    this.getUserStatus()
  },
  methods: {
    async getUserStatus () {
      let status = await UserService.getStatus()
      if (status && status.data) this.user = status.data.user
    },
    async getDashboard () {
      let res = await DashboardsService.getDashboard({
        dashboard_id: this.$route.params.dashboard_id
      })
      this.dashboard = res.data
    },
    async fetchTiles () {
      let res = await TilesService.fetchTiles({
        dashboard_id: this.$route.params.dashboard_id
      })
      this.tiles = res.data.tiles
      this.layout = getLayout(this.tiles)
    },
    async deleteDashboard () {
      await DashboardsService.deleteDashboard({ dashboard_id: this.dashboard._id })
      goToPage(this, 'DashboardListPage', { tab: 'best' })
    },
    async getTile (tileId) {
      let res = await TilesService.getTile({
        dashboard_id: this.$route.params.dashboard_id,
        tile_id: tileId
      })
      // Hack to force an update only on one tile
      const tileIndex = this.tiles.findIndex(tile => tile._id === tileId)
      this.tiles.splice(tileIndex, 1)
      this.tiles.splice(tileIndex, 0, res.data)
    },
    async createTile () {
      await TilesService.createTile({
        dashboard_id: this.$route.params.dashboard_id,
        layout: {
          width: getTileWidth(this.dashboardLayout.columns),
          height: getTileHeight(this.dashboardLayout.rows),
          x: 0,
          y: 0
        }
      })
      this.fetchTiles()
    },
    async toggleLock () {
      this.dashboard.locked = !this.dashboard.locked
      await DashboardsService.updateDashboard({
        dashboard_id: this.dashboard._id,
        locked: this.dashboard.locked
      })
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
      await TilesService.updateTile(newTile)
      this.getTile(newTile.tile_id)
    },
    async updateDashboard (newDashboard) {
      await DashboardsService.updateDashboard(newDashboard)
      this.getDashboard()
    },
    refresh () {
      if (this.dashboard.refreshTimer) {
        this.refreshTimeout = setTimeout(() => {
          this.fetchTiles()
          this.refresh()
        }, this.dashboard.refreshTimer * 60000) // Convert minutes to ms
      }
    },
    updateTimer () {
      this.isCursorVisible = true
      clearTimeout(this.movementTimeout)
      clearTimeout(this.refreshTimeout)
      this.movementTimeout = setTimeout(
        () => {
          this.isCursorVisible = this.isHoveringButton
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
        path: `/dashboards/${this.dashboard._id}/tiles/${tile._id}/edit`,
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
        path: `/dashboards/${this.dashboard._id}/edit`,
        query: { ...this.$route.query }
      })
      this.isDashboardEditView = true
    },
    closeDashboardEditView () {
      router.push({
        path: `/dashboards/${this.dashboard._id}/view`
      })
      this.isDashboardEditView = false
    },
    setHovering (value) {
      this.isHoveringButton = value
    }
  },
  computed: {
    dashboardStyle () {
      return this.dashboard.style || {}
    },
    dashboardLayout () {
      return this.dashboard.layout || {}
    },
    freePlacement () {
      return (this.dashboardLayout.freePlacement != null && this.dashboardLayout.freePlacement)
    },
    margin () {
      const marginX = this.dashboardLayout && this.dashboardLayout.marginX != null ? this.dashboardLayout.marginX : 0
      const marginY = this.dashboardLayout && this.dashboardLayout.marginY != null ? this.dashboardLayout.marginY : 0
      return [marginX, marginY]
    },
    background () {
      return backgroundCSS(this.dashboardStyle.backgroundColor)
    },
    editTile () {
      return (this.$route.params)
        ? this.tiles.find(tile => this.$route.params.tile_id === tile._id) : null
    },
    editDashboard () {
      return this.$route.path.includes('edit')
    },
    isButtonVisible () {
      return this.isCursorVisible || this.isDashboardEditView || this.isTileEditView
    },
    fabButtons () {
      return [
        {
          name: this.dashboard.locked ? 'Lock Dashboard' : 'Unlock Dashboard',
          icon: this.dashboard.locked ? 'lock' : 'lock-open',
          click: this.toggleLock
        },
        {
          name: 'Star Dashboard',
          icon: 'star'
        },
        {
          name: 'Copy Dashboard',
          icon: 'copy'
        },
        {
          name: 'Add Tile',
          icon: 'plus',
          click: this.createTile
        },
        {
          name: 'Edit Dashboard',
          icon: 'edit',
          click: this.openDashboardEditView
        }
      ]
    },
    canUserEdit () {
      if (!this.dashboard.permissions) return true
      if (!this.user && this.dashboard.creator === 'Guest') return true
      if (!this.user) return false
      let userPermissions = this.dashboard.permissions.users.find(user => user.username === this.user.username)
      return userPermissions && (userPermissions.role === 'editor' || userPermissions.role === 'admin')
    },
    locked () {
      return this.dashboard.locked || !this.canUserEdit
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
    min-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
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
      position: fixed;
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
