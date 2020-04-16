<template>
  <!-- 对话框 -->
  <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    @closed="clearForm"
  >
    <!-- 对话框内容 -->
    <el-form
      ref="addUserRef"
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
    <!-- 对话框按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddUserDialog',
  data() {
    // TODO 复杂密码
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.addUserForm.checkPass !== '') {
          this.$refs.addUserRef.validateField('checkPass')
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
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [
          { required: true, validator: validateCheckPass, trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 点击确定按钮后 先进行表单预校验
    save() {
      this.$refs.addUserRef.validate((res) => {
        if (!res) return
        this.$emit('saveChange', this.addUserForm)
      })
    },
    cancel() {
      this.$emit('cancelDialog')
    },
    handleClose() {
      return this.$emit('cancelDialog')
    },
    // 对话框关闭 重置表单
    clearForm() {
      this.$refs.addUserRef.resetFields('addUserForm')
    }
  },
  components: {}
}
</script>

<style scoped>
.el-input {
  width: 80%;
  margin-left: -80px;
}
</style>
