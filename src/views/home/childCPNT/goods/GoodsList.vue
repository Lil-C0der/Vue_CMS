<template>
  <el-card>
    <search-bar>
      <el-button></el-button>
    </search-bar>
    <h2>'LIST'</h2>
  </el-card>
</template>

<script>
import SearchBar from 'components/common/SearchBar'

export default {
  name: 'List',
  data() {
    return {}
  },
  components: {
    SearchBar
  }
}
</script>

<style scoped></style>
