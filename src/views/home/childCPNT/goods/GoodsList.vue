<template>
  <el-card>
    <!-- 搜索与添加 -->
    <search-bar @clearInput="clearInput" @searchBtnClick="queryGoods">
      <el-button type="primary" @click="goAddGoodsPage">添加商品</el-button>
    </search-bar>
    <div class="text item">
      <!-- 表格区域 -->
      <goods-list-table
        :goodsList="goodsList"
        @editBtnClick="showGoodsInfo"
        @deleteGoods="deleteGoods"
      />
    </div>
    <!-- TODO 编辑商品对话框 -->
    <Dialog
      @cancelDialog="cancelDialog('editGoodsDialogVisible')"
      @saveChange="saveEditGoods"
      title="编辑商品"
      :dialogVisible="editGoodsDialogVisible"
    >
      功能还在开发中....
    </Dialog>
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
  </el-card>
</template>

<script>
import SearchBar from 'components/common/SearchBar'
import GoodsListTable from './GoodsListTable'
import Dialog from 'components/common/Dialog'

import { getGoodsList, deleteGoodsById } from 'network/goods'

export default {
  name: 'List',
  data() {
    return {
      goodsList: [],
      total: 0,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      editGoodsDialogVisible: false
    }
  },
  components: {
    SearchBar,
    GoodsListTable,
    Dialog
  },
  methods: {
    getGoodsList(queryInfo) {
      const { query, pagenum, pagesize } = queryInfo
      getGoodsList(query, pagenum, pagesize).then((res) => {
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
        this.goodsList = res.data.goods
        this.total = res.data.total
      })
    },
    // 页码值改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList(this.queryInfo)
    },
    // 页面容量改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList(this.queryInfo)
    },
    // 查询商品
    queryGoods(query) {
      this.queryInfo.query = query
      this.getGoodsList(this.queryInfo)
    },
    clearInput() {
      this.queryInfo.query = ''
      this.queryInfo.pagenum = 1
      this.queryInfo.pagesize = 5
      this.getGoodsList(this.queryInfo)
    },
    cancelDialog(visible) {
      this[visible] = false
    },
    // TODO 根据id查询商品
    showGoodsInfo(id) {
      this.editGoodsDialogVisible = true
    },
    // TODO 保存对商品的改动
    saveEditGoods() {
      this.cancelDialog('editGoodsDialogVisible')
    },
    // 删除商品
    deleteGoods(id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return deleteGoodsById(id)
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
          this.getGoodsList(this.queryInfo)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 跳转添加商品页面
    goAddGoodsPage() {
      this.$router.push('/goods/add')
    }
  },
  activated() {
    this.getGoodsList(this.queryInfo)
  }
}
</script>

<style scoped>
.item {
  padding: 20px 0;
}
</style>
