<template>
  <div class="chart-container"></div>
</template>

<script>
import mixinChart from '../utils/mixinChart.js'

export default {
  mixins: [mixinChart],
  props: {
    type: {
      default: 'bar'
    }
  },
  mounted() {
    console.log('Extend Chart')
    this.type = 'bar'
  },
  methods: {
    // 同命方法会覆盖父类方法
    /* initChart() {
      console.log('Extend Chart Method initChart')
    } */
  }
}
</script>

<style></style>
