<template>
  <div class="login-box">
    <div class="login-avatar">
      <img src="~assets/logo.png" alt="" />
    </div>

    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginFormRef"
      class="login-form"
    >
      <el-form-item prop="uname">
        <el-input
          placeholder="用户名"
          prefix-icon="el-icon-user-solid"
          v-model="loginForm.uname"
        ></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          placeholder="密码"
          show-password
          prefix-icon="el-icon-lock"
          v-model="loginForm.pwd"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-btn">
        <el-button type="primary" @click="submit('loginFormRef')"
          >登&emsp;录</el-button
        >
        <el-button type="info" @click="resetForm('loginFormRef')"
          >重&emsp;置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'loginBox',
  data() {
    return {
      loginForm: {
        uname: '',
        pwd: ''
      },
      rules: {
        uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  props: {},
  components: {},
  methods: {
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) return false
        this.$emit('login', {
          uname: this.loginForm.uname,
          pwd: this.loginForm.pwd
        })
      })
    },
    resetForm(form) {
      this.$refs[form].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
@login-box-bgc: #f6f6f6;
.login-box {
  width: 450px;
  height: 300px;
  background-color: @login-box-bgc;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;

  @avatarSize: 120px;
  .login-avatar {
    width: @avatarSize;
    height: @avatarSize;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #e6e6e6;
    background-color: @login-box-bgc;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.4);
    img {
      width: 100%;
      background-color: #e6e6e6;
      border-radius: 50%;
    }
  }
  .login-form {
    padding: 0 24px;
    padding-top: @avatarSize / 2 + 25px;
    position: relative;
    .form-btn {
      // float: right;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
