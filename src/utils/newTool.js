import echarts from "echarts";

export default class ChartTool {
  static base = {
    data() {
      return {
        chartInstance: null,
        option: null,
        timer: null,
        lockIndex: -1,
        lastIndex: -1,
        already: false,
        // legendData: []
      };
    },
    props: {
      /* autoPlay: {
        type: Boolean,
        default: false
      } */
      xPath: {
        type: String,
        default: "name",
      },
      yPath: {
        type: String,
        default: "value",
      },
      legendPath: {
        type: String,
      },
      chartData: {
        type: Array,
      },
      formatter: {
        type: String,
      },
      color: {
        type: Array,
      },
      legendName: {
        type: Array,
      },
    },
    mounted() {
      this.getOption();
      if (!this.legend) {
        this.already = true;
        this.initChart();
        this.setChart();
      }
    },
    updated() {
      if (this.legend && !this.already) {
        this.already = true;
        this.initChart();
        this.setChart();
      }
    },
    methods: {
      initChart() {
        // debugger; //eslint-disable-line
        let container = this.$el;
        if (this.legend) {
          container = this.$el.firstElementChild;
        }
        console.assert(container, "无法实例化LineChart");
        this.chartInstance = echarts.init(container);

        // 注册项点击事件
        this.chartInstance.on("click", (params) => {
          const obj = {};
          console.log("chart click item", params);
          this.parameter.forEach((item, index) => {
            if (index === 0) {
              obj[item] = [params.name];
            } else if (index === 1) {
              obj[item] = [params.seriesName];
            }
          });
          this.$emit("itemClick", obj);
        });

        // 监听窗口变化 - 多个图表同时刷新
        window.addEventListener("resize", () => {
          this.chartInstance && this.chartInstance.resize();
        });
      },
      getOption() {},
      setChart() {},
      // refreshData() {},
      enterLegend(sIndex, dIndex) {
        if (this.chartInstance) {
          this.leaveLegend(sIndex);
          this.chartInstance.dispatchAction({
            type: "highlight",
            seriesIndex: sIndex,
            dataIndex: dIndex,
          }); // 设置默认选中高亮部分
          this.lockIndex = dIndex;
        }
      },
      leaveLegend(sIndex) {
        if (this.lockIndex > -1) {
          this.chartInstance.dispatchAction({
            type: "downplay",
            seriesIndex: sIndex,
            dataIndex: this.lockIndex,
          });
          this.lockIndex = -1;
        }
      },
      clearTimer() {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      },
    },
    watch: {
      chartData: {
        deep: true,
        handler() {
          this.setChart();
        },
      },
    },
  };

  static transData(chartData, xPath, yPath, legendPath, dataOption) {
    if (!chartData || !chartData.length) {
      return null;
    }

    let xArr = [];
    const yArr = [];
    let legendArr = [];
    const data = {};
    let dataScale = 1;
    let precision = 0;
    let max = undefined;

    if (dataOption) {
      if (dataOption.dataScale) {
        dataScale = dataOption.dataScale;
        precision = dataOption.precision;
      }
      if (dataOption.useMax) {
        // debugger; //eslint-disable-line
        if (dataOption.useMax.max) {
          max = dataOption.useMax.max;
        } else {
          let values = chartData.map((d) => d[yPath]);
          max = Math.max.apply(null, values);
          max = max * dataScale;
        }
      }
    }
    chartData.map((d) => {
      const x = d[xPath];
      xArr.push(x);
      let y = d[yPath];
      if (dataScale != 1) {
        y = parseFloat((d[yPath] * dataScale).toFixed(precision));
      }

      if (legendPath) {
        const legend = d[legendPath];
        legendArr.push(legend);
        if (!data[legend]) {
          data[legend] = {};
        }
        data[legend][x] = y;
      } else {
        yArr.push(y);
      }
    });

    if (legendPath) {
      xArr = Array.from(new Set(xArr));
      legendArr = Array.from(new Set(legendArr));

      return {
        xArr: xArr,
        legendArr: legendArr,
        data: data,
        max: max,
      };
    } else {
      return {
        xArr: xArr,
        yArr: yArr,
        max: max,
      };
    }
  }

