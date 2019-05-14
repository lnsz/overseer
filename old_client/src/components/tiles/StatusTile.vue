<template>
  <div class="status-tile">
    <div class="status-bar" :class="tileState"/>
    <div class="text">
      <div class="title" :class="tileState">{{tile.name}}</div>
      <div class="url">{{tile.url}}</div>
      <div class="description">{{tile.description}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusTile',
  props: {
    tile: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    tileState () {
      return this.tile.status ? this.tile.status.state : null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/colors";
  @import "../../assets/styles/functions";

  .status-tile {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .status-bar {
      width: 100%;
      height: 15px;
      &.online {
        background: color('green');
      }
      &.offline {
        background: color('red');
      }
    }
    .text {
      height: 100%;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      padding: 10px 15px 10px 15px;
      .title {
        font-size: 24px;
        letter-spacing: 1px;
        padding-bottom: 5px;
        border-bottom: 1px solid color('background');
        &.online {
          border-bottom: 1px solid color('green');
        }
        &.offline {
          border-bottom: 1px solid color('red');
        }
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
