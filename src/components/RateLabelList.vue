<template>
  <ul>
    <li>
      
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    legendData: {
      type: Array
    },
    chartInstance: {
      type: Object
    },
    line:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    setLegend() {
      
    }
  },
  watch: {
    legendData: {
      deep: true,
      handler() {
        this.setLegend()
      }
    }
  }
}
</script>

<style></style>
