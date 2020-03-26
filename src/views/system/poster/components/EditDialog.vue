<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px">
      <el-form-item label="图片" prop="imageId">
        <Uploader ref="uploader" :image="form.icon" @on-success="handleUploadSuccess" />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" type="text" :placeholder="$t('common.please.enter') + '标题'" />
      </el-form-item>
      <el-form-item label="简介" prop="summary">
        <el-input v-model="form.summary" type="text" :placeholder="$t('common.please.enter') + '简介'" />
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
import PosterApi from '@/api/poster'
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
      form: {
        id: '',
        imageId: '',
        sortNo: '',
        summary: '',
        title: '',
        type: 'HOME_CAROUSEL'
      },
      rules: {
        imageId: [{ required: true, message: '请上传图片', trigger: 'blur,change' }],
        summary: [{ required: true, message: '请输入简介', trigger: 'blur,change' }],
        sortNo: [{ required: true, message: '请填写顺序', trigger: 'blur,change' }],
        title: [{ required: true, message: '请选输入标题', trigger: 'blur,change' }]
      }
    }
  },
  created() {
  },
  methods: {
    async addMenu() {
      delete this.form.id
      delete this.form.icon
      const resp = await PosterApi.add(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    async editMenu() {
      delete this.form.icon
      const resp = await PosterApi.edit(this.form)
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
        this.form.icon = this.$props.data.image.fullPath
        this.form.imageId = this.$props.data.image.id
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
      this.$refs.uploader.closeMyself()
      this.$emit('close')
    },
    handleUploadSuccess(resp) {
      this.form.imageId = resp.data.id
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
