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
    /> -->
    <TextTile
      v-if="tile.type === 'text'"
      :tile="tile"
      :columns="columns"
    />
    <ChartTile
      v-else-if="tile.type === 'piechart' || tile.type === 'linechart' || tile.type === 'barchart'"
      :tile="tile"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import strings from '../../shared/constants/strings'
import { TileApi } from '../../api'
import { StyleHelper } from '../../shared/helpers'
import TextTile from '@/components/tiles/TextTile.vue'
import ChartTile from '@/components/tiles/ChartTile.vue'


// import ChartTile from '@/components/tiles/ChartTile'
// import TileOptions from '@/components/tiles/TileOptions'
// import IFrameTile from '@/components/tiles/IFrameTile'
// import ImageTile from '@/components/tiles/ImageTile'
// import StatusTile from '@/components/tiles/StatusTile'
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
@Component({
  components: {
    TextTile,
    ChartTile
  }
})
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
  get background(): any {
    return StyleHelper.backgroundCSS(this.tile.style)
  }

  get font(): any {
    return StyleHelper.fontCSS(this.tile.style)
  }

  get border(): any {
    return StyleHelper.borderCSS(this.tile.style)
  }

  get shadow(): any {
    return StyleHelper.shadowCSS(this.tile.style)
  }

  get tileStyle(): object {
    return {
      ...this.background,
      ...this.font,
      ...this.border,
      ...this.shadow
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