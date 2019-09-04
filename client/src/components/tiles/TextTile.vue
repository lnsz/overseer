<template>
  <div
    :style="tileStyle"
    class="text-tile"
  >
    <div
      class="text"
      :key="index"
      v-for="(line, index) in text"
    >
      {{line}}
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { StyleHelper } from '../../shared/helpers'

  @Component
  export default class TextTile extends Vue {
    // Props
    @Prop({ default: {} })
    private tile: any

    // Computed
    get text(): string[] {
      if (this.tile.text && this.tile.text.content) {
        return this.tile.text.content.split('\n')
      }
      return []
    }

    get alignment(): any {
      return StyleHelper.alignmentCSS(this.tile.text)
    }

    get tileStyle(): object {
      return {
        ...this.alignment
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../shared/styles/functions";

  .text-tile {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .text {
      margin: 5px;
    }
  }

</style>
