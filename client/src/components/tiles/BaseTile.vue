<template>
  <div
    class="tile"
    :style="tileStyle"
    @click="toggleOptionsView"
  >
    <TileOptions
      v-if="isOptionsTile"
      :tile="tile"
      @delete="deleteTile"
      @copy="copyTile"
      @edit="openEditView"
    />
    <StatusTile
      v-if="tile.type === 'status'"
      :tile="tile"
    />
    <IFrameTile
      v-else-if="tile.type === 'iframe'"
      @update="updateTile"
      :tile="tile"
      :columns="columns"
    />
    <ChartTile
      v-else-if="tile.type === 'piechart'"
      :tile="tile"
    />
    <Modal
      v-if="isEditView"
      @close="closeEditView"
    >
      <EditTile
        :tile="tile"
        @update="updateTile"
      />
    </Modal>
  </div>
</template>

<script>
import router from '@/router'

import TilesService from '@/services/TilesService'

import ChartTile from '@/components/tiles/ChartTile'
import EditTile from '@/components/tiles/EditTile'
import TileOptions from '@/components/tiles/TileOptions'
import IFrameTile from '@/components/tiles/IFrameTile'
import Modal from '@/components/Modal'
import StatusTile from '@/components/tiles/StatusTile'
import { backgroundCSS, textCSS } from '@/utils/styleHelper'

export default {
  name: 'BaseTile',
  props: {
    tile: {
      type: Object,
      default: () => {}
    },
    columns: {
      type: Number,
      default: 1
    },
    rows: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      isOptionsView: false,
      isEditView: false
    }
  },
  mounted () {
    this.checkEditStatus()
  },
  components: {
    ChartTile,
    EditTile,
    IFrameTile,
    Modal,
    StatusTile,
    TileOptions
  },
  methods: {
    async updateTile (newTile) {
      await TilesService.updateTile(newTile).then(() => {
        this.isEditView = false
        this.isOptionsView = false
        this.emitUpdate()
      })
    },
    async copyTile () {
      const { _id, ...newTile } = this.tile
      await TilesService.createTile({
        ...newTile
      }).then(this.emitRefresh())
    },
    async deleteTile () {
      await TilesService.deleteTile({
        dashboard_id: this.tile.dashboard_id,
        tile_id: this.tile._id
      }).then(this.emitRefresh())
    },
    toggleOptionsView () {
      this.isOptionsView = !this.isOptionsView
    },
    checkEditStatus (route = this.$route) {
      if (route.params.tile_id === this.tile._id) {
        this.openEditView()
      } else if (this.isEditView) {
        this.closeEditView()
      }
    },
    openEditView () {
      router.push({
        path: `/dashboards/${this.$route.params.dashboard_id}/tiles/${this.tile._id}/edit`,
        query: { ...this.$route.query }
      })
      this.isOptionsView = false
      this.isEditView = true
    },
    closeEditView () {
      router.push({
        path: `/dashboards/${this.$route.params.dashboard_id}/view`
      })
      this.isOptionsView = true // Clicking the modal tile will toggle the edit view
      this.isEditView = false
    },
    emitRefresh () {
      // Short timeout to force update
      setTimeout(() => this.$emit('refresh'), 10)
    },
    emitUpdate () {
      this.$emit('update', this.tile._id)
    }
  },
  computed: {
    isOptionsTile () {
      return this.isOptionsView || !this.tile.type
    },
    tileStyle () {
      return {
        ...this.background,
        ...this.text
      }
    },
    text () {
      return textCSS(this.textColor)
    },
    background () {
      return backgroundCSS(this.backgroundColor)
    },
    // TODO Backend validation on this
    backgroundColor () {
      return this.tile.style ? this.tile.style.backgroundColor : null
    },
    textColor () {
      return this.tile.style ? this.tile.style.textColor : null
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
  @import "../../assets/styles/colors";
  @import "../../assets/styles/functions";

  .tile {
    user-select: none;
    position: relative;
    cursor: pointer;
    height: calc(100% - 10px);
    width: calc(100% - 10px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    color: color('text');
    margin: 5px;
    background: color('foreground');
    border-radius: 3px;
    overflow: hidden;
  }

</style>
