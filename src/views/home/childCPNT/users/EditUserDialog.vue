<template>
  <!-- 对话框 -->
  <el-dialog
    title="编辑用户信息"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <!-- 对话框内容 -->
    <el-form
      ref="editUserRef"
      :model="editUserForm"
      :rules="editUserFormRules"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input disabled v-model="editUserForm.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editUserForm.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model.number="editUserForm.mobile"></el-input>
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
  name: 'EditUserDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    editUserForm: {
      id: '',
      username: '',
      email: '',
      mobile: ''
    }
  },
  methods: {
    save() {
      // 表单预校验
      this.$refs.editUserRef.validate((res) => {
        if (!res) return false
        this.$emit('saveChange', this.editUserForm)
      })
    },
    cancel() {
      this.$emit('cancelDialog')
    },
    handleClose() {
      this.$emit('cancelDialog')
    }
  },
  data() {
    return {
      editUserFormRules: {
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        mobile: [{ type: 'number', message: '请输入正确的电话号码' }]
      }
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
