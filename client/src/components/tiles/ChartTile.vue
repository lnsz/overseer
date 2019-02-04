<template>
  <div class="chart-tile">
    <PieChart
      class="chart"
      :data="chartData"
      :textcolor="textColor"
    />
  </div>
</template>

<script>
import PieChart from '@/components/charts/PieChart'

import { getChartData } from '@/utils/chartHelper'

export default {
  name: 'ChartTile',
  props: {
    tile: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    PieChart
  },
  computed: {
    lastUpdated () {
      return Math.floor((Date.now() - new Date(this.tile.updated)) / 60000)
    },
    textColor () {
      return this.tile.style && this.tile.style.textColor
    },
    chartData () {
      return getChartData(this.tile.chart.data)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/colors";
  @import "../../assets/styles/functions";

  .chart-tile {
    width: 100%;
    height: 100%;
    .chart {
      height: 100%;
      position: relative;
    }
  }

</style>
