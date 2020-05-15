<template>
  <div class="view-container">
    <el-row :gutter="20">
      <el-col :span="12"><PieChart :chart-data="datas" xPath="code" legendPath="gender"></PieChart></el-col>
      <el-col :span="12"><PieChart :chart-data="datas"></PieChart></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><PieChart :chart-data="datas"></PieChart></el-col>
      <el-col :span="12"><PieChart :chart-data="datas"></PieChart></el-col>
    </el-row>
  </div>
</template>

<script>
import Mock from 'mockjs'
import PieChart from '../../components/PieChart.vue'
export default {
  components: {
    PieChart
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
          province: '@province',
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
      flex: 1;
      box-sizing: border-box;
    }
  }
}
</style>
