<template>
  <el-card class="rate-legend" shadow="hover">
    <span class="name">{{ legendItem[name] }}</span>
    <span class="value" :style="{ color: color }">{{ legendItem[value] }}</span>
    <span v-if="getUnit" class="unit">{{ getUnit }}</span>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // hasUnit: false
    }
  },
  props: {
    name: {
      type: String,
      default: 'name'
    },
    value: {
      type: String,
      default: 'value'
    },
    color: {
      type: String,
      default: '#444'
    },
    legendItem: {
      type: Object
    },
    line: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String
    },
    defaultUnit: {
      type: String
    }
  },
  mounted() {
    /* if(this.defaultUnit||this.legendItem[this.unit]){
     this.hasUnit=true;
   } */
  },
  computed: {
    getUnit: function() {
      return this.defaultUnit || this.legendItem[this.unit]
    }
  },
  methods: {
    /* itemEnter() {
      console.log('enter', this.legendItem)
    } */
  }
}
</script>

<style lang="less">
.rate-legend {
  width: 100%;
  height: 40px;
  font-family: 'cf_MsYh', sans-serif;
  font-size: 12px;
  color: #444444;
  background: transparent;
  border: none;
  cursor: pointer;

  .el-card__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
  }

  .name {
    max-width: 85px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .value {
    font-size: 38px;
    font-family: 'cf_BebasNb';
  }
}
</style>
