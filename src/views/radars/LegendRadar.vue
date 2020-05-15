<template>
  <div class="view-container">
    <el-row :gutter="20">
      <el-col :span="12"><LegendRadar :chart-data="datas" legend="RateLegend"></LegendRadar></el-col>
      <el-col :span="12"><LegendRadar :chart-data="datas" xPath="code" legendPath="gender"></LegendRadar></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><LegendRadar :chart-data="datas"></LegendRadar></el-col>
      <el-col :span="12"><LegendRadar :chart-data="datas"></LegendRadar></el-col>
    </el-row>
  </div>
</template>

<script>
import Mock from 'mockjs'
import LegendRadar from '../../components/LegendRadar.vue'
export default {
  components: {
    LegendRadar
  },
  data() {
    return {
      datas: null
    }
  },
  mounted() {
    const data = Mock.mock({
      // 属性 array 的值是一个数组，其中含有 1 到 10 个元素
      'array|3-6': [
        {
          name: '@cname',
          'gender|+1': ['男', '女'],
          'code|+1': ['AA', 'BB', 'CC', 'DD', 'EE'],
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
  // 好像必须用类调用形式才有效
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
