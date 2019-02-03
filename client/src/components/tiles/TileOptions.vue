<template>
  <div class="edit-tile">
    <div class="button-wrapper">
      <div
        class="button edit"
        id="edit"
        @click="editTile"
      >
        Edit
      </div>
    </div>
    <div class="button-wrapper">
      <div
        class="button"
        id="copy"
        @click="copyTile"
      >
        Copy
      </div>
    </div>
    <div class="button-wrapper">
      <div
        class="button"
        id="delete"
        @click="deleteTile"
      >
        Delete
      </div>
    </div>
  </div>
</template>

<script>
import TilesService from '@/services/TilesService'

export default {
  name: 'EditTile',
  props: {
    tile: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    editTile (event) {
      console.log('edit')
    },
    async deleteTile (event) {
      await TilesService.deleteTile({
        dashboard_id: this.tile.dashboard_id,
        tile_id: this.tile._id
      }).then(this.$emit('refresh'))
    },
    async copyTile (event) {
      const { _id, ...newTile } = this.tile
      await TilesService.createTile({
        ...newTile
      }).then(this.$emit('refresh'))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/colors";
  @import "../../assets/styles/functions";

  .edit-tile {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
    .button-wrapper {
      z-index: 2;
      display: flex;
      justify-content: center;
      flex-direction: row;
      .button {
        box-shadow: 1px 1px 6px rgba(0, 0, 0, 1);
        font-family: 'Roboto', sans-serif;
        letter-spacing: 1px;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
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
      #delete {
        background-color: color('red');
      }
    }
  }

</style>
