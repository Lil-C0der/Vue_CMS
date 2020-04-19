<template>
  <div>
    <!-- 一级 -->
    <el-row class="row-outer" v-for="(level1, i) in children" :key="i">
      <el-col class="level-1" :span="5">
        <el-tag closable type="primary" @close="removeTag(roleId, level1.id)">
          {{ level1.authName }}
        </el-tag>
        <i class="el-icon-caret-right"></i>
      </el-col>
      <!-- 二级&三级 -->
      <el-col :span="19">
        <el-row
          class="row-inner"
          v-for="(level2, i) in level1.children"
          :key="i"
        >
          <!-- 二级权限 -->
          <el-col class="level-2" :span="8">
            <el-tag
              closable
              type="success"
              @close="removeTag(roleId, level2.id)"
            >
              {{ level2.authName }}
            </el-tag>
            <i class="el-icon-caret-right"></i>
          </el-col>
          <!-- 三级权限 -->
          <el-col class="level-3" :span="16">
            <el-tag
              v-for="(level3, i) in level2.children"
              :key="i"
              closable
              type="warning"
              @close="removeTag(roleId, level3.id)"
            >
              {{ level3.authName }}
            </el-tag>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'RolesExpandTree',
  data() {
    return {
      userInfo: {}
    }
  },
  props: {
    roleId: {
      type: Number,
      default: 0
    },
    children: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    removeTag(roleId, rightId) {
      const ids = {
        roleId,
        rightId
      }
      this.$bus.$emit('removeTag', ids)
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.el-row {
  border-bottom: 1px solid #dcdfe6;
}
.el-col {
  text-align: left !important;
}
.row-outer,
.row-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .el-tag {
    margin-right: 10px;
  }
}
.row-outer {
  &:first-of-type {
    border-top: 1px solid #dcdfe6;
  }
}
.row-inner {
  &:last-of-type {
    border: none;
  }
}

.el-tag {
  margin: 20px 10px;
}
</style>
