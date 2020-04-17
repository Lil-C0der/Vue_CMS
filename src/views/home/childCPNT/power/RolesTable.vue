<template>
  <el-table :data="rolesList" stripe border style="width: 100%;">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <!-- 表格展开内容 -->
        <roles-expand-tree :children="scope.row.children"></roles-expand-tree>
      </template>
    </el-table-column>
    <el-table-column type="index" width="50" label="#"></el-table-column>
    <el-table-column prop="roleName" label="角色" width="100">
    </el-table-column>
    <el-table-column prop="roleDesc" label="描述" width="180">
    </el-table-column>
    <!-- 表格操作列 -->
    <el-table-column label="操作">
      <template>
        <el-button size="mini" type="primary" icon="el-icon-edit">
          编辑
        </el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete">
          删除
        </el-button>
        <el-button size="mini" type="warning" icon="el-icon-setting">
          分配权限
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import RolesExpandTree from './RolesExpandTree'

export default {
  name: 'RolesTable',
  data() {
    return {}
  },
  props: {
    rolesList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    RolesExpandTree
  }
}
</script>

<style scoped>
.el-table :nth-child(1) {
  text-align: center;
}
</style>
