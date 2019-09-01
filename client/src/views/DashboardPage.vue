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
      :row-height="rowHeight"
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
        :drag-allow-from="'.tile'"
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
      :to="{ query: { tab: 'best' }, name: 'Dashboards' }"
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

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import strings from '../shared/constants/strings'
  import { UserApi, DashboardApi, TileApi } from '../api'
  import VueGridLayout from 'vue-grid-layout'
  import { StyleHelper, GridHelper } from '../shared/helpers'
  import { Dashboard, FabData } from '../types'
    // import EditTile from '@/components/tiles/EditTile.vue'
  import EditDashboard from '@/components/EditDashboard.vue'
  import BaseTile from '@/components/tiles/BaseTile.vue'
  import Modal from '@/components/Modal.vue'
  import Fab from '@/components/Fab.vue'

  @Component({
    components: {
      BaseTile,
      // EditTile,
      EditDashboard,
      Fab,
      Modal,
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem
    }
  })
  export default class DashboardPage extends Vue {
    // Data
    private dashboard: Dashboard = {} as any
    private tiles = []
    private isTileEditView = false
    private isDashboardEditView = false
    private movementTimer = 3000
    private movementTimeout = null
    private refreshTimeout = null
    private isCursorVisible = true
    private isHoveringButton = false
    private layout = []
    private gridValues = GridHelper.GRID_VALUES
    private rowHeight = GridHelper.getRowHeight()

    // Mounted
    private async mounted(): Promise<void> {
      // Set new row height on resize
      this.rowHeight = GridHelper.getRowHeight()
      window.addEventListener('resize', () => {
        this.rowHeight = GridHelper.getRowHeight()
      })

      // Update dashboard
      await this.getDashboard()
      await this.fetchTiles()
      this.checkEditStatus()
      if (this.dashboard.refreshTimer) {
        setInterval(this.fetchTiles, this.dashboard.refreshTimer * 60000)
      }
    }

    // Methods
    private async getDashboard(): Promise<void> {
      try {
        const res = await DashboardApi.getDashboard({
          dashboard_id: this.$route.params.dashboard_id
        })
        this.dashboard = res.data
        if (this.dashboard) {
          document.title = this.dashboard.name
        } else {
          this.$router.replace({ name: '404' })
        }
      } catch (e) {
        this.$router.replace({ name: '404' })
      }
    }

    private async fetchTiles(): Promise<void> {
      const res = await TileApi.fetchTiles({
        dashboard_id: this.$route.params.dashboard_id
      })
      const data = await res.data
      if (data) {
        this.tiles = data.tiles
        this.layout = GridHelper.getLayout(this.tiles)
      }
    }

    private async deleteDashboard(): Promise<void> {
      await DashboardApi.deleteDashboard({ dashboard_id: this.dashboard._id })
      this.$router.push({ name: 'Dashboards', query: { tab: 'best' }})
    }

    private async getTile(tileId: string): Promise<void> {
      const res = await TileApi.getTile({
        dashboard_id: this.$route.params.dashboard_id,
        tile_id: tileId
      })
      // Hack to force an update only on one tile
      const tileIndex = this.tiles.findIndex((tile) => tile._id === tileId)
      this.tiles.splice(tileIndex, 1)
      this.tiles.splice(tileIndex, 0, res.data)
    }

    private async createTile(): Promise<void> {
      await TileApi.createTile({
        dashboard_id: this.$route.params.dashboard_id,
        layout: {
          width: GridHelper.getTileWidth(this.dashboardLayout.columns),
          height: GridHelper.getTileHeight(this.dashboardLayout.rows),
          x: 0,
          y: 0
        }
      })
      this.fetchTiles()
    }

    private async toggleLock(): Promise<void> {
      this.dashboard.locked = !this.dashboard.locked
      await DashboardApi.updateDashboard({
        dashboard_id: this.dashboard._id,
        locked: this.dashboard.locked
      })
    }

    private updateAllTileLayouts(newLayout: any): void {
      newLayout.forEach((tile) => {
        this.updateTileLayout(tile.i, tile.h, tile.w, tile.x, tile.y)
      })
    }

    private updateTileLayout(i: number, newHeight: number, newWidth: number, newX: number, newY: number): void {
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
    }

    private async updateTile(newTile: any): Promise<void> {
      await TileApi.updateTile(newTile)
      this.getTile(newTile.tile_id)
    }

    private async updateDashboard(newDashboard: Dashboard): Promise<void> {
      await DashboardApi.updateDashboard(newDashboard)
      this.getDashboard()
    }

    private updateTimer(): void {
      this.isCursorVisible = true
      clearTimeout(this.movementTimeout)
      clearTimeout(this.refreshTimeout)
      this.movementTimeout = setTimeout(
        () => {
          this.isCursorVisible = this.isHoveringButton
        },
        this.movementTimer
      )
    }

    private checkEditStatus(route = this.$route): void {
      if (this.editTile) {
        this.isTileEditView = true
      } else if (this.isTileEditView) {
        this.isTileEditView = false
      } else if (this.editDashboard) {
        this.isDashboardEditView = true
      } else if (this.isDashboardEditView) {
        this.isDashboardEditView = false
      }
    }

    private openTileEditView(tile = this.editTile): void {
      this.$router.push({
        path: `/dashboards/${this.dashboard._id}/tiles/${tile._id}/edit`,
        params: { dashboard_id: this.dashboard._id, tile_id: tile._id },
        query: { ...this.$route.query }
      })
      this.isTileEditView = true
    }

    private closeTileEditView(): void {
      this.$router.push({
        path: `/dashboards/${this.dashboard._id}/view`
      })
      this.isTileEditView = false
    }

    private openDashboardEditView(): void {
      this.$router.push({
        path: `/dashboards/${this.dashboard._id}/edit`,
        query: { ...this.$route.query }
      })
      this.isDashboardEditView = true
    }

    private closeDashboardEditView(): void {
      this.$router.push({
        path: `/dashboards/${this.dashboard._id}/view`
      })
      this.isDashboardEditView = false
    }

    private setHovering(value: boolean): void {
      this.isHoveringButton = value
    }

    // Computed
    get dashboardStyle(): any {
      return this.dashboard.style || {}
    }

    get dashboardLayout(): any {
      return this.dashboard.layout || {}
    }

    get freePlacement(): boolean {
      return (this.dashboardLayout.freePlacement != null && this.dashboardLayout.freePlacement)
    }

    get margin(): number[] {
      const marginX = this.dashboardLayout && this.dashboardLayout.marginX != null ? this.dashboardLayout.marginX : 0
      const marginY = this.dashboardLayout && this.dashboardLayout.marginY != null ? this.dashboardLayout.marginY : 0
      return [marginX, marginY]
    }

    get background(): any {
      return StyleHelper.backgroundCSS(this.dashboardStyle.backgroundColor)
    }

    get editTile(): any {
      return (this.$route.params)
        ? this.tiles.find((tile) => this.$route.params.tile_id === tile._id) : ''
    }

    get editDashboard(): boolean {
      return this.$route.path.includes('edit')
    }

    get isButtonVisible(): boolean {
      return this.isCursorVisible || this.isDashboardEditView || this.isTileEditView
    }

    get fabButtons(): FabData[] {
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
    }

    get canUserEdit(): boolean {
      if (!this.dashboard.permissions) { return true }
      if (!this.$store.state.user && this.dashboard.creator === 'Guest') { return true }
      if (!this.$store.state.user) { return false }
      const userPermissions = this.dashboard.permissions.users.find((user) => user.username === this.$store.state.user)
      return userPermissions && (userPermissions.role === 'editor' || userPermissions.role === 'admin')
    }

    get locked(): boolean {
      return this.dashboard.locked || !this.canUserEdit
    }

    get route(): any {
      return this.$route
    }

    // Watchers
    @Watch('route')
    private onRouteChanged(to, from) {
      this.checkEditStatus(to)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

  .dashboard {
    position: relative;
    display: grid;
    width: 100%;
    min-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: bgColor('default');
    &.hide-cursor {
      cursor: none;
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
      transform: scale(2);
      margin: 8px;
      height: 10px;
      width: 10px;
      opacity: 0;
      z-index: 1001;
      transition: opacity 0.3s ease;
    }
    &:hover > .vue-resizable-handle {
      opacity: 0.5;
    }
  }
</style>