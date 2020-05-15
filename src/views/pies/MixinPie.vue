<template>
  <div class="view-container">
    <el-row :gutter="20">
      <el-col :span="12"><MixinPie :chart-data="datas"></MixinPie></el-col>
      <el-col :span="12"><MixinPie :chart-data="datas" legendPath="gender" xPath="code" :radius="moreRadius"></MixinPie></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <MixinPie :chart-data="datas" xPath="province" userLegend><span>123</span></MixinPie>
      </el-col>
      <el-col :span="12"><MixinPie :chart-data="datas" userLegend show-background></MixinPie></el-col>
    </el-row>
  </div>
</template>

<script>
import Mock from 'mockjs'
import MixinPie from '../../components/MixinPie.vue'
export default {
  components: {
    MixinPie
  },
  data() {
    return {
      datas: null,
      moreRadius: [0, '30%', '60%', '75%']
    }
  },
  mounted() {
    const data = Mock.mock({
      // 属性 array 的值是一个数组，其中含有 1 到 10 个元素
      'array|2-10': [
        {
          date: '@date("yyyy-MM-dd")',
          province: '@province',
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
