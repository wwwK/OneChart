<template>
  <div class="chart-view">
    <div class="chart-container"></div>
    <div class="legend-container scroll">
      <ul v-if="legend">
        <li
          v-for="(item, index) in legendData"
          :key="index"
          :class="{ highlight: index == lockIndex }"
          v-on:mouseenter="enterLegend(item.sIndex, index)"
          v-on:mouseleave="leaveLegend(item.sIndex, index)"
        >
          <component v-bind:is="legend" :legendItem="item" defaultUnit="个" keep-alive></component>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ChartTool from '../utils/ComplateChartTool.js'
import RateLegend from './RateLegend.vue'
export default {
  mixins: [ChartTool.base],
  props: {
    legend: {
      type: String
    },
    max: {
      type: Number
    },
    color: {
      default: () => ['#FEB34E', '#2CBDD3']
    }
  },
  components: {
    RateLegend
  },
  mounted() {
    console.log('Extend Chart')
  },
  computed: {
    legendData: function() {
      const data = []
      if (this.option && this.option.series) {
        const sData = this.option.series[0].data
        const indicator = this.option.radar.indicator
        for (let i = 0; i < sData.length; i++) {
          const arr = indicator.map((item, index) => {
            return {
              name: item.name,
              sIndex: i,
              value: sData[i].value[index]
            }
          })
          data.push(...arr)
        }
      }
      return data
    }
  },
  methods: {
    getOption() {
      if (!this.option) {
        const option = {
          tooltip: {},
          radar: {
            name: {
              textStyle: {
                color: '#525252 ',
                fontSize: 12
              }
            },
            indicator: []
          },
          series: []
        }
        this.option = option
      }
    },
    setChart() {
      this.clearTimer()
      this.chartInstance && this.chartInstance.clear()

      if (this.chartData && this.chartData.length) {
        const serieOption = {
          type: 'radar',
          areaStyle: {
            normal: {
              opacity: 0.3
            }
          },
          symbolSize: 6
        }
        const data = ChartTool.transData(this.chartData, this.xPath, this.yPath, this.legendPath)
        // console.log(data)

        ChartTool.setRadarOption(data, this.option, serieOption)

        if (this.chartInstance) {
          console.log(JSON.stringify(this.option))
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
  align-items: center;
  justify-content: space-between;

  .chart-container {
    width: 100%;
    height: 100%;

    &.showBg {
      background: url('../assets/piebj.png') center center no-repeat;
      background-size: contain;
    }
  }

  .legend-container {
    li {
      list-style: none;
    }
  }
}
</style>
