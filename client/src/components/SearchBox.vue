<template>
  <div class="search-box">
    <input
      @input="$emit('search', $event)"
      class="search-box-input"
      :placeholder="search"
    />
  </div>
</template>

<script lang='ts'>
  import { Component, Vue } from 'vue-property-decorator'
  import strings from '../shared/constants/strings'

  @Component
  export default class SearchBox extends Vue {
    // Data
    private search = strings.search
  }
</script>

<style lang="scss" scoped>
  @import "../shared/styles/functions";

  .search-box {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
  }
  .search-box-input {
    font-family: 'Roboto', sans-serif;
    transition: all 0.2s ease;
    color: textColor('default');
    background: bgColor('default');
    border: 1px solid bgColor('secondary');
    padding: 10px;
    border-radius: 3px;
    text-align: center;
  }
  .search-box-input:focus {
    border: 1px solid bgColor('green');
  }
</style>
