<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px">

      <el-form-item label="标题" prop="title">
        <el-input v-model.trim="form.title" type="text" :placeholder="$t('common.please.enter') + '标题'" />
      </el-form-item>

      <el-form-item label="排序" prop="sortNo">
        <el-input-number v-model="form.sortNo" :min="0" :step="1" step-strictly label="排序" />
      </el-form-item>

      <el-form-item v-if="isShow" label="简介" prop="summary">
        <tinymce-editor :tinymce-id="contentId" :data="form.summary" @change="handleEditorChange" />
      </el-form-item>

      <el-form-item class="form-footer" style="margin: 0">
        <el-button type="primary" icon="el-icon-check" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
        <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import TinymceEditor from '@/components/TinyMCE'
import tinymce from 'tinymce/tinymce'
import { assignExistField } from '@/utils'
import PosterApi from '@/api/poster'
export default {
  components: { TinymceEditor },
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
      contentId: 'tinyContent',
      form: {
        id: '',
        imageId: '',
        sortNo: '',
        summary: '',
        title: '',
        type: 'THIRD_PARTY_PROTOCOL'
      },
      rules: {
        summary: [{ required: true, message: '请输入简介', trigger: 'blur,change' }],
        sortNo: [{ required: true, message: '请填写顺序', trigger: 'blur,change' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur,change' }]
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
        this.contentId = 'tinyContent-edit'
        assignExistField(this.$props.data, this.form)
        this.$nextTick(() => {
          tinymce.activeEditor.setContent(this.form.summary)
        })
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
    // 富文本赋值
    handleEditorChange(content) {
      this.form.summary = content
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
