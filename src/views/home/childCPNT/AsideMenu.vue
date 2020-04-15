<template>
  <el-menu
    default-active="2"
    unique-opened
    :collapse="isCollapse"
    class="aside-menu el-menu-vertical"
    @open="handleOpen"
    @close="handleClose"
    :collapse-transition="false"
    router
    background-color="#333744"
    text-color="#fff"
    active-text-color="#409EFF"
  >
    <!-- 一级菜单 -->
    <!-- <el-submenu v-for="(n, i) in menuList" :key="n.id" :index="i + ''"> -->
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
        :index="child.path"
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.aside-menu {
  width: 100%;
  overflow: hidden;
}
.menu-item {
  /* float: left; */
  text-align: left;
  .menu-item-text {
    margin-left: 10px;
  }
}
</style>
