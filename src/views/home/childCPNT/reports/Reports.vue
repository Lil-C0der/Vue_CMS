<template>
  <el-card>
    <div id="echarts" style="width: 100%; height: 400px;"></div>
  </el-card>
</template>

<script>
import echarts from '@/echarts'

import { getEchartsOpt } from 'network/reports'

export default {
  name: 'CPN',
  data() {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  components: {},
  methods: {
    initEcharts() {
      getEchartsOpt().then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: res.meta.msg,
            center: true,
            showClose: true,
            duration: 1000
          })
        }
        this.$message.success({
          message: res.meta.msg,
          center: true,
          showClose: true,
          duration: 1000
        })
        Object.assign(this.options, res.data)
        const myChart = echarts.init(document.getElementById('echarts'))
        myChart.setOption(this.options)
      })
    }
  },
  created() {},
  mounted() {
    this.initEcharts()
  }
}
</script>

<style scoped></style>
