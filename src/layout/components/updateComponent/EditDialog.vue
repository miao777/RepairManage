<template>
  <el-dialog :title="title" :visible.sync="isShow" width="30%" :before-close="handleClose" :close-on-click-modal="false">
    <el-form
      ref="form"
      :model="form"
      status-icon
      :rules="rules"
      label-width="100px"
      style="padding-right:30px;"
    >
      <!-- 旧密码 -->
      <el-form-item :label="$t('updateOwn.usedPwd')" prop="oldPwd">
        <el-input v-model="form.oldPwd" type="text" :placeholder="$t('common.please.enter') + $t('updateOwn.usedPwd')" show-password />
      </el-form-item>
      <!-- 新密码 -->
      <el-form-item :label="$t('updateOwn.newPwd')" prop="newPwd">
        <el-input v-model="form.newPwd" type="text" :placeholder="$t('common.please.enter') + $t('updateOwn.newPwd')" show-password />
      </el-form-item>
      <!-- 确认新密码 -->
      <el-form-item :label="$t('updateOwn.confirmNewPaw')" prop="newPwd2">
        <el-input v-model="form.newPwd2" type="text" :placeholder="$t('common.please.enter') + $t('updateOwn.confirmNewPaw')" show-password />
      </el-form-item>

      <!-- 确定，删除按钮 -->
      <el-form-item class="form-footer" style="margin: 0">
        <el-button type="primary" icon="el-icon-check" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
        <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import updateUserconntentApi from '@/api/user'
export default {
  components: { },
  props: {
    title: {
      type: String,
      default() {
        return this.$t('updateOwn.updatePwd')
      }
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Boolean,
      default: true
    }
  },
  data() {
    var Pwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码（必填）'))
      } else {
        if (this.form.newPwd2 !== '') {
          this.$refs.form.validateField('newPwd2')
        }
        callback()
      }
    }
    var confirmPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        newPwd: '',
        newPwd2: '',
        oldPwd: ''
      },
      rules: {
        oldPwd: [{ required: true, message: '请输入旧密码（必填）', trigger: 'blur' }],
        newPwd: [{ required: true, validator: Pwd, trigger: 'blur' }],
        newPwd2: [{ required: true, validator: confirmPwd, trigger: 'blur' }]
      }
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    // 修改密码
    async updateUserPwd() {
      const resp = await updateUserconntentApi.updateUserPwd(this.form)
      if (resp.success) {
        this.handleClose()
        this.$emit('logout')
      }
    },
    // 弹出框是否确认修改密码
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$confirm('修改成功后将退至登陆页面，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.updateUserPwd()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
      })
    },
    // 关闭dailog
    handleClose(done) {
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
      this.$emit('close')
    },
    handleChangeUsername() {
      if (!isNaN(this.form.username)) {
        this.form.mobileNo = this.form.username
      }
    }

  }
}
</script>
