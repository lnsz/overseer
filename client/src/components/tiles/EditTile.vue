<template>
  <div class="edit-tile">
    <div>
      <div class="select-wrapper">
        Type:
        <select
          v-model="type"
          class="select-box"
        >
          <option>status</option>
          <option>iframe</option>
          <option>piechart</option>
        </select>
      </div>
      <div class="input-wrapper">
        <input
          v-model="name"
          placeholder="Name"
          class="input-box"
        />
      </div>
      <div class="input-wrapper">
        <input
          v-model="url"
          placeholder="URL"
          class="input-box"
        />
      </div>
      <div class="input-wrapper">
        <input
          v-model="description"
          placeholder="Description"
          class="input-box"
        />
      </div>
      <div class="input-wrapper">
        <input
          v-model="style"
          placeholder="Style"
          class="input-box"
        />
      </div>
      <div class="input-wrapper" v-if="type === 'status'">
        <input
          v-model="state"
          placeholder="State"
          class="input-box"
        />
      </div>
      <div class="input-wrapper" v-if="type === 'piechart'">
        <input
          v-model="chartData"
          placeholder="Chart Data"
          class="input-box"
        />
      </div>
    </div>
    <div class="save-button-wrapper">
      <div
        class="save-button"
        @click="saveTile"
      >
        Save
      </div>
    </div>
  </div>
</template>

<script>
import TilesService from '@/services/TilesService'

export default {
  name: 'EditTile',
  props: {
    tile: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      name: this.tile.name,
      url: this.tile.url,
      description: this.tile.description,
      type: this.tile.type,
      state: this.tile.state,
      style: '',
      chartData: this.getChartData
    }
  },
  mounted () {
    this.chartData = this.getChartData
    this.style = this.getStyle
    this.state = this.getState
  },
  methods: {
    async saveTile (event) {
      await TilesService.updateTile({
        dashboard_id: this.$route.params.dashboard_id,
        tile_id: this.tile._id,
        name: this.name,
        url: this.url,
        description: this.description,
        type: this.type,
        status: { state: this.state },
        style: JSON.parse(this.style),
        chart: { data: JSON.parse(this.chartData) }
      }).then(() => this.$emit('save', event))
    }
  },
  computed: {
    getChartData () {
      return this.tile.chart && this.tile.chart.data
    },
    getState () {
      return this.tile.status ? this.tile.status.state : ''
    },
    getStyle () {
      return this.tile.style ? JSON.stringify(this.tile.style) : '{}'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/colors";
  @import "../../assets/styles/functions";

  .edit-tile {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .select-wrapper {
      line-height: 30px;
      display: flex;
      justify-content: center;
      margin: 20px 0 15px 0;
      .select-box {
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        padding: 5px;
        border-radius: 3px;
        color: color('text');
        transition: all 0.2s ease;
        background: color('background');
        background: color('background');
        margin-left: 10px;
      }
    }
    .input-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 8px;
      .input-box {
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        font-family: 'Roboto', sans-serif;
        transition: all 0.2s ease;
        color: color('text');
        background: color('background');
        border: 1px solid color('foreground');
        padding: 5px;
        border-radius: 3px;
        text-align: center;
        &:focus {
          border: 1px solid color('green');
        }
      }
    }
    .save-button-wrapper {
      display: flex;
      justify-content: center;
      flex-direction: row;
      .save-button {
        margin-bottom: 10px;
        box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
        font-family: 'Roboto', sans-serif;
        letter-spacing: 1px;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        transition: all 0.2s ease;
        cursor: pointer;
        padding: 8px 15px 8px 15px;
        font-size: 20px;
        border: none;
        text-decoration: none;
        border-radius: 3px;
        background-color: color('green');
        color: color('text');
      }
      .save-button:hover {
        transform: translateY(-1px);
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
        background-color: shade(color('green'), 20%);
      }
      .save-button:active {
        transform: translateY(1px);
        box-shadow: none;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
      }
    }
  }

</style>
