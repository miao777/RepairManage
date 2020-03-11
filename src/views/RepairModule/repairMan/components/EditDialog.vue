<template>
  <div>
    <!-- 店员dialog -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      top="5vh"
      width="55%"
      @open="handleOpen"
      @close="handleDialogClose('dialogFormRef')"
    >
      <el-form ref="dialogFormRef" :model="dialogForm" :rules="rules" label-position="right" label-width="180px">
        <!-- 头像 -->
        <el-form-item id="uploadImageId3" label="头像">
          <Uploader ref="uploader" :image="dialogForm.user.headerUrl" @on-success="handleImageSuccess" @before-upload="handleBeforeUpload" />
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" prop="user.nickname">
          <el-input v-model="dialogForm.user.nickname" placeholder="请输入昵称" clearable />
        </el-form-item>
        <!-- 手机号码 -->
        <el-form-item label="手机号码" prop="user.mobileNo">
          <el-input v-model="dialogForm.user.mobileNo" placeholder="请输入手机号码" clearable maxlength="11" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item v-if="isAdd" label="密码" prop="user.password">
          <el-input v-model="dialogForm.user.password" placeholder="请输入密码" clearable />
        </el-form-item>
        <!-- 姓名 -->
        <el-form-item label="姓名" prop="user.name">
          <el-input v-model="dialogForm.user.name" placeholder="请输入姓名" clearable />
        </el-form-item>
        <!-- 身份证 -->
        <el-form-item label="身份证" prop="idCard">
          <el-input v-model="dialogForm.idCard" placeholder="请输入省份证号码" clearable />
        </el-form-item>
        <!-- 性别 -->
        <el-form-item label="性别" prop="user.sex">
          <el-radio v-model="dialogForm.user.sex" :label="true">男</el-radio>
          <el-radio v-model="dialogForm.user.sex" :label="false">女</el-radio>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="user.email">
          <el-input v-model="dialogForm.user.email" placeholder="请输入邮箱" clearable />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="dialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <!-- <el-button type="primary" icon="el-icon-check" :disabled="dialogBtnDisabled" @click="handleAddOrUpdate('dialogFormRef')">{{ $t('common.confirm') }}</el-button> -->
        <el-button type="primary" icon="el-icon-check" @click="handleAddOrUpdate('dialogFormRef')">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

// import { add, edit } from '@/api/merchant/clerk'
import Uploader from '@/components/Uploader'
import { assignExistField } from '@/utils'
import { Message } from 'element-ui'
import { page } from '@/api/role'
import { checkMobile, checkMailBox, checkIdNum } from '@/tools/date.js'
import repairManApi from '@/api/repairMan'

export default {
  name: 'EditDialog',
  components: { Uploader },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t('common.add')
      }
    },
    isShow: {
      type: Boolean,
      default: true
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => { return {} }
    },
    roleData: {
      type: Array,
      default: () => { return [] }
    }
  },
  data() {
    return {
      repairsearchForm: {
        page: { page: 0, size: 100 }
      },
      // dialogBtnDisabled: false,
      owner: { visible: false },
      selectedOwner: {},
      operatorTag: true, // true表示新增操作，false表示编辑操作
      dialogForm: {
        id: '',
        idCard: '', // 11
        user: {
          email: '', // 11
          headerUrl: '', //
          id: '',
          mobileNo: '', // 11
          name: '', // 11
          nickname: '', // 11
          password: '', // 111
          roleId: '', // 11
          sex: false // 11
        }
      },

      // 校验
      rules: {
        idCard: [{ required: true, validator: checkIdNum, trigger: 'blur' }],
        'user.email': [{ required: true, validator: checkMailBox, trigger: 'blur' }],
        'user.mobileNo': [{ required: true, validator: checkMobile, trigger: 'blur' }],
        // 'user.username': [{ required: true, message: '请输入账号', trigger: 'blur' }],
        'user.name': [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        'user.password': [{ required: true, message: '请输入密码', trigger: 'blur' }],
        'user.nickname': [{ required: true, message: '请输入昵称', trigger: 'blur' }]
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  created() {
    this.loadRoleData()
  },
  methods: {
    // 获取维修师傅id
    async loadRoleData() {
      const resp = await page(this.repairsearchForm)
      if (resp.success) {
        const num = resp.rows.filter(item => item.key === 'REPAIR_MAN')
        this.dialogForm.user.roleId = num[0].id
      }
    },
    // 打开时候处理数据
    handleOpen() {
      if (!this.$props.isAdd) {
        this.operatorTag = false
        assignExistField(this.$props.data, this.dialogForm)
        delete this.dialogForm.user.createDate
        delete this.dialogForm.user.createDate_fmt
        delete this.dialogForm.user.lastLoginTime
        delete this.dialogForm.user.lastLoginTime_fmt
        delete this.dialogForm.user.password
        delete this.dialogForm.user.status
        delete this.dialogForm.user.status_fmt
        this.dialogForm.user.roleId = JSON.parse(JSON.stringify(this.dialogForm.user.role.id))
        delete this.dialogForm.user.role
        console.log(this.dialogForm, '1212121212121')
      }
      this.$nextTick(() => {
        this.$refs.uploader.loadImage()
      })
    },
    // 处理上传成功之后的图片
    handleImageSuccess(data) {
      if (data && data.success) {
        this.dialogForm.user.headerUrl = data.data.fullPath
      }
    },

    handleBeforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        Message.error(this.$t('common.upload.size'))
      }
      return isLt10M
    },

    // 关闭
    handleDialogClose(formName) {
      // this.$refs[formName].resetFields()
      this.$refs.dialogFormRef.resetFields()
      this.$refs.dialogFormRef.clearValidate()
      this.$emit('reloadTableData')
    },

    // 新增or编辑事件
    handleAddOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$props.isAdd ? this.add() : this.edit()
        }
      })
    },
    // --------------------------------------------ajxa-------------------------------------
    /**
     * @description 编辑
     * @param params 对象
     */
    async edit(params) {
      const resp = await repairManApi.edit(this.dialogForm)
      // this.dialogBtnDisabled = false
      if (resp.success) {
        // this.dialogVisible = false
        this.$emit('reloadTableData')
      }
    },

    /**
     * @description 新增
     * @param params 对象
     */
    async add() {
      delete this.dialogForm.id
      delete this.dialogForm.user.id
      const resp = await repairManApi.add(this.dialogForm)
      if (resp.success) {
        this.$emit('reloadTableData')
      }
    }

  }
}
</script>
