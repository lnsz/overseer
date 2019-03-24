<template>
  <transition name="fade">
    <div class="edit-tile">
      <ActionButton @click="editTile" text="Edit" />
      <ActionButton @click="$emit('copy')" text="Copy" />
      <ActionButton @click="$emit('delete')" text="Delete" color="red" />
    </div>
  </transition>
</template>

<script>
import ActionButton from '@/components/ActionButton'

export default {
  name: 'TileOptions',
  components: {
    ActionButton
  },
  props: {
    tile: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    editTile () {
      this.$emit('edit')
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
  }

</style>
