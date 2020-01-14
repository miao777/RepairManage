<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px">
      <el-form-item label="企业地址" prop="address">
        <el-input v-model="form.address" type="text" placeholder="输入企业地址" />
      </el-form-item>
      <el-form-item label="企业联系人" prop="contactPerson">
        <el-input v-model="form.contactPerson" type="text" placeholder="输入企业联系人" />
      </el-form-item>

      <el-form-item label="企业联系电话" prop="contractPhone">
        <el-input v-model="form.contractPhone" type="text" placeholder="输入企业联系电话" />
      </el-form-item>

      <el-form-item label="企业名称" prop="name">
        <el-input v-model="form.name" type="text" placeholder="输入企业联系电话" />
      </el-form-item>

      <el-form-item label="管理员邮箱" prop="user.email">
        <el-input v-model="form.user.email" type="text" placeholder="输入企业联系电话" />
      </el-form-item>
      <el-form-item label="管理员头像" prop="user.headerUrl">
        <Uploader ref="uploader" :image="form.headerUrl" @on-success="handleUploadSuccess" />
      </el-form-item>
      <el-form-item label="联系电话" prop="user.mobileNo">
        <el-input v-model="form.user.mobileNo" type="text" placeholder="输入企业联系电话" />
      </el-form-item>
      <el-form-item label="性别" prop="user.sex">
        <el-radio v-model="form.user.sex" :label="true">男</el-radio>
        <el-radio v-model="form.user.sex" :label="false">女</el-radio>
      </el-form-item>
      <el-form-item label="姓名" prop="user.name">
        <el-input v-model="form.user.name" type="text" :placeholder="$t('common.please.enter') + $t('user.username')" />
      </el-form-item>
      <el-form-item label="昵称" prop="user.nickname">
        <el-input v-model="form.user.nickname" type="text" placeholder="输入昵称" />
      </el-form-item>
      <el-form-item label="用户名" prop="user.username">
        <el-input v-model="form.user.username" type="text" placeholder="输入昵称" />
      </el-form-item>
      <el-form-item v-if="isAdd" :label="$t('user.password')" prop="user.password">
        <el-input v-model="form.user.password" type="password" show-password :placeholder="$t('common.please.enter') + $t('user.password')" />
      </el-form-item>
      <el-form-item class="form-footer" style="margin: 0">
        <el-button type="primary" icon="el-icon-check" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
        <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// import { tree, add, edit } from '@/api/menu'
import Uploader from '@/components/Uploader'
import ElementIcon from '@/icons'
import ProvinceApi from '@/api/province'
import EnterpriseApi from '@/api/enterprise'
import { page } from '@/api/role'
// import CityApi from '@/api/city'
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
      levels: [
        {
          label: this.$t('menu.title1'),
          value: 1
        },
        {
          label: this.$t('menu.title2'),
          value: 2
        }
      ],
      parents: [],
      icons: ElementIcon,
      showParent: false,
      form: {
        address: '',
        contactPerson: '',
        contractPhone: '',
        name: '',
        user: {
          email: '',
          headerUrl: '',
          name: '',
          nickname: '',
          password: '',
          roleId: '',
          sex: false,
          username: ''
        }
      },
      rules: {
        // title: [{ required: true, message: '请输入菜单名', trigger: 'blur,change' }]
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
  watch: {
    isShow: function(val) {
      if (val) {
        // console.log(this);
        this.getKeys()
      }
    }
  },
  created() {},
  methods: {
    getKeys() {
      page(this.searchForm).then(res => {
        if (res.success) {
          res.rows.map(el => {
            if (el.key === 'ENTERPRISE_MANAGER_CUSTOMER') {
              this.form.user.roleId = el.id
            }
          })
          console.log(this.form.user.roleId)
        }
      })
    },

    handleUploadSuccess(resp) {
      this.form.user.headerUrl = resp.data.url
    },
    async addMenu() {
      delete this.form.id
      const resp = await EnterpriseApi.add(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    async editMenu() {
      const resp = await EnterpriseApi.edit(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    handleOpen() {
      this.handleChangeLevel()
      if (!this.$props.isAdd) {
        this.form.provinceId = this.$props.data.id
        this.form = this.$props.data
      }
    },
    handleChangeLevel() {
      if (this.form.level === 1) {
        this.showParent = false
        this.form.parentId = ''
      } else {
        this.showParent = true
        if (this.parents.length === 0) {
          this.loadParentMenu()
        }
      }
    },
    async loadParentMenu() {
      const resp = await ProvinceApi.page({ page: { page: 0, size: 1000 }})
      if (resp.success) {
        this.parents = resp.rows
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
