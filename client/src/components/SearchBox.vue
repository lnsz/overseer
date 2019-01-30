<template>
  <div class="search-box">
    <input
      @input="$emit('search', $event)"
      class="search-box-input"
      placeholder="Search"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchBox'
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/colors";
  @import "../assets/styles/functions";

  .search-box {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
  }
  .search-box-input {
    font-family: 'Roboto', sans-serif;
    transition: all 0.2s ease;
    color: color('text');
    background: color('background');
    border: 1px solid color('foreground');
    padding: 10px;
    border-radius: 3px;
    text-align: center;
  }
  .search-box-input:focus {
    border: 1px solid color('green');
  }
</style>
