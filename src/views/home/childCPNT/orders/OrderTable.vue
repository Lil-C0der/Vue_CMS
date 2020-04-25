<template>
  <el-table border stripe :data="orderList">
    <el-table-column align="center" type="index" label="#"></el-table-column>
    <el-table-column label="订单编号" prop="order_number"></el-table-column>
    <el-table-column
      label="订单总价"
      width="80"
      prop="order_price"
    ></el-table-column>
    <el-table-column width="80" label="是否付款" prop="pay_status">
      <template slot-scope="scope">
        <el-tag :type="scope.row.pay_status === '0' ? 'danger' : 'success'">{{
          scope.row.pay_status === '0' ? '未付款' : '已付款'
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="是否发货"
      width="80"
      prop="is_send"
    ></el-table-column>
    <el-table-column width="240" label="创建时间" prop="create_time">
      <template slot-scope="scope">
        {{ scope.row.create_time | formDate }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="220">
      <template slot-scope="scope">
        <el-button
          @click="editBtnClick(scope.row)"
          type="primary"
          size="mini"
          icon="el-icon-edit"
        ></el-button>
        <el-button
          @click="showProgressBtnClick(scope.row)"
          type="success"
          size="mini"
          icon="el-icon-location"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'OrderTable',
  data() {
    return {}
  },
  components: {},
  methods: {
    editBtnClick(row) {
      this.$emit('editBtnClick', row)
    },
    showProgressBtnClick(row) {
      this.$emit('showProgressBtnClick', row)
    }
  },
  props: {
    orderList: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    formDate(stamp) {
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
