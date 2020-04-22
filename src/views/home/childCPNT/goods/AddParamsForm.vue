<template>
  <el-form
    ref="formRef"
    :model="addParamsForm"
    :rules="addParamsFormRules"
    label-width="80px"
  >
    <el-form-item :label="labelName" prop="paramsName">
      <el-input v-model="addParamsForm.paramsName"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { MANY } from 'common/const'

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
  },
  computed: {
    labelName() {
      if (this.sel === MANY) {
        return '参数名称'
      } else return '属性名称'
    }
  }
}
</script>

<style scoped></style>
