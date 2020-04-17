<template>
  <!-- 对话框 -->
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    @closed="clearForm"
  >
    <!-- 对话框内容 -->
    <slot></slot>
    <!-- 对话框按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  data() {
    return {}
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 点击确定按钮后 先进行表单预校验
    save() {
      this.$emit('saveChange')
    },
    cancel() {
      this.$emit('cancelDialog')
    },
    handleClose() {
      this.$emit('cancelDialog')
    },
    // 对话框关闭 重置表单
    clearForm() {
      this.$emit('clearForm')
    }
  },
  components: {}
}
</script>

<style scoped>
.el-input {
  width: 80%;
  margin-left: -80px;
}
</style>