  static setOption(data, chartOption, serieOption, additionSerie) {
    chartOption.series = [];
    let dataObj = {};
    const legendArr = data.legendArr;
    const xArr = data.xArr;
    const dataTmp = data.data;

    //如果没有图例（单柱状图情况）
    if (!legendArr) {
      if (serieOption.usePictorial) {
        chartOption.xAxis[0].data = xArr;
      } else {
        chartOption.xAxis.data = xArr;
      }
      dataObj = {
        data: data.yArr,
      };
      Object.assign(dataObj, serieOption);
      if (additionSerie) {
        chartOption.series.push(additionSerie);
      }
      chartOption.series.push(dataObj);
      return;
    }

    //按照指定枚举颜色排序，且使用枚举指定颜色
    if (serieOption.enumColor && serieOption.enumColor.name) {
      legendArr.sort((a, b) => {
        return (
          serieOption.enumColor.name.indexOf(a) -
          serieOption.enumColor.name.indexOf(b)
        );
      });
    }
    for (let i = 0; i < legendArr.length; i++) {
      const legend = legendArr[i];
      if (!dataObj[legend]) {
        dataObj[legend] = {
          name: legend,
          data: [],
        };

        //产生引用关系，导致后面赋值dataObj后serieOption也会有itemStyle
        // Object.assign(dataObj[legend], serieOption);
        //简单深拷贝
        let copyOption = JSON.parse(JSON.stringify(serieOption));

        Object.assign(dataObj[legend], copyOption);
        if (copyOption.enumColor && Object.keys(copyOption.enumColor).length) {
          if (!dataObj[legend].itemStyle) {
            dataObj[legend].itemStyle = {};
          }

          dataObj[legend].itemStyle["color"] =
            copyOption.enumColor.enum[legend];
          /*  dataObj[legend].itemStyle = {
            color: serieOption.enumColor.enum[legend],
          }; */
          //对象会导致都删除
          // delete dataObj[legend]["enumColor"];
          delete dataObj[legend]["enumColor"];
        }
      }

      for (let j = 0; j < xArr.length; j++) {
        const x = xArr[j];
        dataObj[legend].data.push(dataTmp[legend][x]);
      }

      if (additionSerie) {
        additionSerie.name = legend;
        chartOption.series.push(additionSerie);
      }
      chartOption.series.push(dataObj[legend]);
    }
    chartOption.legend.data = legendArr;
    if (serieOption.useStrip) {
      chartOption.yAxis.data = xArr;
    } else if (serieOption.usePictorial) {
      chartOption.xAxis[0].data = xArr;
    } else if (serieOption.useAngle) {
      chartOption.angleAxis["data"] = xArr;
    } else if (serieOption.useRadius) {
      chartOption.radiusAxis["data"] = xArr;
    } else {
      chartOption.xAxis.data = xArr;
    }
    // console.log(chartOption);
  }

  static setRadarOption(data, chartOption, serieOption) {
    if (!chartOption) {
      return;
    }
    chartOption.radar.indicator = [];
    chartOption.series = [];
    let dataObj = {};
    const legendArr = data.legendArr;
    const xArr = data.xArr;
    const yArr = data.yArr;
    const dataTmp = data.data;
    let max = undefined;

    // debugger; //eslint-disable-line
    if (serieOption && serieOption.useMax) {
      if (serieOption.useMax.max) {
        max = serieOption.useMax.max;
      }
    }

    const serieObj = {
      data: [],
    };
    Object.assign(serieObj, serieOption);
    chartOption.radar.indicator = xArr.map((x) => {
      let idc = {
        name: x,
      };
      if (max) {
        idc.max = max;
      }
      return idc;
    });
    if (!legendArr) {
      dataObj = {
        value: yArr,
      };
      serieObj.data.push(dataObj);
    } else {
      for (let i = 0; i < legendArr.length; i++) {
        const legend = legendArr[i];
        if (!dataObj[legend]) {
          dataObj[legend] = {
            name: legend,
            value: [],
          };
        }

        for (let j = 0; j < xArr.length; j++) {
          const x = xArr[j];
          dataObj[legend].value.push(dataTmp[legend][x]);
        }
        // debugger
        serieObj.data.push(dataObj[legend]);
      }
    }
    chartOption.series.push(serieObj);
  }

  static setPieOption(data, chartOption, serieOption) {
    if (!chartOption) {
      return;
    }
    chartOption.series = [];
    const dataObj = {};
    const legendArr = data.legendArr;
    const xArr = data.xArr;
    const yArr = data.yArr;
    const dataTmp = data.data;

    if (!legendArr) {
      // chartOption.legend.data = xArr
      const serieObj = {
        radius: serieOption.radius,
        data: [],
      };
      Object.assign(serieObj, serieOption);
      for (let i = 0; i < xArr.length; i++) {
        serieObj.data.push({
          name: xArr[i],
          value: yArr[i],
        });
      }

      chartOption.series.push(serieObj);
      chartOption.legend.data = xArr;
      return;
    }

    for (let i = 0; i < legendArr.length; i++) {
      const legend = legendArr[i];s
      if (!dataObj[legend]) {
        dataObj[legend] = {
          name: legend,
          data: [],
        };

        Object.assign(dataObj[legend], serieOption);

        // overwrite radius
        if (serieOption.radius && serieOption.radius.length) {
          dataObj[legend].radius = [
            serieOption.radius[i * 2],
            serieOption.radius[i * 2 + 1],
          ];
        }
      }

      for (let j = 0; j < xArr.length; j++) {
        const x = xArr[j];
        dataObj[legend].data.push({
          name: x,
          value: dataTmp[legend][x],
        });
      }

      chartOption.series.push(dataObj[legend]);
    }
    chartOption.legend.data = xArr;
  }
}
