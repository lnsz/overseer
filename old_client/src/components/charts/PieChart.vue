<script>
import Chart from 'chart.js'
import { Pie } from 'vue-chartjs'
export default {
  extends: Pie,
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    renderPieChart () {
      Chart.defaults.global.defaultFontColor = this.textColor ? this.textColor : 'white'
      this.renderChart(this.data, {
        ...this.options,
        responsive: true,
        maintainAspectRatio: false
      })
    }
  },
  mounted () {
    this.renderPieChart()
  },
  watch: {
    data () {
      this.renderPieChart()
    }
  }
}
</script>

<style>
</style>
