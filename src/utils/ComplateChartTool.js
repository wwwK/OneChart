import echarts from 'echarts'

export default class ChartTool {
  static base = {
    data() {
      return {
        chartInstance: null,
        option: null,
        timer: null,
        lockIndex: -1,
        lastIndex: -1,
        already: false
        // legendData: []
      }
    },
    props: {
      /* autoPlay: {
        type: Boolean,
        default: false
      } */
      xPath: {
        type: String,
        default: 'name'
      },
      yPath: {
        type: String,
        default: 'value'
      },
      userLegend: {
        type: Boolean,
        default: false
      },
      legendPath: {
        type: String
      },
      color: {
        type: Array
      },
      legendName: {
        type: Array
      },
      chartData: {
        type: Array
      }
    },
    mounted() {
      /* this.$nextTick(() => {
         this.getOption()
         this.initChart()
         this.setChart()
       }) */

      this.getOption()
      if (!this.legend) {
        this.initChart()
        this.setChart()
      }
    },
    updated() {
      // debugger; //eslint-disable-line
      // console.log('update', this)
      if (this.legend && !this.already) {
        this.already = true
        this.initChart()
        this.setChart()
      }
    },
    methods: {
      initChart() {
        // debugger; //eslint-disable-line
        let container = this.$el
        // console.log(this)
        if (this.legend) {
          container = this.$el.firstElementChild
        }
        console.assert(container, '无法实例化LineChart')
        this.chartInstance = echarts.init(container)

        // 注册项点击事件
        this.chartInstance.on('click', (params) => {
          const obj = {}
          console.log('chart click item', params)
          this.parameter.forEach((item, index) => {
            if (index === 0) {
              obj[item] = [params.name]
            } else if (index === 1) {
              obj[item] = [params.seriesName]
            }
          })
          this.$emit('itemClick', obj)
        })

        // 监听窗口变化 - 多个图表同时刷新
        window.addEventListener('resize', () => {
          this.chartInstance && this.chartInstance.resize()
        })
      },
      getOption() {},
      setChart() {},
      // refreshData() {},
      enterLegend(sIndex, dIndex) {
        // console.log('enter', index)
        if (this.chartInstance) {
          this.leaveLegend(sIndex, this.lockIndex)
          this.chartInstance.dispatchAction({
            type: 'highlight',
            seriesIndex: sIndex,
            dataIndex: dIndex
          }) // 设置默认选中高亮部分
          this.lockIndex = dIndex
        }
      },
      leaveLegend(sIndex, dIndex) {
        if (this.lockIndex > -1) {
          this.chartInstance.dispatchAction({
            type: 'downplay',
            seriesIndex: sIndex,
            dataIndex: this.lockIndex
          })
          this.lockIndex = -1
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
  };

  static transData(chartData, xPath, yPath, legendPath) {
    if (!chartData || !chartData.length) {
      return null
    }

    let xArr = []
    const yArr = []
    let legendArr = []
    const data = {}

    chartData.map((d) => {
      const x = d[xPath]
      xArr.push(x)

      if (legendPath) {
        const legend = d[legendPath]
        legendArr.push(legend)
        if (!data[legend]) {
          data[legend] = {}
        }
        data[legend][x] = d[yPath]
      } else {
        const y = d[yPath]
        yArr.push(y)
      }
    })

    if (legendPath) {
      xArr = Array.from(new Set(xArr))
      legendArr = Array.from(new Set(legendArr))

      return {
        xArr: xArr,
        legendArr: legendArr,
        data: data
      }
    } else {
      return {
        xArr: xArr,
        yArr: yArr
      }
    }
  }

  static setOption(data, chartOption, serieOption) {
    chartOption.series = []
    const dataObj = {}
    const legendArr = data.legendArr
    const xArr = data.xArr
    const dataTmp = data.data

    if (!legendArr) {
      chartOption.xAxis.data = xArr
      chartOption.series = [{
        data: data.yArr
      }]
      return
    }

    for (let i = 0; i < legendArr.length; i++) {
      const legend = legendArr[i]
      if (!dataObj[legend]) {
        dataObj[legend] = {
          name: legend,
          data: []
        }
        Object.assign(dataObj[legend], serieOption)
      }

      for (let j = 0; j < xArr.length; j++) {
        const x = xArr[j]
        dataObj[legend].data.push(dataTmp[legend][x])
      }

      chartOption.series.push(dataObj[legend])
    }
    chartOption.xAxis.data = xArr
    chartOption.legend.data = legendArr
  }

  /* static setRadar(chartData, xPath, yPath, chartOption, serieOption) {
    if (!chartData || !chartData.length) {
      return null
    }

    chartOption.series = [{
      type: 'radar',
      data: [{
        value: []
      }]
    }]

    // multiple is push series[0].data
    chartData.map(d => {
      const x = d[xPath]
      const y = d[yPath]

      chartOption.radar.indicator.push({
        name: x
      })

      //雷达push多个serie和一个serie的data  push多个效果一样，简单效果
      chartOption.series[0].data[0].value.push(y)
    })
  } */

  static setRadarOption(data, chartOption, serieOption) {
    if (!chartOption) {
      return
    }
    chartOption.radar.indicator = []
    chartOption.series = []
    let dataObj = {}
    const legendArr = data.legendArr
    const xArr = data.xArr
    const yArr = data.yArr
    const dataTmp = data.data

    const serieObj = {
      data: []
    }
    Object.assign(serieObj, serieOption)
    chartOption.radar.indicator = xArr.map(x => {
      return {
        name: x
      }
    })
    if (!legendArr) {
      dataObj = {
        value: yArr
      }
      serieObj.data.push(dataObj)
    } else {
      for (let i = 0; i < legendArr.length; i++) {
        const legend = legendArr[i]
        if (!dataObj[legend]) {
          dataObj[legend] = {
            name: legend,
            value: []
          }
        }

        for (let j = 0; j < xArr.length; j++) {
          const x = xArr[j]
          dataObj[legend].value.push(
            dataTmp[legend][x]
          )
        }
        // debugger
        serieObj.data.push(dataObj[legend])
      }
    }
    chartOption.series.push(serieObj)
  }

  static setPieOption(data, chartOption, serieOption) {
    if (!chartOption) {
      return
    }
    chartOption.series = []
    const dataObj = {}
    const legendArr = data.legendArr
    const xArr = data.xArr
    const yArr = data.yArr
    const dataTmp = data.data

    if (!legendArr) {
      // chartOption.legend.data = xArr
      const serieObj = {
        radius: serieOption.radius,
        data: []
      }
      Object.assign(serieObj, serieOption)
      for (let i = 0; i < xArr.length; i++) {
        serieObj.data.push({
          name: xArr[i],
          value: yArr[i]
        })
      }

      chartOption.series.push(serieObj)
      chartOption.legend.data = xArr
      return
    }

    for (let i = 0; i < legendArr.length; i++) {
      const legend = legendArr[i]
      if (!dataObj[legend]) {
        // 这是有规律 环图 间隔和宽度固定，无规律的呢？比如内部饼图，外部细环图
        /*  starRadius=parseFloat(this.starRadius)+
          endRadius=parseFloat(this.starRadius) + this.width*(i+1); */

        dataObj[legend] = {
          name: legend,
          data: []
        }

        Object.assign(dataObj[legend], serieOption)

        // overrite radius
        if (serieOption.radius && serieOption.radius.length) {
          dataObj[legend].radius = [serieOption.radius[i * 2], serieOption.radius[i * 2 + 1]]
        }
      }

      for (let j = 0; j < xArr.length; j++) {
        const x = xArr[j]
        dataObj[legend].data.push({
          name: x,
          value: dataTmp[legend][x]
        })
      }

      chartOption.series.push(dataObj[legend])
    }
    chartOption.legend.data = xArr
  }
}
