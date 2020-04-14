<template>
  <div>
    <h2>"HOME"</h2>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {}
  },
  methods: {
    logout() {
      sessionStorage.clear('token')
      this.$message.error({
        showClose: true,
        message: '已退出',
        center: true,
        duration: 1000
      })
      this.$router.push('/login')
    }
  },
  components: {}
}
</script>

<style lang="less" scoped></style>
