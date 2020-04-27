<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="1">
        <el-button type="primary" @click="addRoleDialogVisible = true"
          >添加角色</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格 -->
    <div class="text item">
      <roles-table
        :rolesList="rolesList"
        @editRole="showRoleInfo"
        @deleteBtnClick="deleteRole"
        @settingBtnClick="showRightsInfo"
      />
    </div>

    <!-- 添加角色对话框 -->
    <Dialog
      title="添加角色"
      :dialogVisible="addRoleDialogVisible"
      @cancelDialog="cancelDialog('addRoleDialogVisible')"
      @saveChange="saveAddRole('addRoleFormRef')"
      @closeDialog="clearForm('addRoleFormRef')"
    >
      <add-role-form ref="addRoleFormRef" />
    </Dialog>

    <!-- 编辑角色对话框 -->
    <Dialog
      title="编辑角色"
      :dialogVisible="editRoleDialogVisible"
      @cancelDialog="cancelDialog('editRoleDialogVisible')"
      @saveChange="saveEditRole('editRoleFormRef')"
    >
      <edit-role-form ref="editRoleFormRef" :editRoleForm="editRoleForm">
      </edit-role-form>
    </Dialog>

    <!-- 分配权限对话框 -->
    <Dialog
      title="分配权限"
      :dialogVisible="setRightsDialogVisible"
      @cancelDialog="cancelDialog('setRightsDialogVisible')"
      @saveChange="setRoleRights(currentRoleId, rightsId)"
      @closeDialog="roleRightsIds = []"
    >
      <!-- 树形控件 -->
      <rights-tree
        :defCheckedKeys="roleRightsIds"
        :rightsList="rightsList"
        ref="roleRightsTreeRef"
      />
    </Dialog>
  </el-card>
</template>

<script>
import RolesTable from './RolesTable'
import AddRoleForm from './AddRoleForm'
import EditRoleForm from './EditRoleForm'
import RightsTree from './RightsTree'
import Dialog from 'components/common/Dialog'

import {
  getRolesList,
  addRole,
  getRoleById,
  modifyRole,
  deleteRoleById,
  deleteRightById,
  setRoleRightsById
} from 'network/roles'

import { getRightsList } from 'network/rights'

export default {
  name: 'Roles',
  data() {
    return {
      rolesList: [],
      addRoleDialogVisible: false,
      editRoleDialogVisible: false,
      // 将被修改的角色信息
      editRoleForm: {},
      setRightsDialogVisible: false,
      rightsList: [],
      // 即将分配权限的角色下所有权限的id
      roleRightsIds: [],
      // 即将分配权限的角色id
      currentRoleId: 0
    }
  },
  computed: {
    // 修改后的权限id 为字符串
    rightsId() {
      const idArr = [
        ...this.$refs.roleRightsTreeRef.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.roleRightsTreeRef.$refs.treeRef.getHalfCheckedKeys()
      ]
      // 将数组转成用','分隔的字符串
      return idArr.toString()
    }
  },

  components: {
    RolesTable,
    Dialog,
    AddRoleForm,
    EditRoleForm,
    RightsTree
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
    // 关闭对话框
    cancelDialog(visble) {
      this[visble] = false
    },
    // 重置表单 参数ref为表单的引用
    clearForm(ref) {
      this.$refs[ref].$refs.formRef.resetFields()
    },
    // 表单预校验
    preCheck(ref) {
      return this.$refs[ref].$refs.formRef.validate()
    },
    // 添加新的角色
    saveAddRole(ref) {
      this.preCheck(ref)
        .then(() => {
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
          this.cancelDialog('addRoleDialogVisible')
        })
        .catch(() => {
          return false
        })
    },
    // 根据角色id查询角色
    showRoleInfo(id) {
      getRoleById(id).then((res) => {
        this.editRoleForm = res.data
      })
      // 显示对话框
      this.editRoleDialogVisible = true
    },
    // 修改角色信息并保存
    saveEditRole(ref) {
      // 表单预校验
      this.preCheck(ref)
        .then(() => {
          const { roleId, roleName, roleDesc } = this.editRoleForm
          return modifyRole(roleId, roleName, roleDesc)
        })
        .then((res) => {
          if (res.meta.status !== 200) {
            return this.$message.error({
              message: res.meta.msg,
              center: true,
              showClose: true,
              duration: 1000
            })
          }
          this.$message.success({
            message: '更新成功',
            center: true,
            showClose: true,
            duration: 1000
          })
          // 更新视图
          this.getRolesList()
          this.cancelDialog('editRoleDialogVisible')
        })
    },
    // 删除角色
    deleteRole(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return deleteRoleById(id)
        })
        .then((res) => {
          // 在数据库中删除对应角色 并重新渲染页面
          if (res.meta.status !== 200) {
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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 删除角色的权限
    deleteRight(ids) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const { roleId, rightId } = ids
          // 删除权限
          return deleteRightById(roleId, rightId)
        })
        .then((res) => {
          if (res.meta.status !== 200) {
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
          const role = this.rolesList.find((n) => {
            // 返回被操作的角色
            return n.id === ids.roleId
          })
          role.children = res.data
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 查询角色权限 role为角色的id和权限
    showRightsInfo(role) {
      // 保存当前角色的id
      this.currentRoleId = role.id
      // 获取所有权限列表
      getRightsList('tree').then((res) => {
        if (res.meta.status !== 200) {
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
        this.rightsList = res.data
      })
      /**
       * 对一级权限数组中的每个元素调用getLeafKeys
       * 将三级权限的id添加到数组roleRightsIds中
       **/
      role.rights.forEach((n) => {
        this.getLeafKeys(n, this.roleRightsIds)
      })
      this.setRightsDialogVisible = true
    },
    // 递归获取角色下三级权限的id
    getLeafKeys(node, arr) {
      if (!node.children) {
        arr.push(node.id)
        return arr
      } else {
        node.children.forEach((n) => this.getLeafKeys(n, arr))
      }
    },
    // 保存对角色权限的改动 rids为字符串
    setRoleRights(roleId, rids) {
      setRoleRightsById(roleId, rids).then((res) => {
        if (res.meta.status !== 200) {
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
        this.setRightsDialogVisible = false
        // 刷新页面
        this.getRolesList()
      })
    }
  },
  created() {
    this.$bus.$on('removeTag', (ids) => {
      this.deleteRight(ids)
    })
  },
  mounted() {
    this.getRolesList()
  },
  beforeDestroy() {
    this.$bus.$off('removeTag')
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
