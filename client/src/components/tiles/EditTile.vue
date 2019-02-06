<template>
  <div class="edit-tile">
    <div class="tile-settings">
      <div class="top-bar">
        <TabBar :tabs="tabs" />
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
      </div>
      <div class="tile-options">
        <div v-if="currentTab === 'general'">
          <div class="input-wrapper">
            Name
            <input
              v-model="name"
              placeholder="Name"
              class="input-box"
            />
          </div>
          <div class="input-wrapper">
            URL
            <input
              v-model="url"
              placeholder="URL"
              class="input-box"
            />
          </div>
          <div class="input-wrapper">
            Description
            <input
              v-model="description"
              placeholder="Description"
              class="input-box"
            />
          </div>
        </div>
        <div v-else-if="currentTab === 'colors'">
          <div class="input-wrapper">
            Style
            <input
              v-model="style"
              placeholder="Style"
              class="input-box"
            />
          </div>
        </div>
        <div v-else-if="currentTab === 'status'">
          <div class="input-wrapper">
            State
            <input
              v-model="state"
              placeholder="State"
              class="input-box"
            />
          </div>
        </div>
        <div v-else-if="currentTab === 'chart'">
          <div class="input-wrapper chart-data-wrapper header">
            <div class="header-item">Label</div>
            <div class="header-item">Color</div>
            <div class="header-item">Value</div>
          </div>
          <div :key="index" v-for="(data, index) in chartData">
            <div :key="index" class="input-wrapper">
              <div class="chart-data-item" :key="dataKey" v-for="(dataValue, dataKey) in chartData[index]">
                <input
                  v-model="chartData[index][dataKey]"
                  :placeholder="dataKey"
                  class="input-box chart-data-box"
                >
              </div>
              <button
                class="button remove-data"
                @click="removeData(index)"
              >
                <font-awesome-icon
                  class="icon"
                  icon="minus"
                />
              </button>
            </div>
          </div>
          <div class="add-data-wrapper">
            <button
              class="button add-data"
              @click="addData"
            >
              <font-awesome-icon
                class="icon"
                icon="plus"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="save-wrapper">
      <div
        class="button save"
        @click="saveTile"
      >
        Save
      </div>
    </div>
  </div>
</template>

<script>
import TilesService from '@/services/TilesService'

import TabBar from '@/components/TabBar'

export default {
  name: 'EditTile',
  props: {
    tile: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    TabBar
  },
  data () {
    return {
      name: '',
      url: '',
      description: '',
      type: '',
      state: '',
      style: '',
      chartData: {}
    }
  },
  mounted () {
    this.name = this.tile.name
    this.url = this.tile.url
    this.description = this.tile.description
    this.type = this.tile.type
    this.state = this.getState
    this.style = this.getStyle
    this.chartData = this.tile.chart.data.map(x => {
      return { ...x }
    })
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
        chart: { data: this.chartData }
      }).then(() => this.$emit('save', event))
    },
    addData () {
      this.chartData.push({'label': '', 'backgroundColor': '', 'value': ''})
    },
    removeData (index) {
      this.chartData.splice(index)
    }
  },
  computed: {
    getState () {
      return this.tile.status ? this.tile.status.state : ''
    },
    getStyle () {
      return this.tile.style ? JSON.stringify(this.tile.style) : '{}'
    },
    tabs () {
      switch (this.type) {
        case 'status':
          return ['General', 'Status', 'Colors', 'Other']
        case 'piechart':
          return ['General', 'Chart', 'Colors', 'Other']
        default:
          return ['General', 'Other']
      }
    },
    currentTab () {
      return this.$route.query.tab
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/colors";
  @import "../../assets/styles/functions";

  .button {
    margin-bottom: 10px;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;
    text-shadow: 0 1px 2px rgba(236, 204, 204, 0.5);
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
  .button:hover {
    transform: translateY(-1px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    background-color: shade(color('green'), 20%);
  }
  .button:active {
    transform: translateY(1px);
    box-shadow: none;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  }
  .edit-tile {
    cursor: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: space-between;
    .top-bar {
      display: flex;
      justify-content: space-between;
      .select-wrapper {
        line-height: 39px;
        display: flex;
        justify-content: center;
        margin: 2px 0 5px 0;
        .select-box {
          font-size: 16px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
          padding: 8px;
          border-radius: 3px;
          color: color('text');
          transition: all 0.2s ease;
          background: color('background');
          border: 1px solid color('foreground');
          margin-left: 10px;
        }
      }
    }
    .tile-settings {
      flex: 1 1 auto;
      flex-direction: column;
      display: flex;
      .tile-options {
        border-radius: 0px 3px 3px 3px;
        flex: 1 1 auto;
        border: 1px solid color('green');
        margin-bottom:  10px;
        .input-wrapper {
          display: flex;
          justify-content: space-between;
          margin: 20px 20px 0 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid color('foreground');
          line-height: 28px;
          .input-box {
            width: 30%;
            margin-left: 20px;
            font-size: 16px;
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
          .chart-data-item {
            width: 100%;
            display: flex;
            justify-content: center;
            .chart-data-box {
              width: 80%;
              margin: 0;
            }
          }
         .remove-data {
            margin-bottom: 0px;
            font-size: 12px;
            background-color: color('red');
          }
          .remove-data:hover {
            background-color: shade(color('red'), 20%);
          }
        }
        .chart-data-wrapper {
          padding: 0px;
        }
        .header {
          padding-right: 40px;
          .header-item {
            width: 100%;
            text-align: center;
          }
        }
        .add-data-wrapper {
          padding-top: 10px;
          display: flex;
          justify-content: center;
          flex-direction: row;
        }
      }
    }
    .save-wrapper {
      display: flex;
      justify-content: center;
      flex-direction: row;
    }
  }

</style>
