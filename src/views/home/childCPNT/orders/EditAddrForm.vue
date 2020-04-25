<template>
  <el-form ref="formRef" :model="addrForm" :rules="editFormRules">
    <el-form-item label="省市区/县" prop="addrProvinces">
      <el-cascader
        v-model="addrForm.addrProvinces"
        :options="cityData"
        :props="{ expandTrigger: 'hover' }"
      ></el-cascader>
    </el-form-item>
    <el-form-item label="详细地址" prop="addrDetail">
      <el-input v-model="addrForm.addrDetail"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import cityData from './citydata'

export default {
  name: 'EditAddrForm',
  data() {
    return {
      editFormRules: {
        addrProvinces: {
          required: true,
          message: '请选择省市区/县',
          trigger: 'blur'
        },
        addrDetail: {
          required: true,
          message: '请填写详细地址',
          trigger: 'blur'
        }
      },
      cityData
    }
  },
  components: {},
  methods: {},
  props: {
    addrForm: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    console.log(this.cityData)
  }
}
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>
