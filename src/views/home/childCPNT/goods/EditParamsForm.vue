<template>
  <el-form
    ref="formRef"
    :model="editParamsForm"
    :rules="editParamsFormRules"
    label-width="80px"
  >
    <el-form-item
      :label="sel === 'many' ? '参数名称' : '属性名称'"
      prop="attr_name"
    >
      <el-input v-model="editParamsForm.attr_name"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'EditParamsForm',
  data() {
    return {
      editParamsFormRules: {
        attr_name: [
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
    editParamsForm: {
      attr_name: ''
    },
    sel: {
      type: String,
      default: ''
    }
  },
  components: {}
}
</script>

<style scoped></style>
