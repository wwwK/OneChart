<template>
  <div class="chart-view">
    <div class="chart-container" :class="{ showBg: showBackground }" :style="chartStyle"></div>
    <div class="legend-container scroll">
      <ul v-if="legend">
        <!-- 理论上事件要在自定义组件最好 -->
        <li
          v-for="(item, index) in legendData"
          :key="index"
          :class="{ highlight: index == lockIndex }"
          v-on:mouseenter="enterLegend(item.sIndex, index)"
          v-on:mouseleave="leaveLegend(item.sIndex, index)"
        >
          <component v-bind:is="legend" :legendItem="item" keep-alive></component>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ChartTool from '../utils/ComplateChartTool.js'
import RateLegend from './RateLegend.vue'
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
    legend: {
      type: String
    },
    showBackground: {
      type: Boolean,
      default: false
    }
  },
  components: {
    RateLegend
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
    },
    legendData: function() {
      let data = []
      /*  if (this.option && this.option.legend) {
        data = this.option.legend.data
      }
      console.log('legend data', data) */
      if (this.option && this.option.series) {
        for (let i = 0; i < this.option.series.length; i++) {
          console.log(444, this.option.series[i].data)
          let arr = this.option.series[i].data

          //利用引用类型 。let arr =Array.from is undefined ,not know
          Array.from(arr, d => {
            console.log(d)
            d.sIndex = i
          })

          console.log(123, ...arr)
          data.push(...arr)
        }
      }
      console.log('legend data', data)
      return data
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
            icon: 'rect',
            data: []
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
        // console.log(this.option.legend.data)

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
