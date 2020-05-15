export default class ChartTool {
  static initChart() {
    /* let chartDom = this.$el;
    let domClass = chartDom.getAttribute("class");
    if (!domClass.includes("chart-container")) {
      chartDom = chartDom.getElementsByClassName("chart-container")[0];
    }
    if (chartDom) {
      this.chartInstance = echarts.init(chartDom);
      this.chartInstance.on("click", params => {
        let obj = {};
        this.parameter.forEach((item, index) => {
          if (index == 0) {
            obj[item] = [params.name];
          } else if (index == 1) {
            obj[item] = [params.seriesName];
          }
        });
        this.$emit("itemClick", obj);
      });

      // 监听窗口变化 - 多个图表同时刷新
      chartDom.addEventListener("resize", () => {
        console.log('resize');

        this.chartInstance.resize();
      });
    } else {
      console.warn("无法实例化LineChart");
    } */
  }

  static transData(chartData, xPath, yPath, legendPath) {
    if (!chartData || !chartData.length) {
      return null
    }

    let xArr = []
    const yArr = []
    let legendArr = []
    const data = {}

    chartData.map(d => {
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

  static setRadar(chartData, xPath, yPath, chartOption, serieOption) {
    if (!chartData || !chartData.length) {
      return null
    }

    chartOption.series = [{
      type: 'radar',
      data: [{
        value: []
      }]
    }]

    chartData.map(d => {
      const x = d[xPath]
      const y = d[yPath]

      chartOption.radar.indicator.push({
        name: x
      })

      chartOption.series[0].data[0].value.push(y)
    })
  }
}
