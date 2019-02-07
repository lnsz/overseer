<template>
  <div class="iframe-tile">
    <transition name="fade">
      <div
        class="zoom-button plus"
        @click.stop="zoomOut"
      >
        <font-awesome-icon
          class="icon"
          icon="plus"
        />
      </div>
    </transition>
    <div
      class="zoom-button minus"
      @click.stop="zoomIn"
    >
      <font-awesome-icon
        class="icon"
        icon="minus"
      />
    </div>
    <img
      class="image"
      :src="tile.url"
      :style="iframeStyle"
    />
    <div class="edit" />
  </div>
</template>

<script>
import { iframeCSS } from '@/utils/styleUtils'

export default {
  name: 'ImageTile',
  props: {
    tile: {
      type: Object,
      default: () => {}
    },
    columns: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      zoomLevel: this.tile.iframe ? this.tile.iframe.zoomLevel : this.columns
    }
  },
  methods: {
    updateZoomLevel () {
      const newTile = {
        dashboard_id: this.$route.params.dashboard_id,
        tile_id: this.tile._id,
        iframe: {
          ...this.tile.iframe,
          zoomLevel: this.zoomLevel
        }
      }
      this.$parent.$emit('update-tile', newTile)
    },
    zoomIn () {
      this.zoomLevel += 0.25
      this.updateZoomLevel()
    },
    zoomOut () {
      this.zoomLevel -= 0.25
      this.updateZoomLevel()
    }
  },
  computed: {
    iframe () {
      return iframeCSS(this.zoomLevel)
    },
    iframeStyle () {
      return {
        ...this.iframe
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/colors";
  @import "../../assets/styles/functions";

  .iframe-tile {
    width: 100%;
    height: 100%;
    position: relative;
    &:hover > .zoom-button {
      opacity: 1;
    }
    .zoom-button {
      opacity: 0;
      box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
      font-family: 'Roboto', sans-serif;
      letter-spacing: 1px;
      text-shadow: 0 1px 2px rgba(236, 204, 204, 0.5);
      transition: opacity 0.3s ease;
      transition: background-color transform 0.2s ease;
      cursor: pointer;
      padding: 8px;
      font-size: 14px;
      border: none;
      text-decoration: none;
      border-radius: 100%;
      background-color: color('foreground');
      color: color('text');
      position: absolute;
      z-index: 1000;
      &.plus {
       right: 5px;
       top: 5px;
      }
      &.minus {
       right: 5px;
       top: 50px;
      }
      &:hover {
        transform: translateY(-1px);
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
        background-color: shade(color('foreground'), 20%);
      }
      &:active {
        transform: translateY(1px);
        box-shadow: none;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }
    }
    .image {
      outline: none;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    .edit {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

</style>
