<template>
  <div>
    <div>{{dashboard.name}}</div>
    <div>{{dashboard.description}}</div>
  </div>
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    dashboard: {
      type: Object,
      default: () => ({ name: '', description: '' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
