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
      @edit="$emit('edit', tile)"
    />
    <StatusTile
      v-if="tile.type === 'status'"
      :tile="tile"
    />
    <IFrameTile
      v-else-if="tile.type === 'iframe'"
      :tile="tile"
      :columns="columns"
    />
    <ImageTile
      v-else-if="tile.type === 'image'"
      :tile="tile"
      :columns="columns"
    />
    <ChartTile
      v-else-if="tile.type === 'piechart'"
      :tile="tile"
    />
  </div>
</template>

<script>
import TilesService from '@/services/TilesService'

import ChartTile from '@/components/tiles/ChartTile'
import TileOptions from '@/components/tiles/TileOptions'
import IFrameTile from '@/components/tiles/IFrameTile'
import ImageTile from '@/components/tiles/ImageTile'
import StatusTile from '@/components/tiles/StatusTile'
import { backgroundCSS, textCSS } from '@/utils/styleUtils'

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
      isOptionsView: false
    }
  },
  components: {
    ChartTile,
    IFrameTile,
    ImageTile,
    StatusTile,
    TileOptions
  },
  methods: {
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
    emitRefresh () {
      // Short timeout to force update
      setTimeout(() => this.$emit('refresh'), 10)
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
