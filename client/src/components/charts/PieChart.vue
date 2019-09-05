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
    },
    fontColor: {
      type: String,
      default: 'white'
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    renderPieChart () {
      let options = {
        title: {
          display: this.title,
          text: this.title,
          fontColor: this.fontColor
        },
        legend: {
          labels: {
            fontColor: this.fontColor
          }
        },
        ...this.options
      }
      Chart.defaults.global.defaultFontColor = this.textColor ? this.textColor : 'white'
      this.renderChart(this.data, {
        ...options,
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
