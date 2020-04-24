<template>
  <el-container class="home-container">
    <el-header>
      <span class="header-title">电商后台管理系统</span>
      <el-button class="logout-btn" type="info" @click="logout">退出</el-button>
    </el-header>

    <el-container>
      <!-- 左侧列表 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">
          <i
            :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            class="toggle-icon"
          ></i>
        </div>
        <aside-menu
          :menuList="menuList"
          :menuIconObj="menuIconObj"
          :isCollapse="isCollapse"
          @menuItemClick="menuItemClick"
        />
      </el-aside>
      <el-container>
        <!-- 主体区域 -->
        <el-main>
          <!-- 面包屑导航 -->
          <bread-crumb
            :crumbObj="crumbObj"
            :showAllItem="$route.path !== '/welcome'"
          />
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-main>
        <!-- 底部区域 -->
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import AsideMenu from 'views/home/childCPNT/AsideMenu'

import BreadCrumb from 'components/common/BreadCrumb'

import { getMenuList } from 'network/home'

export default {
  name: 'home',
  data() {
    return {
      // 菜单列表
      menuList: [],
      // 一级菜单图标
      menuIconObj: {
        125: 'el-icon-s-custom',
        103: 'el-icon-s-operation',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-marketing'
      },
      // 是否折叠
      isCollapse: false,
      // 面包屑二级导航
      crumbObj: {}
    }
  },
  components: {
    AsideMenu,
    BreadCrumb
  },
  methods: {
    // 退出
    logout() {
      sessionStorage.clear('token')
      this.$message.error({
        showClose: true,
        message: '已退出',
        center: true,
        duration: 1000
      })
      this.$router.push('/login')
    },
    // 侧边栏折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    menuItemClick(authNameObj) {
      this.crumbObj = authNameObj
      sessionStorage.setItem('crumbObj', JSON.stringify(this.crumbObj))
    },
    // 获取左侧菜单列表数据
    initMenu() {
      getMenuList()
        .then((res) => {
          if (res.meta.status !== 200) {
            return this.$message.error({
              message: res.meta.msg,
              center: true,
              showClose: true,
              duration: 1000
            })
          }
          const data = res.data
          this.menuList = data
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            center: true,
            showClose: true,
            duration: 1000
          })
        })
    },
    getCrumbObj() {
      // 获取面包屑导航信息 存放在sessionStorage中
      if (sessionStorage.getItem('crumbObj')) {
        this.crumbObj = JSON.parse(sessionStorage.getItem('crumbObj'))
      }
    }
  },
  created() {
    this.initMenu()
    this.getCrumbObj()
    this.$bus.$on('toNewPage', () => {
      this.getCrumbObj()
    })
  },
  beforeDestroy() {
    this.$bus.$off('toNewPage')
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  .el-header,
  .el-footer {
    .header-title {
      font-size: 22px;
      float: left;
      color: #fff;
    }
    .logout-btn {
      float: right;
      margin-top: 10px;
    }
    background-color: #373d41;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-footer {
    background-color: #eaeaea;
  }
  .el-aside {
    overflow-x: hidden;
    background-color: #333744;
    color: #333;
    text-align: center;
    // line-height: 200px;
    .toggle-button {
      height: 40px;
      color: #fff;
      background-color: #4a5064;
      position: relative;
      z-index: 9;
      .toggle-icon {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
      }
    }
  }
  .el-main {
    background-color: #eaedf1;
    color: #333;
  }
}
</style>
