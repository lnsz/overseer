<template>
  <div class="iframe-tile">
    <iframe
      class="iframe"
      scrolling="no"
      frameborder="0"
      :src="tile.url"
      :style="iframeStyle"
    />
    <div class="edit" />
  </div>
</template>

<script>
import { iframeCSS } from '@/utils/styleHelper'

export default {
  name: 'IFrameTile',
  props: {
    tile: {
      type: Object,
      default: () => {}
    },
    zoomLevel: {
      type: Number,
      default: 1
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
    .iframe {
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
