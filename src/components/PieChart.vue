<template>
  <div class="chart-container" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      option: null
    }
  },
  props: {
    SmartLife: {},
    formatter: {},
    legendColor: {
      default: ['#8d7fec', '#5085f2', '#e75fc3']
    },
    bgSize: {
      type: Number,
      default: 60
    },
    PieTitle: {
      type: String,
      default: ''
    },
    PieLegendShow: {
      type: Boolean,
      default: false
    },
    PieRadius: {
      type: Array,
      default: () => {
        return ['60%', '75%']
      }
    },
    Piecenter: {
      type: Array,
      default: () => {
        return ['50%', '50%']
      }
    },
    backgroundop: {},
    xPath: {},
    yPath: {},
    chartData: {}
  },
  mounted() {
    this.getOption()
    this.initChart()
    this.setChart()
  },
  computed: {
    chartStyle() {
      if (this.showBackground) {
        return {}
      } else {
        return {}
      }
    }
  },
  methods: {
    initChart() {
      let chartDom = this.$el
      const domClass = chartDom.getAttribute('class')
      if (!domClass.includes('chart-container')) {
        chartDom = chartDom.getElementsByClassName('chart-container')[0]
      }
      if (chartDom) {
        this.chartInstance = echarts.init(chartDom)
      } else {
        console.warn('无法实例化LineChart')
      }
    },
    getOption() {
      if (!this.option) {
        const option = {
          legend: {
            show: this.PieLegendShow,
            itemHeight: 12,
            itemWidth: 12,
            icon: 'rect',
            orient: 'horizontal',
            right: '2%',
            data: []
          },
          grid: {},
          color: this.legendColor,
          title: {
            show: false
          },

          tooltip: {
            trigger: 'item',
            confine: true,
            position: 'inside',
            textStyle: {
              align: 'left'
            },

            formatter: this.formatter
          },
          series: {
            name: this.PieTitle,
            type: 'pie',
            hoverAnimation: true,
            hoverOffset: 8,
            emphasis: {
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 5
              }
            },
            center: this.Piecenter,
            radius: this.PieRadius,
            clockwise: false, // 饼图的扇区是否是顺时针排布
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                length: 5,
                length2: 3,
                smooth: true
              }
            },
            data: []
          }
        }
        this.option = option
      }
    },
    setChart() {
      if (this.chartData.list) {
        // this.option.series.radius = this.PieRadius;
        // this.option.series.center = this.Piecenter;
        this.clearTimer()
        var datax = this.chartData.list
        this.option.legend.data = datax.map(c => c[this.xPath])
        var Piedata = []
        for (let i = 0; i < datax.length; i++) {
          Piedata[i] = {
            name: datax[i][this.xPath],
            value: datax[i][this.yPath]
          }
        }

        this.option.series.data = Piedata
        if (this.chartInstance) {
          this.chartInstance.clear()
          window.addEventListener('resize', () => {
            this.chartInstance.resize()
          })
          this.chartInstance.setOption(this.option)
          this.option.legend.show = this.PieLegendShow
          this.chartInstance.on('click', param => {
            var that = this
            const item = {}
            item[this.SmartLife] = [param.data.name]
            that.$emit('itemClick', item)
            // this.$emit('rowClick', param);
          })
        }
      }
    },
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

<style lang="less" scope>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
