<template>
  <el-card>
    <!-- 提示 -->
    <el-alert
      title="添加商品信息"
      type="info"
      center
      show-icon
      :closable="false"
    >
    </el-alert>
    <!-- 步骤条 -->
    <el-steps
      class="steps"
      align-center
      :active="activeStepIndex - 0"
      finish-status="success"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <!-- 添加商品表单 -->
    <el-form
      label-position="top"
      ref="addGoodsFormRef"
      :model="addGoodsForm"
      :rules="addGoodsFormRules"
    >
      <!-- 标签栏 -->
      <el-tabs
        :before-leave="handleTabLeave"
        v-model="activeStepIndex"
        tab-position="left"
      >
        <el-tab-pane label="基本信息">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addGoodsForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input
              v-model.number="addGoodsForm.goods_price"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input
              v-model.number="addGoodsForm.goods_weight"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input
              v-model.number="addGoodsForm.goods_number"
              type="number"
            ></el-input>
          </el-form-item>
          <!-- 级联选择器 -->
          <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
              v-model="addGoodsForm.goods_cat"
              ref="cascaderRef"
              :options="catList"
              @change="handleChange"
              :props="{
                expandTrigger: 'hover',
                label: 'cat_name',
                value: 'cat_id'
              }"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <!-- 商品参数内容 -->
          <el-form-item
            v-for="n in paramsList.many"
            :key="n.attr_id"
            :label="n.attr_name"
          >
            <!-- 复选框组 -->
            <el-checkbox-group v-model="n.attr_vals">
              <el-checkbox
                border
                :label="cb"
                v-for="(cb, i) in n.attr_vals"
                :key="i"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <!-- 静态属性内容 -->
          <el-form-item
            v-for="n in paramsList.only"
            :key="n.attr_id"
            :label="n.attr_name"
          >
            <el-input v-model="n.attr_vals[0]"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <!-- 上传图片 -->
          <el-upload
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleUploadSuccess"
            class="upload-demo"
            list-type="picture"
            :headers="token"
            action="http://127.0.0.1:8888/api/private/v1/upload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <!-- 富文本编辑器 商品内容 -->
          <quill-editor
            @blur="onEditorBlur"
            @focus="onEditorFocus"
            @ready="onEditorReady"
            v-model="addGoodsForm.goods_introduce"
          ></quill-editor>
          <el-button type="primary" @click="saveAddGoods">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-form>

    <!-- 预览图片对话框 -->
    <el-dialog
      title="预览图片"
      width="50%"
      :visible.sync="previewDialogVisible"
    >
      <img class="preview-Img" :src="this.previewImgUrl" />
    </el-dialog>
  </el-card>
</template>

<script>
import { getCategories } from 'network/categories'
import { getParamsListById } from 'network/params'
import { addGoods } from 'network/goods'

import { MANY, ONLY } from 'common/const'

import { quillEditor } from 'vue-quill-editor'

