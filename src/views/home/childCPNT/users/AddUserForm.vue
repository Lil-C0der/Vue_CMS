<template>
  <el-form
    ref="formRef"
    :model="addUserForm"
    :rules="addUserFormRules"
    label-width="80px"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="addUserForm.username"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="addUserForm.email"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
      <el-input v-model.number="addUserForm.mobile"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input
        type="password"
        v-model="addUserForm.pass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        type="password"
        v-model="addUserForm.checkPass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AddUserForm',
  data() {
    // 自定义密码校验规则
    // TODO 复杂密码
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.addUserForm.checkPass !== '') {
          this.$refs.formRef.validateField('checkPass')
        }
        callback()
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addUserForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 添加新用户数据
      addUserForm: {
        username: '',
        email: '',
        mobile: '',
        pass: '',
        checkPass: ''
      },
      // 表单验证规则
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        // TODO 手机号正则表达式
        mobile: [{ type: 'number', message: '请输入正确的电话号码' }],
        // 密码和确认密码校验
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [
          { required: true, validator: validateCheckPass, trigger: 'blur' }
        ]
      }
    }
  },
  components: {},
  methods: {}
}
</script>

<style scoped></style>
