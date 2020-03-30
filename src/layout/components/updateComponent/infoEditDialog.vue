<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" @open="handleOpen">
    <el-form
      ref="form"
      :model="form"
      status-icon
      :rules="rules"
      label-width="100px"
    >
      <el-form-item :label="$t('user.headerUrl')" prop="headerUrl">
        <Uploader ref="uploader" :image="form.headerUrl" @on-success="handleUploadSuccess" />
      </el-form-item>
      <el-form-item :label="$t('user.name')" prop="name">
        <el-input v-model="form.name" type="text" :placeholder="$t('common.please.enter') + $t('user.username')" />
      </el-form-item>
      <el-form-item :label="$t('user.sex')" prop="sex">
        <el-radio v-model="form.sex" :label="true">男</el-radio>
        <el-radio v-model="form.sex" :label="false">女</el-radio>
      </el-form-item>
      <el-form-item :label="$t('user.mobileNo')" prop="mobileNo">
        <el-input v-model="form.mobileNo" type="text" :placeholder="$t('common.please.enter') + $t('user.mobileNo')" maxlength="11" />
      </el-form-item>
      <el-form-item :label="$t('user.email')" prop="email">
        <el-input v-model="form.email" type="text" :placeholder="$t('common.please.enter') + $t('user.email')" />
      </el-form-item>

      <el-form-item class="form-footer" style="margin: 0">
        <el-button type="primary" icon="el-icon-check" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
        <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// import { getInfo, updateIfoContent } from '@/api/user'
import updateUserconntentApi from '@/api/user'
import Uploader from '@/components/Uploader'
import { checkMobile, checkMailBox } from '@/tools/date.js'
export default {
  components: { Uploader },
  props: {
    title: {
      type: String,
      default() {
        return this.$t('common.add')
      }
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roles: [],
      form: {
        email: '', // 邮箱
        headerUrl: '', // 头像
        mobileNo: '', // 电话
        name: '', // 名字
        nickname: '',
        sex: true // 男女
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur,change' }],
        mobileNo: [{ required: true, validator: checkMobile, trigger: 'blur' }],
        email: [{ required: true, validator: checkMailBox, trigger: 'blur' }]
      }
    }
  },
  created() {
  },
  methods: {
    // 修改自己信息
    async updateIfoContent() {
      const resp = await updateUserconntentApi.updateIfoContent(this.form)
      if (resp.success) {
        this.$store.dispatch('user/getInfo')
        this.handleClose()
      }
    },
    // 获取用户自己的信息
    async getInfo() {
      const resp = await updateUserconntentApi.getInfo()
      if (resp.success) {
        const data = resp.data
        this.form.email = data.email
        this.form.headerUrl = data.headerUrl
        this.form.mobileNo = data.mobileNo
        this.form.name = data.name
        this.form.sex = data.sex !== '' ? data.sex : true
      }
    },
    handleOpen() {
      this.getInfo()
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.updateIfoContent()
        }
      })
    },
    handleClose(done) {
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
      this.$emit('close')
    },
    handleUploadSuccess(resp) {
      // this.form.headerUrl = resp.data.url
      this.form.headerUrl = resp.data.fullPath
    },
    handleChangeUsername() {
      if (!isNaN(this.form.username)) {
        this.form.mobileNo = this.form.username
      }
    }
  }
}
</script>
