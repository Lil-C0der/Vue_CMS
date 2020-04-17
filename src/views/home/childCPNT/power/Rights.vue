<template>
  <el-card>
    <rights-table :rightsList="rightsList" />
  </el-card>
</template>

<script>
import RightsTable from './RightsTable'

import { getRightsList } from 'network/rights'

export default {
  name: 'Rights',
  data() {
    return {
      rightsList: []
    }
  },
  components: {
    RightsTable
  },
  methods: {
    // 获取权限列表 参数type为list或tree
    getRightsList(type) {
      getRightsList(type).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: res.meta.msg,
            center: true,
            showClose: true,
            duration: 1000
          })
        }
        this.$message.success({
          showClose: true,
          message: res.meta.msg,
          center: true,
          duration: 1000
        })
        this.rightsList = res.data
      })
    }
  },
  mounted() {
    this.getRightsList('list')
  }
}
</script>

<style scoped></style>
