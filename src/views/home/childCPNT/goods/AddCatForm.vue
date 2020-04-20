<template>
  <el-form
    ref="formRef"
    :model="addCatForm"
    :rules="addCatFormRules"
    label-width="80px"
  >
    <el-form-item label="分类名称" prop="catName">
      <el-input v-model="addCatForm.catName"></el-input>
    </el-form-item>
    <el-form-item label="父级分类">
      <!-- TODO 选择父级分类 级联选择器-->

      <el-cascader
        ref="cascaderRef"
        clearable
        :options="topCatList"
        :props="{
          checkStrictly: true,
          expandTrigger: 'hover',
          label: 'cat_name',
          value: 'cat_id'
        }"
      ></el-cascader>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AddCatForm',
  data() {
    return {
      addCatForm: {
        catName: ''
      },
      addCatFormRules: {
        catName: [{ required: true, message: '请输入分类名', trigger: 'blur' }]
      },
      options: this.topCatList
    }
  },
  props: {
    topCatList: {
      type: Array,
      default: () => []
    }
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
.el-cascader {
  width: 100%;
}
</style>
