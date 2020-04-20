<template>
  <el-form
    ref="formRef"
    :model="editCatForm"
    :rules="editCatFormRules"
    label-width="80px"
  >
    <el-form-item label="分类名称" prop="cat_name">
      <el-input v-model="editCatForm.cat_name"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'EditCatForm',
  data() {
    return {
      editCatFormRules: {
        cat_name: [{ required: true, message: '请输入分类名', trigger: 'blur' }]
      }
    }
  },
  props: {
    editCatForm: {
      id: '',
      cat_name: '',
      cat_deleted: '',
      cat_pid: ''
    }
  },
  components: {}
}
</script>

<style scoped></style>
