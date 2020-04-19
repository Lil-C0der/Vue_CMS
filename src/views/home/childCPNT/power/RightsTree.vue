<template>
  <el-tree
    :data="rightsList"
    ref="treeRef"
    :props="{ label: 'authName' }"
    node-key="id"
    show-checkbox
    default-expand-all
    :default-checked-keys="defCheckedKeys"
  >
  </el-tree>
</template>

<script>
export default {
  name: 'RightTree',
  data() {
    return {}
  },
  props: {
    rightsList: {
      type: Array,
      default: () => []
    },
    defCheckedKeys: {
      type: Array,
      default: () => []
    }
  },
  components: {}
}
</script>

<style scoped></style>
