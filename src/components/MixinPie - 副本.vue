<template>
  <div class="chart-view">
    <div class="chart-container" :class="{ showBg: showBackground }" :style="chartStyle"></div>
    <img src="../assets/piebj.png" />
   <!-- <ul v-if="userLegend">
      <li v-for="item in option.legend" :key="item"><slot></slot></li>
    </ul> -->

  </div>
</template>

<script>
import ChartTool from '../utils/ComplateChartTool.js'

export default {
  mixins: [ChartTool.base],
  props: {
    radius: {
      type: Array,
      default: () => ['70%', '80%']
    },
    legendShow: {
      type: Boolean,
      default: true
    },
    showBackground: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    console.log('Extend Chart')
  },
  computed: {
    chartStyle: function() {
      const style = {
        'background-size': 'auto 80%',
        'background-position-y': '50%'
      }
      if (this.showBackground && !this.userLegend) {
        style['background-size'] = 'auto 60%'
      }
      return style
    }
  },
  methods: {
    getOption() {
      if (!this.option) {
        const option = {
          legend: {
            show: this.legendShow,
            itemHeight: 12,
            itemWidth: 12,
            icon: 'rect'
          },
          // color: this.legendColor,
          /* graphic: {
            type: 'image',
            style: {
              image: '../assets/piebj.png',
              top: 'center',
              width: 100,
              height: 100
            }
          }, */
          tooltip: {},
          series: []
        }
        this.option = option
      }
    },
    setChart() {
      this.clearTimer()
      this.chartInstance && this.chartInstance.clear()
      if (this.chartData && this.chartData.length) {
        const data = ChartTool.transData(this.chartData, this.xPath, this.yPath, this.legendPath)

        const serieOption = {
          type: 'pie',
          radius: this.radius
        }

        ChartTool.setPieOption(data, this.option, serieOption)

        if (this.chartInstance) {
          this.chartInstance.setOption(this.option)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.chart-view {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;

  img {
    position: absolute;
    width: auto;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-top: 50px;
    box-sizing: border-box;
  }

  .chart-container {
    width: 100%;
    height: 100%;

    &.showBg {
      background: url('../assets/piebj.png') center center no-repeat;
      background-size: contain;
    }
  }
}
</style>
