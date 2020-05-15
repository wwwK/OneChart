<!-- 会覆盖父类模板 -->
<!-- <template><div id="dv">123</div></template> -->
<script>
import BaseChart from './BaseChart.vue'
export default {
  extends: BaseChart,
  // 只有new的方式才可以这样用给基类赋值
  /* propsData: {
    type: 'bar'
  }, */
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
    initChart() {
      console.log('Extend Chart Method initChart')
      // $parent 是父容器，不是父组件
      // this.$parent.initChart()

      // 因为重写，自己调用自己死循环了
      // this._self.initChart()
    }
  }
}

/* const BarChart = Vue.extend(BaseChart)

new BarChart({
  data() {
    return {
      text: 999
    }
  },
  //这种全局注册方式只能使用propsData，不能使用props
  propsData: {
    //不能直接使用props
    type: 'lie'
  }
}) */
</script>
