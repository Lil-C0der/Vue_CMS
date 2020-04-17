<template>
  <el-table :data="rightsList" stripe border style="width: 100%;">
    <el-table-column type="index" width="50" label="#"></el-table-column>
    <el-table-column prop="authName" label="权限" width="180">
    </el-table-column>
    <el-table-column prop="path" label="访问路径"> </el-table-column>
    <el-table-column prop="level" label="权限等级">
      <template slot-scope="scope">
        <el-tag type="primary" v-if="scope.row.level == 0">一级</el-tag>
        <el-tag type="success" v-if="scope.row.level == 1">二级</el-tag>
        <el-tag type="warning" v-if="scope.row.level == 2">三级</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'RightTable',
  data() {
    return {}
  },
  props: {
    rightsList: {
      type: Array,
      default: () => []
    }
  },
  components: {}
}
</script>

<style scoped>
.el-table {
  margin-top: 10px;
}
.el-table :nth-child(1) {
  text-align: center;
}
</style>
