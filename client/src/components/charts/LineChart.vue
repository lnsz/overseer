<script>
import Chart from 'chart.js'
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
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
    renderLineChart () {
      let options = {
        title: {
          display: this.title,
          text: this.title,
          fontColor: this.fontColor
        },
        legend: {
          display: false,
          labels: {
            fontColor: this.fontColor
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: this.fontColor,
              min: 0
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: this.fontColor
            }
          }]
        },
        ...this.options
      }
      this.renderChart(this.data, {
        ...options,
        responsive: true,
        maintainAspectRatio: false
      })
    }
  },
  mounted () {
    this.renderLineChart()
  },
  watch: {
    data () {
      this.renderLineChart()
    }
  }
}
</script>

<style>
</style>
