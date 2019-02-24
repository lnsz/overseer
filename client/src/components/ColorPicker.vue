<template>
  <div>
    <div class='color-picker-wrapper'>
    <input
      class='color-picker'
      type="color"
      :value="value" @input="updateColor"
    />
    </div>
    <input
      :value="value" @input="updateColor"
    />
  </div>
</template>

<script>
export default {
  name: 'ColorPicker',
  props: {
    value: {
      type: String,
      default: ''
    },
    colors: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.colors = [this.value]
  },
  methods: {
    updateColor (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .color-picker {
    padding: 0;
    margin: 0;
    border: 0;
    background: rgba(0, 0, 0, 0);
  }

</style>
