<template>
  <div @scroll="updateCurrentSection" class="edit-tile">
    <div class="top-bar">
      <input
        class="title"
        placeholder="Name"
        v-model="model.general.name"
      />
      <div
        @click="deleteTile"
        class="delete-button"
      >
        <font-awesome-icon
          class="icon"
          icon="trash-alt"
        />
        <div class="tooltip">Delete Tile</div>
      </div>
    </div>
    <div class="edit-menu" id='edit-menu'>
      <div class="edit-menu-nav">
        <div
          v-for="(section, index) in sections"
          :key="index"
          @click="scrollToSection(index)"
          :class="{ 'current': index == currentSection }"
          class="edit-menu-nav-button"
        >
          {{section.name}}
        </div>
        <ActionButton
          class="copy-button"
          @click="copyTile"
          color="grey"
          text="copy"
        />
        <ActionButton
          class="save-button"
          @click="saveTile"
          text="Save"
        />
      </div>
      <div class="edit-menu-content" id="edit-menu-content">
        <div
          v-for="(section, index) in sections"
          :key="index"
          :id="section.id"
          :ref="section.id"
          :class="{ 'current': currentSection == index }"
          @click="clickOnSection(index)"
          class="section"
        >
          <div class="section-name">
            {{section.name}}
          </div>
          <div
            class="input-row"
            style="width: 100%;"
            v-for="(input, contentIndex) in section.content"
            :key="contentIndex"
          >
            <div class="input-left-side" v-if="input.type != 'permissions'">
              {{input.name}}
            </div>
            <div class="input-right-side">
              <div v-if="input.type == 'text'">
                <textarea
                  class="input-field text-input"
                  v-model="model[section.id][input.field]"
                >
                </textarea>
              </div>
              <div v-if="input.type == 'input'">
                <input
                  class="input-field text-input"
                  v-model="model[section.id][input.field]"
                />
              </div>
              <div v-else-if="input.type == 'number'">
                <input
                  class="input-field number-input"
                  type="number"
                  v-model="model[section.id][input.field]"
                />
              </div>
              <div v-else-if="input.type == 'toggle'">
                <ToggleButton
                  color="#42b983"
                  :width="50"
                  :height="25"
                  sync
                  v-model="model[section.id][input.field]"
                />
              </div>
              <div v-else-if="input.type == 'color'">
                <div class="color-input">
                  <div class="input-field color-demo" :style="{background: model[section.id][input.field]}" />
                  <input
                    class="input-field"
                    v-model="model[section.id][input.field]"
                  />
                </div>
              </div>
              <div v-else-if="input.type == 'dropdown'">
                <div class="picker-input">
                  <select
                    v-model="model[section.id][input.field]"
                  >
                    <option
                      :key="option"
                      v-for="(option) in input.options"
                    >
                      {{option}}
                    </option>
                  </select>
                </div>
              </div>
              <div v-else-if="input.type == 'chartData'">
                <div class="chart-data">
                  <div
                    v-for="(data, index) in model[section.id][input.field]"
                    :key="index"
                    class="chart-data-wrapper"
                  >
                    <input
                      class="input-field chart-data-input"
                      v-model="model[section.id][input.field][index]['label']"
                      placeholder="Label"
                    />
                    <input
                      class="input-field chart-data-input"
                      v-model="model[section.id][input.field][index]['data']"
                      placeholder="Value"
                    />
                    <input
                      class="input-field chart-data-input"
                      v-model="model[section.id][input.field][index]['backgroundColor']"
                      placeholder="Color"
                    />
                    <div class="remove-data-wrapper">
                      <ActionButton
                        size="small"
                        color="red"
                        @click="removeData(index)"
                      >
                        <font-awesome-icon
                          class="icon"
                          icon="minus"
                        />
                      </ActionButton>
                    </div>
                  </div>
                  <div class="add-data-wrapper">
                    <ActionButton
                      size="small"
                      @click="addData"
                    >
                      <font-awesome-icon
                        class="icon"
                        icon="plus"
                      />
                    </ActionButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VueScrollTo from 'vue-scrollto'
import { ToggleButton } from 'vue-js-toggle-button'
import ActionButton from '@/components/ActionButton.vue'

@Component({
  components: {
    ActionButton,
    ToggleButton
  }
})
export default class EditTile extends Vue {
  // Props
  @Prop({ default: () => {} })
  private tile: any

  // Data
  private model = {
    general: {
      name: '',
      url: '',
      description: '',
    },
    font: {},
    border: {},
    background: {},
    text: {},
    outline: {},
    shadow: {},
    layout: {},
    status: {},
    iframe: {},
    chart: {
      data: []
    },
  }
  private currentSection = 0
  private isScrolling = false

