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
        let xArr = []
        let legendArr = []
        const dataTmp = {}
        const dataObj = {}
        this.chartData.map(d => {
          const x = d[this.xPath]
          const legend = d[this.legendPath]
          xArr.push(x)
          legendArr.push(legend)
          if (!dataTmp[legend]) {
            dataTmp[legend] = {}
          }
          dataTmp[legend][x] = d[this.yPath]
        })
        xArr = Array.from(new Set(xArr))
        legendArr = Array.from(new Set(legendArr))

        this.option.series = []
        for (let i = 0; i < legendArr.length; i++) {
          const legend = legendArr[i]
          if (!dataObj[legend]) {
            dataObj[legend] = {
              name: legend,
              type: 'bar',
              data: []
            }
            if (this.stack) {
              dataObj[legend].stack = 'stackBar'
            }
            if (this.showBackground) {
              dataObj[legend].showBackground = true
              dataObj[legend].backgroundStyle = {
                color: 'rgba(220, 220, 220, 0.2)'
              }
            }
          }

          for (let j = 0; j < xArr.length; j++) {
            const x = xArr[j]
            const y = dataTmp[legend][x]
            dataObj[legend].data.push(y)
          }

          this.option.series.push(dataObj[legend])
        }

        this.option.xAxis.data = xArr
        this.option.legend.data = legendArr
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
