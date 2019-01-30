<template>
  <div class="tile" :style="tileStyle">
    <div div="tile-type" v-if="tile.type === 'status'">
      <div class="status-bar" v-bind:class="tileState"/>
      <div class="text" :style="textStyle">
        <div class="title">{{tile.name}}</div>
        <div class="url">{{tile.url}}</div>
        <div class="description">{{tile.description}}</div>
      </div>
    </div>
    <div class="tile-type" v-else-if="tile.type === 'iframe'">
      <iframe
        class="iframe"
        v-bind:src="tile.url"
        scrolling="no"
        frameborder="0"
        :style="iframeStyle"
      />
    </div>
    <div class="tile-type" v-else-if="tile.type === 'piechart'">
      <PieChart
        :chartdata="tile.chart.data"
        :styles="{'height': '100%', 'position': 'relative'}"
        :textcolor="tile.style.textColor"
      />
    </div>
  </div>
</template>

<script>
import PieChart from '@/components/charts/PieChart'
import { backgroundCSS, textCSS, iframeCSS } from '@/utils/styleHelper'

export default {
  name: 'Tile',
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
  components: {
    PieChart
  },
  computed: {
    lastUpdated () {
      return Math.floor((Date.now() - new Date(this.tile.updated)) / 60000)
    },
    tileStyle () {
      return {
        ...this.background
      }
    },
    textStyle () {
      return {
        ...this.text
      }
    },
    iframeStyle () {
      return {
        ...this.iframe
      }
    },
    text () {
      return textCSS(this.textColor)
    },
    iframe () {
      return iframeCSS(this.zoomLevel ? this.zoomLevel : this.columns)
    },
    background () {
      return backgroundCSS(this.backgroundColor)
    },
    // TODO Backend validation on this
    backgroundColor () {
      return this.tile.style ? this.tile.style.backgroundColor : null
    },
    zoomLevel () {
      return this.tile.style ? this.tile.style.zoomLevel : null
    },
    textColor () {
      return this.tile.style ? this.tile.style.textColor : null
    },
    tileState () {
      return this.tile.status ? this.tile.status.state : null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .iframe {
    outline: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .tile {
    height: calc(100% - 10px);
    width: calc(100% - 10px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    margin: 5px;
    background: color('foreground');
    border-radius: 3px;
    overflow: hidden;
  }
  .tile-type {
    width: 100%;
    height: 100%;
  }
  .text {
    height: 100%;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    color: color('text');
    padding: 10px 15px 10px 15px;
  }
  .title {
    font-size: 24px;
    letter-spacing: 1px;
    padding-bottom: 5px;
    border-bottom: 1px solid color('background');
  }
  .url {
    font-size: 16px;
    padding: 15px 0 10px 0;
  }
  .description {
    font-size: 14px;
    font-weight: 300;
  }
  .status-bar {
    width: 100%;
    height: 15px;
  }
  .online {
    background: color('green');
  }
  .online ~ .title {
    border-bottom: 1px solid color('green');
  }
  .offline {
    background: color('red');
  }
  .offline ~ .title {
    border-bottom: 1px solid color('red');
  }
</style>
