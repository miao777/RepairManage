<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px">
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="form.name" type="text" placeholder="输入企业联系电话" />
      </el-form-item>
      <el-form-item label="企业联系人" prop="contactPerson">
        <el-input v-model="form.contactPerson" type="text" placeholder="输入企业联系人" />
      </el-form-item>
      <el-form-item label="企业联系电话" prop="contractPhone">
        <el-input v-model="form.contractPhone" type="text" placeholder="输入企业联系电话" maxlength="11" />
      </el-form-item>
      <el-form-item label="企业地址" prop="address">
        <el-input v-model="form.address" type="text" placeholder="输入企业地址" />
      </el-form-item>
      <el-form-item v-if="isAdd" label="管理员头像" prop="user.headerUrl">
        <Uploader ref="uploader" :image="form.headerUrl" @on-success="handleUploadSuccess" />
      </el-form-item>
      <el-form-item v-if="isAdd" label="昵称" prop="user.nickname">
        <el-input v-model="form.user.nickname" type="text" placeholder="输入昵称" />
      </el-form-item>
      <el-form-item v-if="isAdd" label="用户名" prop="user.username">
        <el-input v-model="form.user.username" type="text" placeholder="输入昵称" />
      </el-form-item>
      <el-form-item v-if="isAdd" :label="$t('user.password')" prop="user.password">
        <el-input v-model="form.user.password" type="password" show-password :placeholder="$t('common.please.enter') + $t('user.password')" />
      </el-form-item>
      <el-form-item v-if="isAdd" label="姓名" prop="user.name">
        <el-input v-model="form.user.name" type="text" :placeholder="$t('common.please.enter') + $t('user.username')" />
      </el-form-item>
      <el-form-item v-if="isAdd" label="性别" prop="user.sex">
        <el-radio v-model="form.user.sex" :label="true">男</el-radio>
        <el-radio v-model="form.user.sex" :label="false">女</el-radio>
      </el-form-item>
      <el-form-item v-if="isAdd" label="联系电话" prop="user.mobileNo">
        <el-input v-model="form.user.mobileNo" type="text" placeholder="输入企业联系电话" />
      </el-form-item>
      <el-form-item v-if="isAdd" label="管理员邮箱" prop="user.email">
        <el-input v-model="form.user.email" type="text" placeholder="输入企业联系电话" />
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
    }
  },
  data() {
    return {
      showParent: false,
      form: {
        address: '',
        contactPerson: '',
        contractPhone: '',
        name: '',
        user: {
          email: '', //
          headerUrl: '',
          name: '', //
          nickname: '', //
          mobileNo: '', //
          password: '', //
          roleId: '', //
          sex: false,
          username: ''//
        }
      },
      rules: {
        address: [{ required: true, message: '请输入企业地址', trigger: 'blur' }],
        contactPerson: [{ required: true, message: '请输入企业联系人', trigger: 'blur' }],
        contractPhone: [{ required: true, message: '请输入企业联系电话', trigger: 'blur' }],
        name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        'user.email': [{ required: true, validator: checkMailBox, trigger: 'blur' }],
        'user.name': [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        'user.nickname': [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        'user.mobileNo': [{ required: true, validator: checkMobile, trigger: 'blur' }],
        'user.password': [{ required: true, message: '请输入密码', trigger: 'blur' }],
        'user.roleId': [{ required: true, message: '请选择角色', trigger: 'blur' }],
        'user.username': [{ required: true, message: '请输入账号', trigger: 'blur' }]
      },
      searchForm: {
        filters: [
          { field: 'name', op: 'LIKE', value: '' },
          { field: 'type', op: 'EQ', value: '' },
          { field: 'key', op: 'EQ', value: '' }
        ],
        page: {
          page: 0,
          size: 99999999
        }
      }
    }
  },
  created() {},
  methods: {
    // 获取企业角色id
    async getroles() {
      const resp = await EnterpriseApi.getroles()
      if (resp.success) {
        const el = resp.rows.filter(item => item.key === 'ENTERPRISE_MANAGER_CUSTOMER')
        this.form.user.roleId = el[0].id
      }
    },
    handleUploadSuccess(resp) {
      this.form.user.headerUrl = resp.data.fullPath
    },
    async addMenu() {
      delete this.form.id
      const resp = await EnterpriseApi.add(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    async editMenu() {
      const resp = await EnterpriseApi.edituser(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    handleOpen() {
      if (!this.$props.isAdd) {
        delete this.form.user
        assignExistField(this.$props.data, this.form)
        this.form.id = this.$props.data.id
      } else {
        this.getroles()
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
