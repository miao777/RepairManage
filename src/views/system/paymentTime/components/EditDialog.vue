<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px">
      <el-form-item label="图片" prop="iconId">
        <Uploader ref="uploader" :image="form.icon" @on-success="handleUploadSuccess" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option v-for="item in customerList" :key="item.name" :label="item.value" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" type="text" :placeholder="$t('common.please.enter') + '名称'" />
      </el-form-item>
      <el-form-item label="排序" prop="sortNo">
        <el-input v-model="form.sortNo" type="tel" :placeholder="$t('common.please.enter') + '排序'" />
      </el-form-item>
      <el-form-item class="form-footer" style="margin: 0">
        <el-button type="primary" icon="el-icon-check" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
        <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { assignExistField } from '@/utils'
import Uploader from '@/components/Uploader'
import CategoryApi from '@/api/category'
export default {
  components: { Uploader },
  props: {
    title: {
      type: String,
      default: '新增'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      customerList: [],
      form: {
        id: '',
        iconId: '',
        name: '',
        sortNo: '',
        type: ''
      },
      rules: {
        iconId: [{ required: true, message: '请上传图片', trigger: 'blur,change' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur,change' }],
        sortNo: [{ required: true, message: '请填写顺序', trigger: 'blur,change' }],
        type: [{ required: true, message: '请选择类型', trigger: 'blur,change' }]
      }
    }
  },
  created() {
    this.custormerType()
  },
  methods: {
    async custormerType() {
      const resp = await CategoryApi.custormerType()
      if (resp.success) {
        this.customerList = resp.rows
      }
    },
    async addMenu() {
      delete this.form.id
      const resp = await CategoryApi.add(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    async editMenu() {
      const resp = await CategoryApi.edit(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    handleOpen() {
      if (!this.$props.isAdd) {
        assignExistField(this.$props.data, this.form)
        this.$nextTick(() => {
          this.$refs.uploader.loadImage()
        })
        this.form.icon = this.$props.data.icon
      }
    },

    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$props.isAdd ? this.addMenu() : this.editMenu()
        }
      })
    },
    handleClose(done) {
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
      this.$emit('close')
    },
    handleUploadSuccess(resp) {
      this.form.iconId = resp.data.id
    }
  }
}
</script>
<style>
    .icon-in-table {
        font-size: 18px;
        color: #f56c6c;
        margin-right: 5px;
    }
</style>
