<template>
  <div class="edit-tile">
    <div class="tile-settings">
      <div class="top-bar">
        <TabBar :tabs="tabs" />
      </div>
      <div class="tile-options">
        <div v-if="tab === 'general'">
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
          <div class="input-wrapper">
            Refresh Time
            <input
              v-model="refreshTimer"
              type="number"
              placeholder="Refresh Time"
              class="input-box"
            />
          </div>
        </div>
        <div v-else-if="tab === 'colors'">
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
          <div class="input-wrapper">
            Tile Color
            <input
              v-model="tileColor"
              placeholder="Tile Color"
              class="input-box"
            />
          </div>
          <div class="input-wrapper">
            Primary Color
            <input
              v-model="primaryColor"
              placeholder="Primary Color"
              class="input-box"
            />
          </div>
          <div class="input-wrapper">
            Secondary Color
            <input
              v-model="secondaryColor"
              placeholder="Secondary Color"
              class="input-box"
            />
          </div>
        </div>
        <div v-else-if="tab === 'layout'">
          <div class="input-wrapper">
            Rows
            <input
              v-model="rows"
              type="number"
              placeholder="Rows"
              class="input-box"
            />
          </div>
          <div class="input-wrapper">
            Columns
            <input
              v-model="columns"
              type="number"
              placeholder="Columns"
              class="input-box"
            />
          </div>
          <div class="input-wrapper">
            Horizontal Margin
            <input
              v-model="marginX"
              type="number"
              placeholder="Horizontal Margin"
              class="input-box"
            />
          </div>
          <div class="input-wrapper">
            Vertical Margin
            <input
              v-model="marginY"
              type="number"
              placeholder="Vertical Margin"
              class="input-box"
            />
          </div>
          <div class="input-wrapper">
            Compact?
            <input
              v-model="verticalCompact"
              type="checkbox"
              placeholder="Compact?"
              class="input-box"
            />
          </div>
          <div class="input-wrapper">
            Tile Border Radius
            <input
              v-model="tileBorderRadius"
              type="number"
              placeholder="Tile Border Radius"
              class="input-box"
            />
          </div>
        </div>
        <div v-else-if="tab === 'admin'">
          <ActionButton
            @click="deleteDashboard"
            text="Delete"
            color="red"
          />
        </div>
      </div>
    </div>
    <ActionButton @click="saveDashboard" text="Save" />
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
import ActionButton from '@/components/ActionButton'

export default {
  name: 'EditDashboard',
  props: {
    dashboard: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    TabBar,
    ActionButton
  },
  data () {
    return {
      tabs: ['general', 'colors', 'layout', 'admin'],
      name: '',
      url: '',
      description: '',
      backgroundColor: '',
      textColor: '',
      tileColor: '',
      primaryColor: '',
      secondaryColor: '',
      refreshTimer: 30000,
      rows: 3,
      columns: 3,
      marginX: 0,
      marginY: 0,
      verticalCompact: false,
      tileBorderRadius: 3
    }
  },
  mounted () {
    this.name = this.dashboard.name
    this.url = this.dashboard.url
    this.description = this.dashboard.description
    this.refreshTimer = this.dashboard.refreshTimer
    if (this.dashboard.style) {
      if (this.dashboard.style.color) {
        this.backgroundColor = this.dashboard.style.color.backgroundColor
        this.textColor = this.dashboard.style.color.textColor
        this.tileColor = this.dashboard.style.color.tileColow
        this.primaryColor = this.dashboard.style.color.primaryColor
        this.secondaryColor = this.dashboard.style.color.secondaryColor
      }
      if (this.dashboard.style.layout) {
        this.rows = this.dashboard.style.layout.rows
        this.columns = this.dashboard.style.layout.columns
        this.marginX = this.dashboard.style.layout.marginX
        this.marginY = this.dashboard.style.layout.marginY
        this.verticalCompact = this.dashboard.style.layout.verticalCompact
        this.tileBorderRadius = this.dashboard.style.layout.tileBorderRadius
      }
    }
  },
  methods: {
    saveDashboard () {
      const newDashboard = {
        dashboard_id: this.$route.params.dashboard_id,
        name: this.name,
        description: this.description,
        creator: this.creator,
        stars: this.stars,
        copies: this.copies,
        refreshTimer: this.refreshTimer,
        style: {
          color: {
            backgroundColor: this.backgroundColor,
            textColor: this.textColor,
            tileColor: this.tileColor,
            primaryColor: this.primaryColor,
            secondaryColor: this.secondaryColor
          },
          layout: {
            rows: this.rows,
            columns: this.columns,
            marginX: this.marginX,
            marginY: this.marginY,
            verticalCompact: this.verticalCompact,
            tileBorderRadius: this.tileBorderRadius
          }
        }
      }
      this.$emit('update-dashboard', newDashboard)
      this.$emit('close')
    },
    deleteDashboard () {
      // TODO show warning
      this.$emit('delete-dashboard')
    }
  },
  computed: {
    tab () {
      return this.$route.query.tab
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

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
    }
    .tile-settings {
      flex: 1 1 auto;
      flex-direction: column;
      display: flex;
      .tile-options {
        padding: 20px;
        overflow-y: auto;
        border-radius: 0px 3px 3px 3px;
        flex: 1 1 auto;
        border: 1px solid color('green');
        margin-bottom:  10px;
        .input-wrapper {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
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
        }
      }
    }
  }
</style>
