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
        />
      </el-aside>
      <el-container>
        <!-- 主体区域 -->
        <el-main>
          <router-view />
        </el-main>
        <!-- 底部区域 -->
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import AsideMenu from 'views/home/childCPNT/AsideMenu'

import { getMenuList } from 'network/home'

export default {
  name: 'home',
  data() {
    return {
      menuList: [],
      menuIconObj: {
        125: 'el-icon-s-custom',
        103: 'el-icon-s-operation',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-marketing'
      },
      // 是否折叠
      isCollapse: false
    }
  },
  methods: {
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
    }
  },
  components: {
    AsideMenu
  },
  created() {
    // 获取左侧菜单列表数据
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
        console.log(data)
      })
      .catch((err) => {
        this.$message.error({
          message: err,
          center: true,
          showClose: true,
          duration: 1000
        })
      })
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
    line-height: 200px;
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
    text-align: center;
    line-height: 160px;
  }
}
</style>