import { mapMutations } from 'vuex'
import { SETCRUMBOBJ } from 'store/types'
export default {
  name: 'AddGoods',
  data() {
    return {
      activeStepIndex: 0,
      addGoodsForm: {
        goods_name: '',
        goods_price: null,
        goods_weight: null,
        goods_number: null,
        goods_cat: [],
        attrs: [],
        pics: [],
        goods_introduce: ''
      },
      addGoodsFormRules: {
        goods_name: {
          required: true,
          message: '请输入商品名称',
          trigger: 'blur'
        },
        goods_price: {
          required: true,
          type: 'number',
          message: '请输入商品价格',
          trigger: 'blur'
        },
        goods_weight: {
          required: true,
          type: 'number',
          message: '请输入商品重量',
          trigger: 'blur'
        },
        goods_number: {
          required: true,
          type: 'number',
          message: '请输入商品数量',
          trigger: 'blur'
        },
        goods_cat: {
          required: true,
          message: '请选择商品分类',
          trigger: 'blur'
        }
      },
      catList: [],
      paramsList: {
        many: null,
        only: null
      },
      previewDialogVisible: false,
      previewImgUrl: ''
    }
  },
  components: {
    quillEditor
  },
  methods: {
    ...mapMutations([SETCRUMBOBJ]),
    // 获取商品分类列表
    iniCatList() {
      getCategories().then((res) => {
        this.catList = res.data
      })
    },
    // 级联选择器选项变化时获取选中的分类
    handleChange() {
      if (this.addGoodsForm.goods_cat.length !== 3) {
        this.addGoodsForm.goods_cat.length = []
        return this.$message
          .warning({
            message: '只允许选中第三级分类',
            center: true,
            showClose: true,
            duration: 1000
          })
          .catch((err) => {
            this.$message.error({
              message: err,
              center: true,
              showClose: true,
              duration: 1000
            })
          })
      }
      // 获取参数列表
      Promise.all([
        this.getParamsList(this.lastCatId, MANY),
        this.getParamsList(this.lastCatId, ONLY)
      ]).then(() => {
        this.$message.success({
          message: '获取参数列表成功',
          center: true,
          showClose: true,
          duration: 1000
        })
      })
    },
    // 表单预校验
    preCheck(ref) {
      return this.$refs[ref].validate()
    },
    // tab标签切换
    handleTabLeave(to, from) {
      if (typeof this.addGoodsForm.goods_cat === 'object') {
        if (from === '0' && this.addGoodsForm?.goods_cat?.length !== 3) {
          this.$message.warning({
            message: '请选择商品分类',
            center: true,
            showClose: true,
            duration: 1000
          })
          return false
        }
      }
    },
    getParamsList(id, sel) {
      getParamsListById(id, sel).then((res) => {
        this.paramsList[sel] = res.data
        this.paramsList[sel].forEach((n) => {
          n.attr_vals = n.attr_vals ? n.attr_vals.split(',') : null
        })
      })
    },
    // 预览图片
    handlePreview(file) {
      this.previewImgUrl = file.response.data.url
      this.previewDialogVisible = true
    },
    // 移除图片
    handleRemove(file, fileList) {
      const removeFilePath = file.response.data.tmp_path
      const index = this.addGoodsForm.pics.findIndex(
        (n) => n.pic === removeFilePath
      )
      this.addGoodsForm.pics.splice(index, 1)
    },
    // 上传成功后的钩子函数
    handleUploadSuccess(res, file, fileList) {
      if (res.meta.status !== 200) {
        return this.$message.success({
          message: res.meta.msg,
          center: true,
          showClose: true,
          duration: 1000
        })
      }
      this.$message.success({
        message: res.meta.msg,
        center: true,
        showClose: true,
        duration: 1000
      })
      this.addGoodsForm.pics.push({ pic: res.data.tmp_path })
    },
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorReady() {},
    // 发送请求 添加商品
    saveAddGoods() {
      this.preCheck('addGoodsFormRef')
        .then(() => {
          this.addGoodsForm.goods_cat += ''
          const attrObj = JSON.parse(JSON.stringify(this.paramsList))
          for (const key in attrObj) {
            attrObj[key].forEach((n) => {
              n.attr_vals += ''
              const { attr_id, attr_vals } = n
              this.addGoodsForm.attrs.push({ attr_id, attr_vals })
            })
          }
          const {
            goods_name,
            goods_cat,
            goods_price,
            goods_number,
            goods_weight,
            goods_introduce,
            pics,
            attrs
          } = this.addGoodsForm
          return addGoods(
            goods_name,
            goods_cat,
            goods_price,
            goods_number,
            goods_weight,
            goods_introduce,
            pics,
            attrs
          ).then((res) => {
            if (res.meta.status !== 201) {
              return this.$message.error({
                message: res.meta.msg,
                center: true,
                showClose: true,
                duration: 1000
              })
            }
            this.$message.success({
              message: res.meta.msg,
              center: true,
              showClose: true,
              duration: 1000
            })
            // 路由跳转
            this.$router.push('/goods')
          })
        })
        .catch(() => {
          return this.$message.error({
            message: '必填项不能为空！',
            center: true,
            showClose: true,
            duration: 1000
          })
        })
    }
  },
  computed: {
    lastCatId() {
      if (!this.addGoodsForm.goods_cat.length) return false
      else return this.addGoodsForm.goods_cat[2]
    },
    token() {
      const headerObj = {
        Authorization: window.sessionStorage.getItem('token')
      }
      return headerObj
    }
  },
  created() {
    this.iniCatList()
  }
}
</script>

<style lang="less" scoped>
.el-card {
  .el-checkbox {
    margin: 0;
  }
  .preview-Img {
    width: 100%;
    height: 100%;
  }
  .quill-editor {
    margin-bottom: 20px;
    /deep/.ql-container {
      min-height: 320px;
    }
  }
}
/deep/.steps {
  margin: 20px 0;
  .el-step__title {
    font-size: 14px;
  }
}
</style>
