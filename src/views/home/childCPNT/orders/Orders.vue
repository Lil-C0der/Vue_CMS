<template>
  <el-card>
    <!-- 搜索框区域 -->
    <search-bar @searchBtnClick="getOrder"></search-bar>
    <!-- 表格区域 -->
    <order-table
      :orderList="orderList"
      @editBtnClick="showEditAddrDialog"
      @showProgressBtnClick="showProgressInfo"
    ></order-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="this.queryInfo.pagesize"
    >
    </el-pagination>
    <!-- 修改地址对话框 -->
    <Dialog
      :dialogVisible="editAddrDialogVisible"
      title="编辑地址"
      @cancelDialog="cancelDialog('editAddrDialogVisible')"
      @closeDialog="clearForm('editAddrFormRef')"
      @saveChange="saveEditAddr"
    >
      <edit-addr-form
        :addrForm="addrForm"
        ref="editAddrFormRef"
      ></edit-addr-form>
    </Dialog>

    <!-- 物流进度对话框 -->
    <Dialog
      title="物流进度"
      :dialogVisible="progressDialogVisible"
      @cancelDialog="cancelDialog('progressDialogVisible')"
      @saveChange="cancelDialog('progressDialogVisible')"
    >
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in progressInfo"
          :key="index"
          :timestamp="activity.time"
        >
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
    </Dialog>
  </el-card>
</template>

<script>
import SearchBar from 'components/common/SearchBar'
import Dialog from 'components/common/Dialog'
import OrderTable from './OrderTable'
import EditAddrForm from './EditAddrForm'

import { getOrderList, getProgressInfo } from 'network/orders'

export default {
  name: 'Orders',
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      orderList: [],
      total: 0,
      editAddrDialogVisible: false,
      addrForm: {},
      progressDialogVisible: false,
      progressInfo: []
    }
  },
  components: {
    SearchBar,
    OrderTable,
    Dialog,
    EditAddrForm
  },
  methods: {
    // 查询订单
    getOrder(queryInfo) {
      const { query, pagenum, pagesize } = queryInfo
      getOrderList(query, pagenum, pagesize).then((res) => {
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
        this.total = res.data.total
        this.orderList = res.data.goods
      })
    },
    // 页面容量改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrder(this.queryInfo)
    },
    // 页码改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrder(this.queryInfo)
    },
    clearForm(ref) {
      this.$refs[ref].$refs.formRef.resetFields()
    },
    cancelDialog(visible) {
      this[visible] = false
    },
    showEditAddrDialog() {
      this.editAddrDialogVisible = true
    },
    // TODO 保存更改地址
    saveEditAddr() {
      console.log(this.addrForm)
      return this.$message.warning({
        message: '还在开发中....',
        center: true,
        showClose: true,
        duration: 1000
      })
    },
    // 查询物流
    showProgressInfo(row) {
      this.progressDialogVisible = true
      // console.log(row)
      getProgressInfo().then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: res.meta.message,
            center: true,
            showClose: true,
            duration: 1000
          })
        }
        this.$message.success({
          message: res.meta.message,
          center: true,
          showClose: true,
          duration: 1000
        })
        this.progressInfo = res.data
        console.log(this.progressInfo)
      })
    }
  },
  mounted() {
    this.getOrder(this.queryInfo)
  }
}
</script>

<style scoped></style>
