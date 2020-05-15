<template>
  <div class="view-container">
    <el-row :gutter="20">
      <el-col :span="12"><MixinBar type="bar" :chart-data="datas" xPath="code" legendPath="gender"></MixinBar></el-col>
      <el-col :span="12"><MixinBar type="line" :chart-data="datas" xPath="code"></MixinBar></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><MixinBar :chart-data="datas" xPath="code" legendPath="gender" stack></MixinBar></el-col>
      <el-col :span="12"><MixinBar type="bar" :chart-data="datas" xPath="code" showBackground></MixinBar></el-col>
    </el-row>
  </div>
</template>

<script>
import Mock from 'mockjs'
import MixinBar from '../../components/MixinBar.vue'
export default {
  components: {
    MixinBar
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
          'code|+1': ['AA', 'BB', 'CC', 'DD', 'EE'],
          'gender|+1': ['男', '女'],
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
