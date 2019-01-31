<template>
  <div
    class="tile"
    :style="tileStyle"
    @click="openEditView"
  >
    <EditTile
      v-if="isEditTile"
      :tile="tile"
      @save="saveTile"
    />
    <StatusTile
      v-else-if="tile.type === 'status'"
      :tile="tile"
    />
    <IFrameTile
      v-else-if="tile.type === 'iframe'"
      :tile="tile"
      :zoomLevel="zoomLevel"
      @test="openEditView"
    />
    <ChartTile
      v-else-if="tile.type === 'piechart'"
      :tile="tile"
    />
  </div>
</template>

<script>
import ChartTile from '@/components/tiles/ChartTile'
import EditTile from '@/components/tiles/EditTile'
import IFrameTile from '@/components/tiles/IFrameTile'
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
      isEditView: false
    }
  },
  components: {
    ChartTile,
    EditTile,
    IFrameTile,
    StatusTile
  },
  methods: {
    openEditView () {
      this.isEditView = true
    },
    saveTile (event) {
      setTimeout(() => {
        this.isEditView = false
        this.$emit('refresh', event)
      }, 50)
    }
  },
  computed: {
    isEditTile () {
      return this.isEditView || !this.tile.type
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
