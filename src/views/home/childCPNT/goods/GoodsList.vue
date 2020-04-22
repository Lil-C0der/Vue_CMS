<template>
  <el-card>
    <!-- 搜索与添加 -->
    <search-bar
      @clearInput="getGoodsList(queryInfo)"
      @searchBtnClick="queryGoods"
    >
      <el-button type="primary" @click="addDialogVisible = true"
        >添加用户</el-button
      >
    </search-bar>
    <div class="text item">
      <!-- 表格区域 -->
      <goods-list-table :goodsList="goodsList" />
    </div>

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

import { getGoodsList } from 'network/goods'

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
      }
    }
  },
  components: {
    SearchBar,
    GoodsListTable
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
    queryGoods(query) {
      const { pagenum, pagesize } = this.queryInfo
      this.getGoodsList({ query, pagenum, pagesize })
    }
  },
  mounted() {
    this.getGoodsList(this.queryInfo)
  }
}
</script>

<style scoped>
.item {
  padding: 18px 0;
}
</style>
