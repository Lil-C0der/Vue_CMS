<template>
  <el-table
    :tree-props="{ children: 'children' }"
    row-key="cat_id"
    :data="catList"
    border
    style="width: 100%;"
  >
    <el-table-column
      class="cat-name"
      label="分类名称"
      min-width="200"
      prop="cat_name"
    ></el-table-column>
    <el-table-column label="是否有效" min-width="80">
      <template slot-scope="scope">
        <i
          :style="{ color: scope.row.cat_delete ? '#F56C6C' : '#67C23A' }"
          :class="scope.row.cat_deleted ? 'el-icon-error' : 'el-icon-success'"
        ></i>
      </template>
    </el-table-column>
    <!-- 层级列 -->
    <el-table-column class="cat-deleted" label="分类层级">
      <template slot-scope="scope">
        <el-tag type="primary" v-if="scope.row.cat_pid === 0">一级</el-tag>
        <el-tag type="success" v-if="scope.row.cat_level === 1"> 二级</el-tag>
        <el-tag type="warning" v-if="scope.row.cat_level === 2">三级</el-tag>
      </template>
    </el-table-column>
    <!-- 操作列 -->
    <el-table-column min-width="200" class="cat-deleted" label="操作">
      <template slot-scope="scope">
        <el-button
          @click="editBtnClick(scope.row.cat_id)"
          size="mini"
          type="primary"
          icon="el-icon-edit"
          >编辑</el-button
        >

        <el-button
          @click="deleteBtnClick(scope.row.cat_id)"
          size="mini"
          type="danger"
          icon="el-icon-delete"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'CategoriesTable',
  data() {
    return {}
  },
  props: {
    catList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    editBtnClick(id) {
      this.$emit('editCat', id)
    },
    deleteBtnClick(id) {
      this.$emit('deleteBtnClick', id)
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin: 20px 0;
}
</style>
