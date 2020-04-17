<template>
  <el-card class="box-card">
    <!-- 搜索与添加 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          clearable
          @clear="getUser(queryInfo)"
          v-model="queryInfo.query"
          placeholder="请输入内容"
        >
          <el-button
            slot="append"
            @click="queryUser(queryInfo.query)"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addDialogVisible = true"
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <div class="text item">
      <!-- 表单区域 -->
      <user-table
        @update:state="updateState"
        @editUser="showUserInfo"
        @deleteBtnClick="deleteUser"
        :userList="userList"
      ></user-table>
    </div>
    <!-- 添加用户对话框 -->
    <Dialog
      :title="'添加用户'"
      :dialogVisible="addDialogVisible"
      @cancelDialog="cancelDialog('addDialogVisible')"
      @saveChange="saveAddUser('addUserFormRef')"
      @clearForm="clearForm('addUserFormRef')"
    >
      <add-user-form ref="addUserFormRef" />
    </Dialog>

    <!-- 编辑用户对话框 -->
    <Dialog
      :title="'编辑用户'"
      :dialogVisible="editDialogVisible"
      @cancelDialog="cancelDialog('editDialogVisible')"
      @saveChange="saveEditUser('editUserFormRef', editUserForm)"
      @clearForm="clearForm('editUserFormRef')"
    >
      <!-- TODO 编辑用户表单 -->
      <edit-user-form ref="editUserFormRef" :editUserForm="editUserForm" />
    </Dialog>

    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2, 4, 10, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="this.queryInfo.pagesize"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import UserTable from './UserTable'
import Dialog from 'components/common/Dialog'
import EditUserForm from './EditUserForm'
import AddUserForm from './AddUserForm'

import {
  getUsersData,
  changeState,
  addUser,
  getUserById,
  modifyUser,
  deleteUserById
} from 'network/user'

export default {
  name: 'Users',
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      // user总记录数
      total: 0,
      // 添加用户对话框显示状态
      addDialogVisible: false,
      // 编辑用户对话框显示状态
      editDialogVisible: false,
      // 将被修改的用户的信息
      editUserForm: {}
    }
  },
  components: {
    UserTable,
    Dialog,
    AddUserForm,
    EditUserForm
  },
  methods: {
    // 渲染用户列表
    getUser(queryInfo) {
      const { query, pagenum, pagesize } = queryInfo
      getUsersData(query, pagenum, pagesize)
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
            showClose: true,
            message: res.meta.msg,
            center: true,
            duration: 1000
          })
          this.userList = res.data.users
          this.total = res.data.total
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            center: true,
            showClose: true,
            duration: 1000
          })
        })
    },
    // TODO 跳转最后一页
    // 页码值改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUser(this.queryInfo)
    },
    // 每页容量改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUser(this.queryInfo)
    },

    // 表单中开关状态变化 修改数据库中用户状态
    updateState(id, type) {
      changeState(id, type)
        .then((res) => {
          console.log(res)
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
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            center: true,
            showClose: true,
            duration: 1000
          })
        })
    },
    // 查询用户信息
    queryUser() {
      console.log(this.queryInfo.query)
      this.getUser(this.queryInfo)
    },
    // 关闭弹窗
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
    // 添加用户并关闭对话框
    saveAddUser(ref) {
      this.preCheck(ref)
        .then(() => {
          const {
            username,
            pass,
            email,
            mobile
          } = this.$refs.addUserFormRef.addUserForm
          return addUser(username, pass, email, mobile)
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
          this.getUser(this.queryInfo)
          // 关闭对话框
          this.cancelDialog('addDialogVisible')
        })
        .catch(() => {
          return false
        })
    },
    // 根据id展示要修改的用户信息
    showUserInfo(id) {
      getUserById(id).then((res) => {
        // 将电话转换成Number类型
        res.data.mobile -= 0
        const { id, username, email, mobile } = res.data
        this.editUserForm = { id, username, email, mobile }
      })
      this.editDialogVisible = true
    },
    // 修改用户信息并保存
    saveEditUser(ref, form) {
      this.preCheck(ref)
        .then(() => {
          const { id, email, mobile } = form
          return modifyUser(id, email, mobile)
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
          this.getUser(this.queryInfo)
          //   // 关闭对话框
          this.cancelDialog('editDialogVisible')
        })
    },
    // 弹出删除用户警告
    deleteUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 在数据库中删除对应用户 并重新渲染页面
          deleteUserById(id).then((res) => {
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
            this.getUser(this.queryInfo)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  mounted() {
    this.getUser(this.queryInfo)
  },
  updated() {}
}
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.el-table :nth-child(1) {
  text-align: center;
}
</style>
