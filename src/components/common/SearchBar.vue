<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-input
        clearable
        @clear="clearIpt"
        v-model="query"
        placeholder="请输入内容"
      >
        <el-button
          slot="append"
          @click="searchBtnClick(query)"
          icon="el-icon-search"
        ></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <slot></slot>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      query: ''
    }
  },
  methods: {
    clearIpt() {
      this.$emit('clearInput')
    },
    searchBtnClick(query) {
      this.$emit('searchBtnClick', query)
    }
  },
  components: {}
}
</script>

<style scoped></style>