  // Mounted
  private mounted(): void {
    this.model.general.name = this.tile.name
    this.model.general.description = this.tile.description || ''
    this.model.general.url = this.tile.url || ''
    this.model.layout = this.tile.layout || {}
    this.model.status = this.tile.status || {}
    this.model.iframe = this.tile.iframe || {}
    this.model.chart = this.tile.chart || { data: [] }
    this.model.text = this.tile.text || {}
    if (this.tile.style) {
      this.model.font = this.tile.style.font || {}
      this.model.background = this.tile.style.background || {}
      this.model.border = this.tile.style.border || {}
      this.model.outline = this.tile.style.outline || {}
      this.model.shadow = this.tile.style.shadow || {}
    } else {
      this.model.font = {}
      this.model.background = {}
      this.model.border = {}
      this.model.outline = {}
      this.model.shadow = {}
    }
  }

  // Methods
  private scrollToSection(index: number): void {
    const options = {
      container: '.edit-tile',
      duration: 300,
      easing: 'ease',
      onStart: () => { this.isScrolling = true },
      onDone: () => { this.isScrolling = false }
    }
    if (!this.isScrolling) {
      VueScrollTo.scrollTo(
        `#${this.sections[index].id}`,
        options.duration, options
      )
    }
  }

  private clickOnSection(index: number): void {
    if (this.currentSection < index) {
      this.scrollToSection(index)
    }
  }

  private updateCurrentSection(): void {
    for (const [index, section] of this.sections.entries()) {
      const rect = this.$refs[section.id][0].getBoundingClientRect()
      const viewHeight = Math.max(this.$refs[section.id][0].clientHeight, window.innerHeight)
      if (rect.bottom >= window.innerHeight / 4 && rect.top - viewHeight < 0) {
        this.currentSection = index
        break
      }
    }
  }

  private updateField(e: Event, section: number, field: string): void {
    this.model[section][field] = (e.target as HTMLInputElement).innerText
  }

  private saveTile(): void {
    const newTile = {
      tile_id: this.tile._id,
      name: this.model.general.name,
      description: this.model.general.description,
      url: this.model.general.url,
      iframe: this.model.iframe,
      chart: this.model.chart,
      text: this.model.text,
      style: {
        font: this.model.font,
        background: this.model.background,
        outline: this.model.outline,
        border: this.model.border
      }
    }
    this.$emit('update-tile', newTile)
    this.$emit('close')
  }

  private deleteTile(): void {
    this.$emit('delete-tile', { tile_id: this.tile._id })
    this.$emit('close')
  }

  private copyTile(): void {
    const { _id, ...newTile } = this.tile
    this.$emit('copy-tile', newTile)
    this.$emit('close')
  }

  private getTypeSpecificSection(): any {
    switch(this.tile.type) {
      case 'text':
        return [{
          id: 'text',
          name: 'Text',
          content: [
            {
              name: 'Content',
              field: 'content',
              type: 'text'
            },
            {
              name: 'Vertical Alignment',
              field: 'verticalAlignment',
              type: 'dropdown',
              options: ['start', 'center', 'end']
            },
            {
              name: 'Horizontal Alignment',
              field: 'horizontalAlignment',
              type: 'dropdown',
              options: ['start', 'center', 'end']
            }
          ]
        }]
      case 'iframe':
        return [{
          id: 'iframe',
          name: 'iFrame',
          content: [
            {
              name: 'Zoom',
              field: 'zoomLevel',
              type: 'number'
            },
            {
              name: 'Refresh Time (minutes)',
              field: 'refreshTime',
              type: 'number'
            },
            {
              name: 'Scrollable?',
              field: 'scrollable',
              type: 'toggle'
            }
          ]
        }]
      case 'image':
        return [{
          id: 'iframe',
          name: 'iFrame',
          content: [
            {
              name: 'Zoom',
              field: 'zoomLevel',
              type: 'number'
            },
            {
              name: 'Scrollable?',
              field: 'scrollable',
              type: 'toggle'
            }
          ]
        }]
      case 'piechart':
      case 'linechart':
        return [{
          id: 'chart',
          name: 'Chart',
          content: [
            {
              name: 'Data',
              field: 'data',
              type: 'chartData'
            }
          ]
        }]
      default:
        return []
    }
  }

  private addData(): void {
    this.model.chart.data.push({
      label: '',
      backgroundColor: '',
      value: ''
    })
  }

  private removeData (index) {
    this.model.chart.data.splice(index)
  }

