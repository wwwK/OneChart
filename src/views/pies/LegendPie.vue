<template>
  <div class="view-container">
    <el-row :gutter="20">
      <el-col :span="12"><LegendPie :chart-data="datas" :showLegend="false" legend="RateLegend"></LegendPie></el-col>
      <el-col :span="12"><LegendPie :chart-data="datas"></LegendPie></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><LegendPie :chart-data="datas"></LegendPie></el-col>
      <el-col :span="12"><LegendPie :chart-data="datas"></LegendPie></el-col>
    </el-row>
  </div>
</template>

<script>
import Mock from 'mockjs'
import LegendPie from '../../components/LegendPie.vue'
export default {
  components: {
    LegendPie
  },
  data() {
    return {
      datas: null
    }
  },
  mounted() {
    const data = Mock.mock({
      // 属性 array 的值是一个数组，其中含有 1 到 10 个元素
      'array|6-10': [
        {
          date: '@date("yyyy-MM-dd")',
          name: '@cname',
          'value|1-100': 1
        }
      ]
    })
    this.datas = data.array
    window.datas = this.datas
  }
}
</script>

<style lang="less" scoped>
.view-container {
  .full();

  .el-row {
    height: 50%;
    padding: 10px;
    box-sizing: border-box;

    .el-col {
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
  }
}
</style>
