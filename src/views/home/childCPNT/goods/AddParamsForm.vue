<template>
  <el-form
    ref="formRef"
    :model="addParamsForm"
    :rules="addParamsFormRules"
    label-width="80px"
  >
    <el-form-item
      :label="sel === 'many' ? '参数名称' : '属性名称'"
      prop="paramsName"
    >
      <el-input v-model="addParamsForm.paramsName"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AddParamsForm',
  data() {
    return {
      addParamsForm: {
        paramsName: ''
      },
      addParamsFormRules: {
        paramsName: [
          {
            required: true,
            message: '请输入参数名或属性名',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  props: {
    sel: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped></style>
