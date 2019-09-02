<template>
  <div
    class="tile"
    :style="tileStyle"
  >
    <div
      class="options-button"
      v-if="!locked"
      @click="$emit('edit', tile)"
    >
      <FontAwesomeIcon
        class="icon"
        icon="ellipsis-v"
      />
    </div>
    <!-- <StatusTile
      v-if="tile.type === 'status'"
      :tile="tile"
    />
    <IFrameTile
      v-else-if="tile.type === 'iframe'"
      :tile="tile"
      :columns="columns"
      :locked="locked"
    />
    <ImageTile
      v-else-if="tile.type === 'image'"
      :tile="tile"
      :columns="columns"
      :locked="locked"
    />
    <TextTile
      v-else-if="tile.type === 'text'"
      :tile="tile"
      :columns="columns"
    />
    <ChartTile
      v-else-if="tile.type === 'piechart'"
      :tile="tile"
    /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import strings from '../../shared/constants/strings'
import { TileApi } from '../../api'
import { StyleHelper } from '../../shared/helpers'

// import ChartTile from '@/components/tiles/ChartTile'
// import TileOptions from '@/components/tiles/TileOptions'
// import IFrameTile from '@/components/tiles/IFrameTile'
// import ImageTile from '@/components/tiles/ImageTile'
// import StatusTile from '@/components/tiles/StatusTile'
// import TextTile from '@/components/tiles/TextTile'
// @Component({
//   components: {
//     ChartTile,
//     IFrameTile,
//     ImageTile,
//     StatusTile,
//     TextTile,
//     TileOptions
//   }
// })
@Component
export default class BaseTile extends Vue {
  // Props
  @Prop({ default: {} })
  private tile: any

  @Prop({ default: 1 })
  private columns: number

  @Prop({ default: 1 })
  private rows: number

  @Prop({ default: false })
  private locked: boolean

  // Data
  private isOptionsOpen = false

  // Computed
  get backgroundColor(): string {
    return this.tile.style ? this.tile.style.backgroundColor : ''
  }

  get background(): object {
    return StyleHelper.backgroundCSS(this.backgroundColor)
  }

  get textColor(): string {
    return this.tile.style ? this.tile.style.textColor : ''
  }

  get text(): object {
    return StyleHelper.textCSS(this.textColor)
  }

  get tileStyle(): object {
    return {
      ...this.background,
      ...this.text
    }
  }

  // Methods
  private async copyTile(): Promise<void> {
    const { _id, ...newTile } = this.tile
    await TileApi.createTile({
      ...newTile
    })
    this.emitRefresh()
  }

  private async deleteTile(): Promise<void> {
    await TileApi.deleteTile({
      dashboard_id: this.tile.dashboard_id,
      tile_id: this.tile._id
    })
    this.emitRefresh()
  }

  private toggleOptions(): void {
    console.log('options')
    this.isOptionsOpen = !this.isOptionsOpen
  }

  private emitRefresh(): void {
    // Short timeout to force update
    setTimeout(() => this.$emit('refresh'), 50)
  }
}
</script>

<style lang="scss" scoped>
  @import "../../shared/styles/functions";

  .tile {
    user-select: none;
    position: relative;
    cursor: pointer;
    height: calc(100% - 10px);
    width: calc(100% - 10px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1);
    color: textColor('default');
    margin: 5px;
    background: bgColor('secondary');
    border-radius: 3px;
    overflow: hidden;
    .options-button {
      opacity: 0;
      transition: opacity 0.3s ease;
      position: absolute;
      top: 0px;
      right: 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 40px;
      z-index: 1001;
      .icon {
        color: bgColor('default');
        font-size: 20px;
      }
    }
    .tile-options {
      position: absolute;
      display: none;
      top: 0px;
      right: 0px;
      &.show {
        display: block;
      }
    }
    &:hover .options-button {
      opacity: 0.5;
    }
  }

</style>