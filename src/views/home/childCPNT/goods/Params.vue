<template>
  <el-card>
    <el-alert
      width="50%"
      title="注意"
      description="只允许为第三级分类设置参数！"
      type="warning"
      show-icon
      :closable="false"
    >
    </el-alert>
    <el-row>
      <el-col>
        <span>选择商品分类：</span>
        <!-- 级联选择器 -->
        <el-cascader
          v-model="catIds"
          ref="cascaderRef"
          :options="catList"
          @change="initParamsTable"
          :props="{
            expandTrigger: 'hover',
            label: 'cat_name',
            value: 'cat_id'
          }"
        ></el-cascader>
      </el-col>
    </el-row>

    <el-tabs v-model="sel">
      <el-tab-pane label="动态参数" name="many">
        <el-button
          :disabled="btnDisabled"
          size="mini"
          type="primary"
          @click="addParamsDialogVisible = true"
          >添加参数</el-button
        >
        <!-- 动态参数表格 -->
        <params-table
          :paramsList="paramsList.many"
          @editParams="showParamsInfo"
          @deleteParams="deleteParams"
          @editTag="editParamsVals"
        ></params-table>
      </el-tab-pane>

      <el-tab-pane label="静态属性" name="only">
        <el-button
          :disabled="btnDisabled"
          size="mini"
          type="primary"
          @click="addParamsDialogVisible = true"
          >添加属性</el-button
        >
        <!-- 静态属性表格 -->
        <params-table
          :paramsList="paramsList.only"
          @editParams="showParamsInfo"
          @deleteParams="deleteParams"
          @editTag="editParamsVals"
        ></params-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 添加参数对话框 -->
    <Dialog
      :title="(sel === 'many' ? '添加动态参数' : '添加静态属性')"
      :dialogVisible="addParamsDialogVisible"
      @cancelDialog="cancelDialog('addParamsDialogVisible')"
      @saveChange="saveAddParams('addParamsFormRef')"
      @closeDialog="clearForm('addParamsFormRef')"
      ><add-params-form ref="addParamsFormRef" :sel="sel" />
    </Dialog>

    <!-- 编辑参数对话框 -->
    <Dialog
      :title="(sel === 'many' ? '编辑参数' : '编辑属性')"
      :dialogVisible="editParamsDialogVisible"
      @cancelDialog="cancelDialog('editParamsDialogVisible')"
      @saveChange="saveEditParms('editParamsFormRef')"
      @closeDialog="clearForm('editParamsFormRef')"
      ><edit-params-form
        ref="editParamsFormRef"
        :sel="sel"
        :editParamsForm="editParamsForm"
      />
    </Dialog>
  </el-card>
</template>

<script>
import ParamsTable from './ParamsTable'
import Dialog from 'components/common/Dialog'
import AddParamsForm from './AddParamsForm'
import EditParamsForm from './EditParamsForm'

import {
  getParamsListById,
  addParamsById,
  queryParamsById,
  modifyParams,
  deleteParamsById
} from 'network/params'
import { getCategories } from 'network/categories'

export default {
  name: 'Params',
  data() {
    return {
      catList: [],
      paramsList: {
        only: [],
        many: []
      },
      catIds: null,
      sel: 'many',
      addParamsDialogVisible: false,
      editParamsDialogVisible: false,
      // 即将被编辑的参数信息
      editParamsForm: {}
    }
  },
  components: {
    ParamsTable,
    Dialog,
    AddParamsForm,
    EditParamsForm
  },
  methods: {
    // 获取分类列表
    getCatList() {
      getCategories().then((res) => {
        this.catList = res.data
      })
    },
    // 关闭对话框
    cancelDialog(visible) {
      this[visible] = false
    },
    // 重置表单
    clearForm(ref) {
      this.$refs[ref].$refs.formRef.resetFields()
    },
    // 表单预校验
    preCheck(ref) {
      return this.$refs[ref].$refs.formRef.validate()
    },
    // 获取参数或者属性
    getParams(sel) {
      return getParamsListById(this.lastCatId, sel).then((res) => {
        this.paramsList[sel] = res.data
        this.paramsList[sel].forEach((n) => {
          // 控制文本框的显示和隐藏
          n.inputVisible = false
          n.inputValue = ''
          n.attr_vals = n.attr_vals ? n.attr_vals.split(',') : null
        })
      })
    },
    // 初始化表格
    initParamsTable() {
      Promise.all([this.getParams('many'), this.getParams('only')])
        .then(() => {
          this.$message.success({
            message: '获取参数列表成功',
            center: true,
            showClose: true,
            duration: 1000
          })
        })
        .catch((err) => {
          // console.log(err)
          this.$message.success({
            message: err,
            center: true,
            showClose: true,
            duration: 1000
          })
        })
    },
    // 保存添加参数
    saveAddParams(ref) {
      this.preCheck(ref)
        .then(() => {
          return addParamsById(
            this.lastCatId,
            this.$refs[ref].addParamsForm.paramsName,
            this.sel
          )
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
          this.getParams(this.sel)
          this.cancelDialog('addParamsDialogVisible')
        })
        .catch(() => {
          return false
        })
    },
    // 显示要编辑的参数信息
    showParamsInfo(id) {
      console.log(id)

      queryParamsById(this.lastCatId, id, this.sel).then((res) => {
        this.editParamsForm = res.data
        console.log(this.editParamsForm)
      })
      this.editParamsDialogVisible = true
    },
    // 保存编辑参数
    saveEditParms(ref) {
      this.preCheck(ref)
        .then((res) => {
          const {
            cat_id,
            attr_id,
            attr_name,
            attr_sel,
            attr_vals
          } = this.$refs[ref].editParamsForm
          return modifyParams(cat_id, attr_id, attr_name, attr_sel, attr_vals)
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
            showClose: true,
            message: res.meta.msg,
            center: true,
            duration: 1000
          })
          // 更新视图
          this.getParams(this.sel)
          this.cancelDialog('editParamsDialogVisible')
        })
    },
    // 新增参数的属性值
    editParamsVals(row) {
      const { cat_id, attr_id, attr_name, attr_sel, attr_vals } = row
      modifyParams(
        cat_id,
        attr_id,
        attr_name,
        attr_sel,
        attr_vals.toString()
      ).then((res) => {
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
    },
    // 删除参数
    deleteParams(attrId) {
      this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(this.lastCatId, attrId)
          return deleteParamsById(this.lastCatId, attrId)
        })
        .then((res) => {
          // 删除对应参数 并重新渲染页面
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
          this.getParams(this.sel)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },

  computed: {
    btnDisabled() {
      return this.catIds === null
    },
    lastCatId() {
      if (!this.catIds) return
      return this.catIds[this.catIds.length - 1]
    },
    manyAttrVals() {
      return this.paramsList.many
        .map((n) => n.attr_vals)
        .toString()
        .slice(1)
        .split(' ')
    },
    onlyAttrVals() {
      return this.paramsList.only.map((n) => n.attr_vals)
    }
  },
  mounted() {
    this.getCatList()
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin: 20px 0;
}
</style>
