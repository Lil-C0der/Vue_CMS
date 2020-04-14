<template>
  <div class="skip-container">
    <div class="skip-alert">
      尚未登录
      <div class="skip-countdown">将在{{ time }}秒后跳转</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'skip',
  data() {
    return {
      time: 5
    }
  },
  mounted() {
    const timer = setInterval(() => {
      if (this.time <= 0) {
        clearInterval(timer)
        // 倒计时结束后 强制跳转登录页面
        this.$router.push('/login')
        return
      }
      this.time--
    }, 1000)
  },
  components: {}
}
</script>

<style lang="less" scoped>
@bgc: #2b4b6b;
.skip-container {
  background-color: @bgc;
  width: 100%;
  height: 100%;
  .skip-alert {
    width: 400px;
    font-size: 50px;
    font-weight: 700;
    color: #fff;
    position: absolute;
    left: 50%;
    margin-left: -200px;
    text-align: center;
    line-height: 1.5;
    margin-top: 40px;
    .skip-countdown {
      margin-top: 20px;
      font-size: 28px;
    }
  }
}
</style>