  // Computed
  get sections(): any {
    return [
      {
        id: 'general',
        name: 'General',
        content: [
          {
            name: 'Description',
            field: 'description',
            type: 'text'
          },
          {
            name: 'URL',
            field: 'url',
            type: 'input'
          }
        ]
      },
      ...this.getTypeSpecificSection(),
      {
        id: 'font',
        name: 'Font',
        content: [
          {
            name: 'Color',
            field: 'color',
            type: 'color'
          },
          {
            name: 'Family',
            field: 'family',
            type: 'dropdown',
            options: [
              'Arial',
              'Comic Sans MS',
              'Courier New',
              'Impact',
              'Georgia',
              'Lucida Console',
              'Lucida Sans Unicode',
              'Palantino Linotype',
              'Roboto',
              'Tahoma',
              'Times New Roman',
              'Trebuchet MS',
              'Verdana'
            ]
          },
          {
            name: 'Size (px)',
            field: 'size',
            type: 'number'
          },
          {
            name: 'Weight',
            field: 'weight',
            type: 'number'
          },
          {
            name: 'Style',
            field: 'style',
            type: 'dropdown',
            options: ['normal', 'italic', 'oblique']
          }
        ]
      },
      {
        id: 'background',
        name: 'Background',
        content: [
          {
            name: 'Color',
            field: 'color',
            type: 'color'
          }
        ]
      },
      {
        id: 'border',
        name: 'Border',
        content: [
          {
            name: 'Color',
            field: 'color',
            type: 'color'
          },
          {
            name: 'Width (px)',
            field: 'width',
            type: 'number'
          },
          {
            name: 'Radius (%)',
            field: 'radius',
            type: 'number'
          },
          {
            name: 'Style',
            field: 'style',
            type: 'dropdown',
            options: [
              'none',
              'dotted',
              'dashed',
              'solid',
              'double',
              'groove',
              'ridge',
              'inset',
              'outset',
              'hidden'
            ]
          }
        ]
      },
      {
        id: 'shadow',
        name: 'Shadow',
        content: [
          {
            name: 'Enabled?',
            field: 'enabled',
            type: 'toggle'
          }
        ]
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
  @import "../../shared/styles/functions";

  .edit-tile {
    color: textColor('default');
    width: calc(60vw - 20px);
    height: calc(85vh - 90px);
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: space-between;
    margin: 80px 10px 10px 10px;
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */
    &::-webkit-scrollbar {
      width: 0 !important;
      background: transparent;
    }
    .top-bar {
      position: absolute;
      top: 0px;
      left: 0px;
      width: calc(100% - 60px);
      margin: 25px 20px 0px 20px;
      padding: 0 10px 15px 10px;
      border-bottom: 1px solid bgColor('primary');
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 30px;
        color: textColor('default');
        cursor: text;
        border: none;
        background: transparent;
      }
      .delete-button {
        cursor: pointer;
        color: textColor('default');
        font-size: 30px;
        position: relative;
        &:hover {
          color: shade(textColor('default'), 20%);
          .tooltip {
            opacity: 1;
          }
        }
        .tooltip {
          transition: all 0.4s ease;
          text-align: center;
          display: block;
          position: absolute;
          padding: 3px;
          z-index: 2;
          top: -70%;
          width: 300%;
          left: -100%;
          font-size: 14px;
          background-color: rgba(0, 0, 0, 0.5);
          color: textColor('default');
          opacity: 0;
        }
      }
    }
    .edit-menu {
      .edit-menu-nav {
        position: absolute;
        display: flex;
        flex-direction: column;
        right: 50px;
        text-align: right;
        height: calc(85vh - 90px);
        .edit-menu-nav-button {
          font-weight: 300;
          font-size: 18px;
          border-radius: 3px;
          padding: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          &.current {
            background: bgColor('primary');
          }
        }
        .copy-button {
          position: absolute;
          bottom: 70px;
          align-self: flex-end;
        }
        .save-button {
          position: absolute;
          bottom: 10px;
          align-self: flex-end;
        }
      }
      .edit-menu-content {
        margin: 0 200px calc(80vh - 50px) 20px;
        .section {
          transition: opacity 0.5s ease;
          opacity: 0.3;
          border-bottom: 1px solid bgColor('secondary');
          padding: 15px 0 15px 0;
          &.current {
            opacity: 1;
          }
          .section-name {
            font-size: 20px;
            padding-bottom: 10px;
          }
          .input-row {
            font-weight: 300;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            padding: 10px;
            .color-input {
              display: flex;
              flex-direction: row;
            }
            .chart-data-wrapper {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              padding: 10px 0;
              .chart-data-input {
                width: 20%;
                margin: 0 10px;
              }
            }
            .input-left-side {
              align-self: center;
            }
            .input-field {
              background: bgColor('default');
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
              font-family: 'Roboto', sans-serif;
              font-size: 16px;
              transition: all 0.2s ease;
              color: textColor('default');
              background: bgColor('default');
              border: 1px solid bgColor('secondary');
              padding: 7px;
              border-radius: 3px;

              &:focus {
                border: 1px solid bgColor('primary');
              }
              &.number-input {
                width: 30px;
              }
              &.text-input {
                width: 15vw;
                resize: none;
              }
              &.color-demo {
                width: 15px;
                height: 15px;
                margin-right: 5px;
                align-self: center;
              }
              &.user-search {
                margin-bottom: 10px;
                width: 40%;
                align-self: center;
                margin-bottom: 25px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
</style>