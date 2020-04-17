<template>
  <el-form
    ref="formRef"
    :model="addRoleForm"
    :rules="addRoleFormRules"
    label-width="80px"
  >
    <el-form-item label="角色名称" prop="roleName">
      <el-input v-model="addRoleForm.roleName"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="roleDesc">
      <el-input v-model="addRoleForm.roleDesc"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AddRoleForm',
  data() {
    return {
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      addRoleFormRules: {
        roleName: [{ required: true, message: '请输入角色名', trigger: 'blur' }]
      }
    }
  },
  components: {}
}
</script>

<style scoped></style>
