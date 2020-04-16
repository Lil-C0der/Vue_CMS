<template>
  <el-table :data="userList" border stripe style="width: 100%;">
    <el-table-column type="index" label="#" width="50"></el-table-column>
    <el-table-column prop="username" label="用户名" width="80">
    </el-table-column>
    <el-table-column prop="email" label="邮箱"></el-table-column>
    <el-table-column prop="role_name" label="角色"></el-table-column>
    <el-table-column prop="mobile" label="电话"></el-table-column>
    <el-table-column prop="mg_state" label="状态">
      <!-- 状态单元格 -->
      <template slot-scope="scope">
        <el-switch
          @change="stateChange(scope.row)"
          v-model="scope.row.mg_state"
        >
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <!-- 作用域插槽 -->
      <template slot-scope="scope">
        <el-tooltip
          class="item"
          :enterable="false"
          effect="dark"
          content="编辑用户"
          placement="top"
        >
          <el-button
            @click="editBtnClick(scope.row.id)"
            size="mini"
            type="primary"
            icon="el-icon-edit"
          ></el-button>
        </el-tooltip>

        <el-tooltip
          class="item"
          :enterable="false"
          effect="dark"
          content="删除用户"
          placement="top"
        >
          <el-button
            @click="deleteBtnClick(scope.row.id)"
            size="mini"
            type="danger"
            icon="el-icon-delete"
          ></el-button>
        </el-tooltip>

        <el-tooltip
          class="item"
          :enterable="false"
          effect="dark"
          content="分配角色"
          placement="top"
        >
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-setting"
          ></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'UserTable',
  data() {
    return {}
  },
  props: {
    userList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    stateChange(userData) {
      this.$emit('update:state', userData.id, userData.mg_state)
    },
    editBtnClick(userId) {
      this.$emit('editUser', userId)
    },
    deleteBtnClick(userId) {
      this.$emit('deleteBtnClick', userId)
    }
  },
  components: {}
}
</script>

<style scoped></style>
