<script>
import Chart from 'chart.js'
import { Pie } from 'vue-chartjs'
export default {
  extends: Pie,
  props: {
    chartdata: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    Chart.defaults.global.defaultFontColor = this.textColor ? this.textColor : 'white'
    this.renderChart(this.chartdata, {responsive: true, maintainAspectRatio: false})
  }
}
</script>

<style>
</style>
