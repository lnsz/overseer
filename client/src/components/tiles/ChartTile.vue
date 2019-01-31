<template>
  <div class="chart-tile">
    <PieChart
      class="chart"
      :chartdata="tile.chart.data"
      :textcolor="tile.style.textColor"
    />
  </div>
</template>

<script>
import PieChart from '@/components/charts/PieChart'

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
