<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import { debounce } from '@/utils'

const animationDuration = 3000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    raddarData: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      const bottomName = '上周各数据新增速度'
      const raddarDataArr = this.raddarData
      const args = ['totalUserCount', 'totalForumCount', 'totalRepairCount', 'totalMessageCount', 'totalSupllyCount']
      const args2 = ['用户', '帖子', '报修', '消息', '供求']
      const seriesData = []
      const indicatorData = []
      const raddarDataArrLength = raddarDataArr.length
      let tempMaxNumber = 0
      args.map((r, index) => {
        let tempData = 0
        tempData = raddarDataArr[raddarDataArrLength - 1][args[index]] - raddarDataArr[0][args[index]]
        seriesData.push(tempData)

        if (tempMaxNumber < tempData) {
          tempMaxNumber = tempData
        }
      })

      args2.map(arg => {
        const tempObj = {}
        tempObj.name = arg
        tempObj.max = tempMaxNumber + 50 > 100 ? tempMaxNumber + 50 : 200
        indicatorData.push(tempObj)
      })

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '45%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: indicatorData
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: [bottomName]
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: [
            {
              value: seriesData,
              name: bottomName
            }
          ],
          animationDuration: animationDuration
        }]
      })
    }
  }
}
</script>
