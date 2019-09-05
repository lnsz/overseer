<template>
  <div class="chart-tile">
    <PieChart
      v-if="tile.type === 'piechart'"
      class="chart"
      :title="tile.name"
      :data="chartData"
      :fontColor="fontColor"
    />
    <LineChart
      v-else-if="tile.type === 'linechart'"
      class="chart"
      :title="tile.name"
      :data="chartData"
      :fontColor="fontColor"
    />
    <BarChart
      v-else-if="tile.type === 'barchart'"
      class="chart"
      :title="tile.name"
      :data="chartData"
      :fontColor="fontColor"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import PieChart from '@/components/charts/PieChart.vue'
  import BarChart from '@/components/charts/BarChart.vue'
  import LineChart from '@/components/charts/LineChart.vue'
  import { ChartHelper } from '../../shared/helpers'

  @Component({
    components: {
      PieChart,
      LineChart,
      BarChart
    }
  })
  export default class PieChartTile extends Vue {
    // Props
    @Prop({ default: {} })
    private tile: any

    // Computed
    get lastUpdated(): number {
      return Math.floor((Date.now() - new Date(this.tile.updated)) / 60000)
    }

    get fontColor(): string {
      return this.tile.style && this.tile.style.font && this.tile.style.font.color || 'white'
    }

    get chartData(): any {
      return ChartHelper.getChartData(this.tile.chart.data)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../shared/styles/functions";

  .chart-tile {
    width: 100%;
    height: 100%;
    .chart {
      height: 100%;
      position: relative;
    }
  }
</style>
