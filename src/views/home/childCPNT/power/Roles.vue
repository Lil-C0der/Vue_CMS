<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="1">
        <el-button type="primary" @click="addRoleDialogVisble = true"
          >添加角色</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格 -->
    <div class="text item">
      <roles-table :rolesList="rolesList" />
    </div>

    <!-- 对话框 -->
    <Dialog
      :title="'添加用户'"
      :dialogVisible="addRoleDialogVisble"
      @cancelDialog="cancelDialog('addRoleDialogVisble')"
      @saveChange="saveAddRole('addRoleFormRef')"
      @clearForm="clearForm('addRoleFormRef')"
    >
      <add-role-form ref="addRoleFormRef" />
    </Dialog>
  </el-card>
</template>

<script>
import RolesTable from './RolesTable'
import AddRoleForm from './AddRoleForm'
import Dialog from 'components/common/Dialog'

import { getRolesList, addRole } from 'network/roles'
export default {
  name: 'Roles',
  data() {
    return {
      rolesList: [],
      addRoleDialogVisble: false
    }
  },
  components: {
    RolesTable,
    Dialog,
    AddRoleForm
  },
  methods: {
    // 获取角色列表
    getRolesList() {
      getRolesList().then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: res.meta.msg,
            center: true,
            showClose: true,
            duration: 1000
          })
        }
        this.$message.success({
          showClose: true,
          message: res.meta.msg,
          center: true,
          duration: 1000
        })
        this.rolesList = res.data
      })
    },
    cancelDialog(visble) {
      this[visble] = false
    },
    // 重置表单 参数ref为表单的引用
    clearForm(ref) {
      this.$refs[ref].$refs.formRef.resetFields()
      console.log('reset')
    },
    // 表单预校验
    preCheck(ref) {
      return this.$refs[ref].$refs.formRef.validate()
    },
    // 添加新的角色
    saveAddRole(ref) {
      this.preCheck(ref)
        .then(() => {
          console.log(this.$refs[ref].addRoleForm)
          const { roleName, roleDesc } = this.$refs[ref].addRoleForm
          return addRole(roleName, roleDesc)
        })
        .then((res) => {
          if (res.meta.status !== 201) {
            return this.$message.error({
              message: res.meta.msg,
              center: true,
              showClose: true,
              duration: 1000
            })
          }
          this.$message.success({
            message: res.meta.msg,
            center: true,
            showClose: true,
            duration: 1000
          })
          // 更新视图
          this.getRolesList()
          this.cancelDialog('addRoleDialogVisble')
        })
    }
  },
  mounted() {
    this.getRolesList()
  }
}
</script>

<style scoped>
.item {
  padding: 18px 0;
}
.box-card {
  width: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
</style>
