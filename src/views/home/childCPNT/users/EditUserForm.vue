<template>
  <el-form
    ref="formRef"
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
</template>

<script>
export default {
  name: 'EditUserForm',
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
  props: {
    editUserForm: {
      id: '',
      username: '',
      email: '',
      mobile: ''
    }
  },
  components: {}
}
</script>

<style scoped></style>
