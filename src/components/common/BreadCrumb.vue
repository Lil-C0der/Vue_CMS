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
import store from 'store'
import { mapMutations } from 'vuex'
import { SETCRUMBOBJ } from 'store/types'

export default {
  name: 'BreadCrumb',
  data() {
    return {}
  },
  props: {
    showAllItem: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations([SETCRUMBOBJ])
  },
  computed: {
    crumbObj() {
      return store.state.crumbObj
    }
  },
  created() {
    this[SETCRUMBOBJ](JSON.parse(window.sessionStorage.getItem('crumbObj')))
  }
}
</script>

<style scoped>
.breadcrumb {
  margin-bottom: 20px;
}
</style>
