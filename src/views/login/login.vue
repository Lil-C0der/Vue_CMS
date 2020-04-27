<template>
  <div class="login-container">
    <login-box @login="login"></login-box>
  </div>
</template>

<script>
import LoginBox from 'views/login/childCPNT/LoginBox'

import { loginCheck } from 'network/login'

import { mapMutations } from 'vuex'
import { USERLOGIN, USERLOGOUT } from 'store/types'
export default {
  name: 'login',
  data() {
    return {}
  },
  methods: {
    ...mapMutations([USERLOGIN, USERLOGOUT]),
    // 登录
    async login($event) {
      // 校验
      const res = await loginCheck($event.uname, $event.pwd)
      // 登录失败
      if (res.meta.status !== 200) {
        return this.$message.error({
          showClose: true,
          message: res.meta.msg,
          center: true,
          duration: 1000
        })
      }
      // 登录成功
      this.$message.success({
        showClose: true,
        message: res.meta.msg,
        center: true,
        duration: 1000
      })
      // 保存token 用于权限验证
      this[USERLOGIN](res.data.token)
      this.$router.push('/home')
    }
  },
  components: {
    LoginBox
  }
}
</script>

<style lang="less" scoped>
@bgc: #2b4b6b;
.login-container {
  width: 100%;
  height: 100%;
  background-color: @bgc;
}
</style>
