<template>
  <div class="chart-container"></div>
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
    smooth: {
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
    stack: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 1
    },
    color: {
      type: Array
    },
    showBackground: {
      type: Boolean,
      default: false
    },
    chartData: {
      type: Array
    }
  },
  mounted() {
    this.getOption()
    this.initChart()
    this.setChart()
  },
  methods: {
    initChart() {
      console.assert(this.$el, '无法实例化LineChart')
      this.chartInstance = echarts.init(this.$el)
    },
    getOption() {
      if (!this.option) {
        const option = {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            top: '15%',
            bottom: '15%'
          },
          legend: {
            data: []
          },
          xAxis: {
            type: 'category',
            // 两边是否留白，false下bar会超出轴区域，line是正好在轴上
            // boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#eee'
              }
            },
            axisLabel: {
              color: '#eee'
            },
            data: []
          },
          yAxis: {
            type: 'value',

            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#eee'
              }
            },
            axisLabel: {
              color: '#eee'
            },
            splitLine: {
              show: false
            }
          },
          series: []
        }
        this.option = option
      }
    },
    setChart() {
      if (this.chartData) {
        this.clearTimer()
        const data = ChartTool.transData(this.chartData, this.xPath, this.yPath, this.legendPath)

        const serieOption = {
          type: 'bar'
        }
        if (this.stack) {
          serieOption.stack = 'stack'
        }
        if (this.showBackground) {
          serieOption.showBackground = true
          serieOption.backgroundStyle = {
            color: 'rgba(220, 220, 220, 0.2)'
          }
        }
        ChartTool.setOption(data, this.option, serieOption)

        console.log(this.option)
        if (this.chartInstance) {
          // this.chartInstance.clear();
          this.chartInstance.setOption(this.option)
        }
      } else {
        this.chartInstance.clear()
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
