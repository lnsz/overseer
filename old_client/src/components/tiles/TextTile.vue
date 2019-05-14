<template>
  <div class="text-tile">
    <div class="text">
      <div class="title">{{tile.name}}</div>
      <div class="url">{{tile.url}}</div>
      <div class="description">{{tile.description}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextTile',
  props: {
    tile: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/colors";
  @import "../../assets/styles/functions";

  .text-tile {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .text {
      height: 100%;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      padding: 10px 15px 10px 15px;
      .title {
        text-align: center;
        font-size: 24px;
        letter-spacing: 1px;
        padding-bottom: 5px;
      }
      .url {
        font-size: 16px;
        padding: 15px 0 10px 0;
      }
      .description {
        font-size: 14px;
        font-weight: 300;
      }
    }
  }

</style>
