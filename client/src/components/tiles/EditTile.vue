<template>
  <div class="edit-tile">
    <div class="tile-settings">
      <div class="top-bar">
        <TabBar v-if="tabs" :tabs="tabs" />
        <div class="select-wrapper">
          Type:
          <select
            v-model="type"
            class="select-box"
          >
            <option>status</option>
            <option>iframe</option>
            <option>image</option>
            <option>piechart</option>
            <option>text</option>
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
            Background Color
            <input
              v-model="backgroundColor"
              placeholder="Background Color"
              class="input-box"
            />
          </div>
          <div class="input-wrapper">
            Text Color
            <input
              v-model="textColor"
              placeholder="Text Color"
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
          <div
            v-for="(data, index) in chartData"
            :key="index"
            class="input-wrapper"
          >
            <div
              v-for="(dataValue, dataKey) in chartData[index]"
              :key="dataKey"
              class="chart-data-item"
            >
              <input
                v-model="chartData[index][dataKey]"
                :placeholder="dataKey"
                class="input-box chart-data-box"
              >
            </div>
            <ActionButton
              @click="removeData(index)"
              color="red"
              size="small"
            >
              <font-awesome-icon
                class="icon"
                icon="minus"
              />
            </ActionButton>

          </div>
          <div class="add-data-wrapper">
            <ActionButton @click="addData">
              <font-awesome-icon
                class="icon"
                icon="plus"
              />
            </ActionButton>
          </div>
        </div>
        <div v-else-if="currentTab === 'iframe'">
          <div class="input-wrapper">
            Scrollable?
            <input
              v-model="scrollable"
              type="checkbox"
              placeholder="Scrollable?"
              class="input-box"
            />
          </div>
        </div>
      </div>
    </div>
    <ActionButton @click="saveTile" text="Save" />
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
import ActionButton from '@/components/ActionButton'

export default {
  name: 'EditTile',
  props: {
    tile: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    ActionButton,
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
      backgroundColor: '',
      textColor: '',
      chartData: [],
      scrollLock: false
    }
  },
  mounted () {
    this.name = this.tile.name
    this.url = this.tile.url
    this.description = this.tile.description
    this.type = this.tile.type
    this.state = this.tile.status ? this.tile.status.state : ''
    if (this.tile.style) {
      this.backgroundColor = this.tile.style.backgroundColor
      this.textColor = this.tile.style.textColor
    }
    this.chartData = this.tile.chart ? this.tile.chart.data.map(x => {
      return { ...x }
    }) : []
    this.scrollable = this.tile.iframe.scrollable
  },
  methods: {
    saveTile () {
      const newTile = {
        dashboard_id: this.$route.params.dashboard_id,
        tile_id: this.tile._id,
        name: this.name,
        url: this.url,
        description: this.description,
        type: this.type,
        status: {
          state: this.state
        },
        style: {
          backgroundColor: this.backgroundColor,
          textColor: this.textColor
        },
        chart: {
          data: this.chartData
        },
        iframe: {
          scrollable: this.scrollable
        }
      }
      this.$emit('update-tile', newTile)
      this.$emit('close')
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
    tabs () {
      switch (this.type) {
        case 'status':
          return ['general', 'status', 'colors', 'other']
        case 'piechart':
          return ['general', 'chart', 'colors', 'other']
        case 'iframe':
          return ['general', 'colors', 'iFrame', 'other']
      }
      return ['general', 'colors', 'other']
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

  .icon {
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
  }
  .edit-tile {
    color: color('text');
    cursor: auto;
    width: 60vw;
    height: 80vh;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: space-between;
    .top-bar {
      display: flex;
      min-height: 46px;
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
        overflow-y: auto;
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
            width: 50%;
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
          padding: 10px 40px 0 0;
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
