<template>
  <div class="chart-container"></div>
</template>

<script>
import echarts from 'echarts'
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
    area: {
      type: Boolean,
      default: false
    },
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
    width: {
      type: Number,
      default: 1
    },
    color: {
      type: Array
    },
    areaStyle: {
      type: Object
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
      console.log(this.$el)
      console.assert(this.$el, '无法实例化LineChart')
      this.chartInstance = echarts.init(this.$el)
    },
    getOption() {
      if (!this.option) {
        const option = {
          tooltip: {
            trigger: 'axis'
          },
          /* grid: {
            top: '15%',
            bottom: '15%',
          }, */
          xAxis: {
            type: 'category',
            boundaryGap: false,
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
            },

            splitArea: {
              show: true,
              itemStyle: {
                color: ['rgba(187,187,187,0)', 'rgba(187,187,187,0.1)']
              }
            }
          },
          series: [
            {
              type: 'line',
              symbol: 'emptyCircle',
              smooth: false,
              data: []
            }
          ]
        }
        if (this.area) {
          if (this.areaStyle) {
            option.series[0].areaStyle = this.areaStyle
          } else {
            option.series[0].areaStyle = {}
          }
        }
        if (!this.symbol) {
          option.series[0].symbol = 'none'
        }
        if (this.lineStyle) {
          option.series[0].lineStyle = this.lineStyle
        }
        option.series[0].smooth = this.smooth
        this.option = option
      }
    },
    setChart() {
      if (this.chartData) {
        this.clearTimer()
        this.option.xAxis.data = this.chartData.map(c => c[this.xPath])
        this.option.series[0].data = this.chartData.map(c => c[this.yPath])
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
