<template>
  <div class="type-picker">
    <div class="title">{{title}}</div>
    <div class="content-wrapper">
      <div
        v-if="currentCollection"
        class="item"
        @click="currentCollection = ''"
      >
        <font-awesome-icon
          class="icon"
          icon="arrow-left"
        />
        <div class="name">
          Back
        </div>
      </div>
      <div
        :key="index"
        v-for="(item, index) in items"
        class="item"
        @click="handleClick(item.value)"
      >
        <font-awesome-icon
          class="icon"
          :icon="item.icon"
        />
        <div class="name">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import strings from '../shared/constants/strings'
  import ActionButton from '@/components/ActionButton.vue'

  @Component({
    components: {
      ActionButton
    }
  })
  export default class TileTypePicker extends Vue {
    // Data
    private currentCollection = ''
    private collections = [
      {
        name: 'Standard',
        value: 'standard',
        icon: 'shapes',
        tiles: [
          {
            name: 'Text',
            value: 'text',
            icon: 'font'
          }
        ]
      },
      {
        name: 'Networking',
        value: 'networking',
        icon: 'network-wired',
        tiles: [
          {
            name: 'Status',
            value: 'status',
            icon: 'wifi'
          }
        ]
      },
      {
        name: 'Media',
        value: 'media',
        icon: 'photo-video',
        tiles: [
          {
            name: 'Image',
            value: 'image',
            icon: 'image'
          },
          {
            name: 'iFrame',
            value: 'iframe',
            icon: 'desktop'
          }
        ]
      },
      {
        name: 'Charts',
        value: 'charts',
        icon: 'chart-bar',
        tiles: [
          {
            name: 'Pie Chart',
            value: 'piechart',
            icon: 'chart-pie'
          },
          {
            name: 'Line Chart',
            value: 'linechart',
            icon: 'chart-line'
          },
          {
            name: 'Bar Chart',
            value: 'barchart',
            icon: 'chart-bar'
          }
        ]
      }
    ]

    // Methods
    private handleClick(itemValue): void {
      if (this.currentCollection) {
        this.$emit('create-tile', itemValue)
        this.$emit('close')
      } else {
        this.currentCollection = itemValue
      }
    }

    // Computed
    get title(): string {
      return this.currentCollection ? strings.tileTypes : strings.collections
    }

    get items(): any[] {
      return this.currentCollection ?
        this.collections.find(x => x.value == this.currentCollection).tiles :
        this.collections
    }
  }


</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

  .type-picker {
    color: textColor('default');
    width: calc(55vw - 20px);
    height: calc(65vh - 90px);
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    margin: 10px;
    position: relative;
    align-items: stretch;
    .title {
      font-size: 28px;
      margin: 10px 10px 20px 10px;
    }
    .content-wrapper {
      flex: 1 0 auto;
      display: grid;
      margin: 20px;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
        background: bgColor('default');
        transition: all 0.3s ease;
        cursor: pointer;
        border-radius: 3px;
        .icon {
          font-size: 50px;
        }
        .name {
          font-size: 20px;
          margin: 10px;
        }
        &:hover {
          background: bgColor('secondary');
        }
      }
    }
  }
</style>

