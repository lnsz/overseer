<template>
  <div
    class="tile"
    :style="tileStyle"
    @click="toggleEditView"
  >
    <transition name="fade">
      <TileOptions
        v-if="isEditTile"
        :tile="tile"
        @refresh="refresh"
      />
    </transition>
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
  </div>
</template>

<script>
import ChartTile from '@/components/tiles/ChartTile'
import TileOptions from '@/components/tiles/TileOptions'
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
    IFrameTile,
    StatusTile,
    TileOptions
  },
  methods: {
    toggleEditView () {
      this.isEditView = !this.isEditView
    },
    refresh (event) {
      setTimeout(() => {
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
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
