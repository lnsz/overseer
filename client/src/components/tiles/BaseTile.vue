<template>
  <div
    class="tile"
    :style="tileStyle"
    @click="toggleOptionsView"
  >
    <TileOptions
      v-if="isOptionsTile"
      :tile="tile"
      @refresh="refresh"
      @edit="toggleEditView"
    />
    <StatusTile
      v-if="tile.type === 'status'"
      :tile="tile"
    />
    <IFrameTile
      v-else-if="tile.type === 'iframe'"
      :tile="tile"
      :zoomLevel="zoomLevel"
    />
    <ChartTile
      v-else-if="tile.type === 'piechart'"
      :tile="tile"
    />
    <Modal
      v-if="isEditView"
      @close="toggleEditView"
    >
      <EditTile
        :tile="tile"
        @save="saveTile"
      />
    </Modal>
  </div>
</template>

<script>
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
  components: {
    ChartTile,
    EditTile,
    IFrameTile,
    Modal,
    StatusTile,
    TileOptions
  },
  methods: {
    toggleOptionsView () {
      this.isOptionsView = !this.isOptionsView
    },
    toggleEditView () {
      this.isOptionsView = this.isEditView
      this.isEditView = !this.isEditView
    },
    refresh () {
      setTimeout(() => {
        this.$emit('refresh')
      }, 50)
    },
    saveTile () {
      this.isEditView = false
      this.isOptionsView = false
      this.refresh()
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
    },
    zoomLevel () {
      return this.tile.zoomLevel ? this.tile.zoomLevel : this.columns
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/colors";
  @import "../../assets/styles/functions";

  .tile {
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
