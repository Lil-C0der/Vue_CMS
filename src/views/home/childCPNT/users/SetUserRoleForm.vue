<template>
  <el-form ref="formRef" :data="setUserRoleForm">
    <el-form-item label="用户名:" prop="username">
      <span class="form-text">{{ setUserRoleForm.username }}</span>
    </el-form-item>
    <el-form-item label="当前角色:" prop="roleName">
      <span class="form-text">{{ setUserRoleForm.roleName }}</span>
    </el-form-item>
    <el-form-item label="新角色:">
      <el-select v-model="selectedRoleId" placeholder="请选择角色">
        <el-option
          v-for="(r, i) in rolesList"
          :label="r.roleName"
          :value="r.id"
          :key="i"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SetUserRoleForm',
  data() {
    return {
      selectedRoleId: null
    }
  },
  props: {
    setUserRoleForm: {
      type: Object,
      default: () => {}
    },
    rolesList: {
      type: Array,
      default: () => []
    }
  },
  destroyed() {
    console.log('adsad')
  }
}
</script>

<style lang="less" scoped>
.el-form-item {
  .el-select,
  .form-text {
    float: left;
  }
}
</style>
