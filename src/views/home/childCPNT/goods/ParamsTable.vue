<template>
  <el-table stripe border :data="paramsListCopy">
    <el-table-column ref="expand" type="expand">
      <!-- 动态参数表格展开内容 -->

      <template slot-scope="scope">
        <el-tag
          :key="index"
          v-for="(n, index) in scope.row.attr_vals"
          @close="handleClose(scope.row, index)"
          closable
          >{{ n }}</el-tag
        >
        <el-input
          class="input-new-tag"
          v-if="scope.row.inputVisible"
          v-model="scope.row.inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm(scope.row)"
          @blur="handleInputConfirm(scope.row)"
        >
        </el-input>
        <el-button
          v-if="!scope.row.inputVisible"
          class="button-new-tag"
          size="small"
          @click="showInput(scope.row)"
        >
          + New Tag
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      type="index"
      width="50"
      label="#"
    ></el-table-column>
    <el-table-column
      label="参数名称"
      prop="attr_name"
      width="220"
    ></el-table-column>
    <el-table-column label="操作">
      <template ref="expand" slot-scope="scope">
        <el-button
          @click="editBtnClick(scope.row.attr_id)"
          size="mini"
          type="primary"
          icon="el-icon-edit"
          >编辑</el-button
        >

        <el-button
          @click="deleteBtnClick(scope.row.attr_id)"
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
  name: 'ParamsTable',
  data() {
    return {}
  },
  props: {
    paramsList: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    editBtnClick(id) {
      this.$emit('editParams', id)
    },
    deleteBtnClick(id) {
      this.$emit('deleteParams', id)
    },
    showInput(row) {
      row.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm(row) {
      if (!row.inputValue) {
        return (row.inputVisible = false)
      }
      const newAttr = row.inputValue
      if (!row.attr_vals) {
        row.attr_vals = []
      }
      row.attr_vals.push(newAttr.trim())
      this.$emit('editTag', row)
      row.inputValue = ''
      row.inputVisible = false
    },
    handleClose(row, index) {
      row.attr_vals.splice(index, 1)
      this.$emit('editTag', row)
    }
  },
  computed: {
    paramsListCopy() {
      const str = JSON.stringify(this.paramsList)
      return JSON.parse(str)
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin: 10px 0;
  .el-table_1_column_1 {
    text-align: center;
  }
  .el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 10px;
  }
  .input-new-tag {
    width: 90px;
    margin-bottom: 10px;
    vertical-align: bottom;
  }
}
</style>
