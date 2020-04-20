<template>
  <el-card>
    <!-- 添加分类按钮 -->
    <el-row :gutter="20">
      <el-col :span="1">
        <el-button type="primary" @click="addCatDialogVisible = true"
          >添加分类</el-button
        >
      </el-col>
    </el-row>
    <!-- 商品分类表格 -->
    <div class="text item">
      <categories-table
        :catList="catList"
        @editCat="showCatInfo"
        @deleteBtnClick="deleteCat"
      ></categories-table>
    </div>
    <!-- 添加分类对话框 -->
    <Dialog
      title="添加分类"
      width="30%"
      :dialogVisible="addCatDialogVisible"
      @cancelDialog="cancelDialog('addCatDialogVisible')"
      @saveChange="saveAddCat('addCatFormRef')"
      @closeDialog="clearForm('addCatFormRef')"
    >
      <add-cat-form ref="addCatFormRef" :topCatList="topCatList" />
    </Dialog>

    <!-- 编辑分类对话框 -->

    <Dialog
      title="编辑分类"
      width="30%"
      :dialogVisible="editCatDialogVisible"
      @cancelDialog="cancelDialog('editCatDialogVisible')"
      @saveChange="saveEditCat('editCatFormRef')"
      @closeDialog="clearForm('editCatFormRef')"
    >
      <edit-cat-form ref="editCatFormRef" :editCatForm="editCatForm" />
    </Dialog>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :page-sizes="[5, 10, 15]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import CategoriesTable from './CategoriesTable'
import AddCatForm from './AddCatForm'
import editCatForm from './EditCatForm'

import Dialog from 'components/common/Dialog'

import {
  getCategories,
  addCategories,
  getCategoriesById,
  modifyCategories,
  deleteCatById
} from 'network/categories'
export default {
  name: 'Categories',
  data() {
    return {
      // 获取到的商品分类
      catList: [],
      // 商品分类总记录数
      total: null,
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      addCatDialogVisible: false,
      // 一二级分类
      topCatList: [],
      // 即将被编辑的分类
      editCatForm: {},
      editCatDialogVisible: false
    }
  },
  components: {
    CategoriesTable,
    Dialog,
    AddCatForm,
    editCatForm
  },
  methods: {
    // 获取分类列表
    getCategoriesList(queryInfo) {
      const { type, pagenum, pagesize } = queryInfo
      getCategories(type, pagenum, pagesize).then((res) => {
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
        this.catList = res.data.result
        this.total = res.data.total
      })
    },
    // 页码改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCategoriesList(this.queryInfo)
    },
    // 页面容量改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCategoriesList(this.queryInfo)
    },
    // 关闭对话框
    cancelDialog(visble) {
      this[visble] = false
    },
    // 重置表单
    clearForm(ref) {
      this.$refs[ref].$refs.formRef.resetFields()
      // 重置级联选择器
      if (this.$refs[ref].$refs.cascaderRef) {
        this.$refs[ref].$refs.cascaderRef.checkedValue = []
      }
    },
    // 表单预校验
    preCheck(ref) {
      return this.$refs[ref].$refs.formRef.validate()
    },
    // 添加分类
    saveAddCat(ref) {
      this.preCheck(ref)
        .then(() => {
          const { catName } = this.$refs[ref].addCatForm
          const parentIdArr = this.$refs[ref].$refs.cascaderRef.checkedValue
          // 返回数组的最后一项即为父级分类的id,如果数组为空说明创建了一个一级分类
          const catPid = parentIdArr[parentIdArr.length - 1] || 0
          // 数组长度即为新建分类的层级
          const catLevel = parentIdArr.length
          return addCategories(catPid, catName, catLevel)
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
            showClose: true,
            message: res.meta.msg,
            center: true,
            duration: 1000
          })
          this.getCategoriesList(this.queryInfo)
          this.addCatDialogVisible = false
        })
        .catch(() => {
          return false
        })
    },
    // 获取前两级分类
    getTopCatList() {
      getCategories(2, '', '').then((res) => {
        this.topCatList = res.data
      })
    },
    // 根据id查询分类
    showCatInfo(id) {
      getCategoriesById(id).then((res) => {
        this.editCatForm = res.data
      })
      // 显示对话框
      this.editCatDialogVisible = true
    },
    // 保存编辑分类
    saveEditCat(ref) {
      this.preCheck(ref)
        .then(() => {
          const { cat_id, cat_name } = this.editCatForm
          return modifyCategories(cat_id, cat_name)
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
          this.getCategoriesList(this.queryInfo)
          this.cancelDialog('editCatDialogVisible')
        })
    },
    // 删除分类
    deleteCat(id) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return deleteCatById(id)
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
          this.getCategoriesList(this.queryInfo)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  created() {
    this.getTopCatList()
    this.getCategoriesList(this.queryInfo)
  },
  mounted() {}
}
</script>

<style scoped></style>
