<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px">
      <el-form-item label="反馈标题" prop="title">
        <el-input v-model="form.title" type="text" :placeholder="$t('common.please.enter') + '反馈标题'" />
      </el-form-item>
      <el-form-item label="反馈级别" prop="level">
        <el-select v-model="form.level" placeholder="请选择反馈级别">
          <el-option v-for="item in customerList" :key="item.name" :label="item.value" :value="item.name" />
        </el-select>
      </el-form-item>

      <el-form-item label="排序" prop="sortNo">
        <el-input-number v-model="form.sortNo" :min="0" :step="1" step-strictly label="排序" />
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
import FeedbackApi from '@/api/feedback.js'
export default {
  components: { },
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
        level: '',
        sortNo: '',
        title: ''
      },
      rules: {
        title: [{ required: true, message: '请输入反馈标题', trigger: 'blur,change' }],
        sortNo: [{ required: true, message: '请填写顺序', trigger: 'blur,change' }],
        level: [{ required: true, message: '请选择反馈标题级别', trigger: 'blur,change' }]
      }
    }
  },
  created() {
    this.custormerType()
  },
  methods: {
    // 反馈级别
    async custormerType() {
      const resp = await FeedbackApi.titlegetlevel()
      if (resp.success) {
        this.customerList = resp.rows
      }
    },
    async addMenu() {
      delete this.form.id
      const resp = await FeedbackApi.titleadd(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    async editMenu() {
      const resp = await FeedbackApi.titleedit(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    handleOpen() {
      if (!this.$props.isAdd) {
        assignExistField(this.$props.data, this.form)
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
