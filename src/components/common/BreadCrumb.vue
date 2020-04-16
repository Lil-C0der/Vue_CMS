<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">
        首页
      </el-breadcrumb-item>
      <!-- 第一级导航 -->
      <el-breadcrumb-item v-if="showAllItem">
        {{ crumbObj.parent }}
      </el-breadcrumb-item>
      <!-- 第二级导航 -->
      <el-breadcrumb-item v-if="showAllItem">
        {{ crumbObj.child }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data() {
    return {}
  },
  props: {
    showAllItem: {
      type: Boolean,
      default: false
    },
    crumbObj: {
      type: Object,
      default: () => {}
    }
  },
  components: {}
}
</script>

<style scoped>
.breadcrumb {
  margin-bottom: 20px;
}
</style>
