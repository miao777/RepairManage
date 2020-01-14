<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-form
      ref="form"
      :model="form"
      status-icon
      :rules="rules"
      label-width="100px"
    >
      <el-form-item :label="$t('role.name')" prop="name">
        <el-input v-model="form.name" type="text" :placeholder="$t('common.please.enter') + $t('role.name')" />
      </el-form-item>
      <el-form-item :label="$t('role.type')" prop="type">
        <el-select v-model="form.type" :placeholder="$t('common.please.select') + $t('role.type')">
          <el-option v-for="item in types" :key="item.name" :label="item.value" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('role.key')" prop="key">
        <el-select v-model="form.key" :placeholder="$t('common.please.select') + $t('role.key')">
          <el-option v-for="item in keys" :key="item.name" :label="item.value" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('role.url')" prop="url">
        <el-input v-model="form.url" type="text" :placeholder="$t('common.please.enter') + $t('role.url')" />
      </el-form-item>
      <el-form-item :label="$t('common.description')" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="3" :placeholder="$t('common.please.enter') + $t('common.description')" />
      </el-form-item>
      <el-form-item class="form-footer" style="margin: 0">
        <el-button type="primary" icon="el-icon-check" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
        <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getRoleKeys, getRoleTypes, add, edit } from '@/api/role'
export default {
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
      types: [],
      keys: [],
      form: {
        id: '',
        name: '',
        type: '',
        key: '',
        url: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入角色名', trigger: 'blur,change' }],
        type: [{ required: true, message: '请选择角色类型', trigger: 'blur,change' }],
        key: [{ required: true, message: '请选择角色键值', trigger: 'blur,change' }]
      }
    }
  },
  created() {
  },
  methods: {
    async loadRoleTypes() {
      const resp = await getRoleTypes()
      if (resp.success) {
        this.types = resp.rows
      }
    },
    async loadRoleKeys() {
      const resp = await getRoleKeys()
      if (resp.success) {
        this.keys = resp.rows
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
      console.log(this.form)
      const resp = await edit(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    handleOpen() {
      this.loadRoleTypes()
      this.loadRoleKeys()
      if (!this.$props.isAdd) {
        this.form = this.$props.data
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
    }
  }
}
</script>
