<template>
  <el-table border stripe :data="goodsList">
    <el-table-column
      align="center"
      type="index"
      label="#"
      width="50"
    ></el-table-column>
    <el-table-column
      label="商品名称"
      min-width="440"
      prop="goods_name"
    ></el-table-column>
    <el-table-column
      label="单价(元)"
      prop="goods_price"
      width="80"
    ></el-table-column>
    <el-table-column
      label="商品数量"
      prop="goods_number"
      width="80"
    ></el-table-column>
    <el-table-column label="创建时间" prop="add_time" min-width="150">
      <template slot-scope="scope">
        {{ scope.row.add_time | formatDate }}
      </template>
    </el-table-column>
    <el-table-column label="商品重量" prop="goods_weight"></el-table-column>

    <el-table-column min-width="180" label="操作">
      <template ref="expand" slot-scope="scope">
        <el-button
          @click="editBtnClick(scope.row)"
          size="mini"
          type="primary"
          icon="el-icon-edit"
          >编辑</el-button
        >

        <el-button
          @click="deleteBtnClick(scope.row)"
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
  name: 'GoodsListTable',
  data() {
    return {}
  },
  components: {},
  methods: {
    editBtnClick(row) {
      console.log(row)
    },
    deleteBtnClick(row) {
      console.log(row)
    }
  },
  props: {
    goodsList: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    formatDate(stamp) {
      const time = new Date(stamp * 1000)
      const year = time.getFullYear()
      let month = time.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = time.getDate()
      date = date < 10 ? '0' + date : date
      let hrs = time.getHours()
      hrs = hrs < 10 ? '0' + hrs : hrs
      let min = time.getMinutes()
      min = min < 10 ? '0' + min : min
      return `${year}-${month}-${date} ${hrs}:${min}`
    }
  }
}
</script>

<style scoped></style>
