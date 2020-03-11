<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-form ref="forms" :model="forms" status-icon :rules="rules" label-width="100px">

      <el-form-item label="管理员头像" prop="headerUrl">
        <Uploader ref="uploader" :image="forms.headerUrl" @on-success="handleUploadSuccess" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="forms.name" type="text" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="登陆手机号" prop="mobileNo">
        <el-input v-model="forms.mobileNo" type="text" placeholder="请输入登陆手机号" maxlength="11" />
      </el-form-item>
      <el-form-item v-if="!isAdd" label="密码" prop="password">
        <el-input v-model="forms.password" type="text" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="forms.nickname" type="text" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="forms.roleId" placeholder="请选择角色">
          <el-option v-for="item in enterpriseststus" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="forms.sex" :label="true">男</el-radio>
        <el-radio v-model="forms.sex" :label="false">女</el-radio>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="forms.email" type="text" placeholder="输入邮箱" />
      </el-form-item>
      <el-form-item class="form-footer" style="margin: 0">
        <el-button type="primary" icon="el-icon-check" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
        <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import Uploader from '@/components/Uploader'
import { assignExistField } from '@/utils'
import EnterpriseApi from '@/api/enterprise'
import { checkMobile, checkMailBox } from '@/tools/date.js'
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
    },
    enterpriseId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showParent: false,
      enterpriseststus: [],
      forms: {
        email: '',
        headerUrl: '',
        name: '',
        nickname: '',
        roleId: '',
        sex: false,
        mobileNo: '',
        password: ''
      },
      rules: {
        email: [{ validator: checkMailBox, trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        roleId: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        mobileNo: [{ required: true, validator: checkMobile, trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      searchForm: {
        filters: [
          { field: 'name', op: 'LIKE', value: '' },
          { field: 'type', op: 'EQ', value: '' },
          { field: 'key', op: 'EQ', value: '' }
        ],
        page: { page: 0, size: 99999999 }
      }
    }
  },
  created() {
    this.getroles()
  },
  methods: {
    // 获取企业角色id
    async getroles() {
      const resp = await EnterpriseApi.getroles()
      if (resp.success) {
        this.enterpriseststus = resp.rows
      }
    },
    handleUploadSuccess(resp) {
      this.forms.headerUrl = resp.data.fullPath
    },
    async addMenu() {
      const resp = await EnterpriseApi.addUser(this.enterpriseId, this.forms)
      if (resp.success) {
        this.handleClose()
      }
    },
    async editMenu() {
      const resp = await EnterpriseApi.editUser(this.enterpriseId, this.forms)
      if (resp.success) {
        this.handleClose()
      }
    },
    handleOpen() {
      if (this.$props.isAdd) {
        assignExistField(this.$props.data, this.forms)
        this.forms.roleId = this.$props.data.role.id
        this.forms.id = this.$props.data.id
        // this.forms.mobileNo = this.forms.mobileNo.substr(1, this.forms.mobileNo.length - 1)
        this.$nextTick(() => {
          this.$refs.uploader.loadImage()
        })
        delete this.forms.password
      }
    },
    handleSubmit() {
      this.$refs.forms.validate(valid => {
        if (valid) {
          this.$props.isAdd ? this.editMenu() : this.addMenu()
        }
      })
    },
    handleClose(done) {
      this.$refs.forms.resetFields()
      this.$refs.forms.clearValidate()
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
