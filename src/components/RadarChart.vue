<template>
  <div class="chart-view">
    <div class="chart-container"></div>
    <!-- <ul class="indicator">
      <li v-for="item in option.radar.indicator" :key="item.name"><slot></slot></li>
    </ul> -->
  </div>
</template>

<script>
import echarts from 'echarts'
import ChartTool from '../utils/chartTool.js'

export default {
  data() {
    return {
      chartInstance: null,
      option: null,
      timer: null,
      lockIndex: -1,
      lastIndex: -1
    }
  },
  props: {
    /* autoPlay: {
      type: Boolean,
      default: false
    } */
    symbol: {
      type: Boolean,
      default: false
    },
    xPath: {
      type: String,
      default: 'name'
    },
    yPath: {
      type: String,
      default: 'value'
    },
    legendPath: {
      type: String,
      default: 'legend'
    },
    width: {
      type: Number,
      default: 1
    },
    color: {
      type: Array
    },
    chartData: {
      type: Array
    }
  },
  mounted() {
    this.getOption()
    this.initChart() //= =>this.$el == <!---->
    this.setChart()
    /*  this.$nextTick(() => {
    //在这里走组的话会先执行watch
      this.getOption()
      this.initChart()
      this.setChart()
    }) */
  },
  methods: {
    initChart() {
      console.assert(this.$el.firstElementChild, '无法实例化LineChart')
      this.chartInstance = echarts.init(this.$el)
      window.addEventListener('resize', () => {
        if (this.chartInstance) {
          console.log('resize')
          this.chartInstance.resize()
        }
      })
    },
    getOption() {
      if (this.option) {
        return
      }
      const option = {
        tooltip: {},
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: []
        },
        series: [
          {
            type: 'radar',
            data: []
          }
        ]
      }
      this.option = option
    },
    setChart() {
      this.clearTimer()
      this.chartInstance && this.chartInstance.clear()

      if (this.chartData && this.chartData.length) {
        ChartTool.setRadar(this.chartData, this.xPath, this.yPath, this.option, {})

        if (this.chartInstance) {
          // this.chartInstance.clear();
          // console.log(JSON.stringify(this.option))
          this.chartInstance.setOption(this.option)
        }
      }
    },
    // refreshData() {},
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.setChart()
      }
    }
  }
}
</script>

<style>
.chart-view {
  width: 100%;
  height: 100%;
}
</style>
