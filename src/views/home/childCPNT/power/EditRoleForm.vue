<template>
  <el-form
    ref="formRef"
    :model="editRoleForm"
    :rules="editRoleFormRules"
    label-width="80px"
  >
    <el-form-item label="角色名" prop="roleName">
      <el-input v-model="editRoleForm.roleName"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="roleDesc">
      <el-input v-model="editRoleForm.roleDesc"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'EditRoleForm',
  data() {
    return {
      editRoleFormRules: {
        roleName: [{ required: true, message: '请输入角色名', trigger: 'blur' }]
      }
    }
  },
  props: {
    editRoleForm: {
      id: '',
      roleName: '',
      roleDesc: ''
    }
  },
  components: {}
}
</script>

<style scoped></style>
