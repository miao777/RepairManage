<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-form
      ref="form"
      :model="form"
      status-icon
      :rules="rules"
      label-width="100px"
    >
      <el-form-item :label="$t('role.name')" prop="role.id">
        <el-select v-model="form.role.id" :placeholder="$t('role.name')">
          <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('user.username')" prop="username">
        <el-input v-model="form.username" type="text" :placeholder="$t('common.please.enter') + $t('user.username')" @change="handleChangeUsername" />
      </el-form-item>
      <el-form-item v-if="isAdd" :label="$t('user.password')" prop="password">
        <el-input v-model="form.password" type="password" show-password :placeholder="$t('common.please.enter') + $t('user.password')" />
      </el-form-item>
      <el-form-item :label="$t('user.name')" prop="name">
        <el-input v-model="form.name" type="text" :placeholder="$t('common.please.enter') + $t('user.username')" />
      </el-form-item>
      <el-form-item :label="$t('user.headerUrl')" prop="headerUrl">
        <Uploader ref="uploader" :image="form.headerUrl" @on-success="handleUploadSuccess" />
      </el-form-item>
      <el-form-item :label="$t('user.sex')" prop="sex">
        <el-radio v-model="form.sex" :label="true">男</el-radio>
        <el-radio v-model="form.sex" :label="false">女</el-radio>
      </el-form-item>
      <el-form-item :label="$t('user.mobileNo')" prop="mobileNo">
        <el-input v-model="form.mobileNo" type="text" :placeholder="$t('common.please.enter') + $t('user.mobileNo')" />
      </el-form-item>
      <el-form-item :label="$t('user.email')" prop="email">
        <el-input v-model="form.email" type="text" :placeholder="$t('common.please.enter') + $t('user.email')" />
      </el-form-item>
      <!-- <el-form-item :label="$t('user.status')" prop="status">
        <el-switch v-model="form.status" active-color="#0fb336" />
      </el-form-item> -->
      <el-form-item class="form-footer" style="margin: 0">
        <el-button type="primary" icon="el-icon-check" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
        <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { add, edit, getManagerRoles } from '@/api/user'
import Uploader from '@/components/Uploader'
import { assignExistField } from '@/utils'
import { regular } from '@/utils/validate'
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
      roles: [],
      form: {
        id: '',
        username: '',
        password: '',
        name: '',
        headerUrl: '',
        sex: true,
        mobileNo: '',
        // status: true,
        email: '',
        role: { id: '' }
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur,change' },
          { trigger: 'blur,change', ...regular.en_word },
          { max: 32, message: '长度不能超过32个字符' }
        ],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur,change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur,change' }],
        mobileNo: [{ required: true, message: '请输入电话号码', trigger: 'blur,change' }]
      }
    }
  },
  created() {
    this.loadRoles()
  },
  methods: {
    async loadRoles() {
      const resp = await getManagerRoles()
      if (resp.success) {
        this.roles = resp.rows
      }
    },
    async add() {
      delete this.form.id
      const resp = await add(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    async edit() {
      const resp = await edit(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    handleOpen() {
      if (!this.$props.isAdd) {
        assignExistField(this.$props.data, this.form)
        this.form.role.id = this.$props.data.roleId
        this.$nextTick(() => {
          this.$refs.uploader.loadImage()
        })
      }
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$props.isAdd ? this.add() : this.edit()
        }
      })
    },
    handleClose(done) {
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
      this.$emit('close')
    },
    handleUploadSuccess(resp) {
      this.form.headerUrl = resp.data.url
      console.log(this.form.headerUrl, 'dsdsasadsadsad')
    },
    handleChangeUsername() {
      if (!isNaN(this.form.username)) {
        this.form.mobileNo = this.form.username
      }
    }
  }
}
</script>
