<template>
  <el-menu
    :default-active="firstPathName"
    :collapse="isCollapse"
    class="aside-menu el-menu-vertical"
    :collapse-transition="false"
    router
    background-color="#333744"
    text-color="#fff"
    active-text-color="#409EFF"
  >
    <!-- 一级菜单 -->
    <el-submenu v-for="n in menuList" :key="n.id" :index="n.path">
      <template slot="title">
        <div class="menu-item">
          <i :class="menuIconObj[n.id]"></i>
          <span class="menu-item-text">{{ n.authName }}</span>
        </div>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item
        v-for="(child, childIndex) in n.children"
        :key="childIndex.id"
        :index="'/' + child.path"
        @click="menuItemClick({ parent: n.authName, child: child.authName })"
      >
        <template slot="title">
          <div class="menu-item">
            <i class="el-icon-menu"></i>
            <span>{{ child.authName }}</span>
          </div>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapMutations } from 'vuex'

import { SETCRUMBOBJ } from 'store/types'

export default {
  name: 'asideMenu',
  data() {
    return {}
  },
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
    menuIconObj: {
      type: Object,
      default: () => {}
    },
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ...mapMutations([SETCRUMBOBJ]),
    menuItemClick(authNameObj) {
      this[SETCRUMBOBJ](authNameObj)
    }
  },
  computed: {
    firstPathName() {
      return '/' + this.$route.path.split('/')[1]
    }
  }
}
</script>

<style lang="less" scoped>
.aside-menu {
  width: 100%;
  overflow: hidden;
}
.menu-item {
  text-align: left;
  .menu-item-text {
    margin-left: 10px;
  }
}
</style>
