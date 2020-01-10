<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" :rules="rules" class="demo-form-inline">
      <el-form-item :label="$t('user.username')" prop="filters[0].value">
        <el-input v-model="form.filters[0].value" :placeholder="$t('user.username')" />
      </el-form-item>
      <el-form-item :label="$t('user.name')" prop="filters[1].value">
        <el-input v-model="form.filters[1].value" :placeholder="$t('user.username')" />
      </el-form-item>
      <el-form-item :label="$t('user.mobileNo')" prop="filters[2].value">
        <el-input v-model="form.filters[2].value" :placeholder="$t('user.mobileNo')" />
      </el-form-item>
      <el-form-item :label="$t('user.status')" prop="filters[3].value">
        <el-select v-model="form.filters[3].value" :placeholder="$t('user.status')">
          <el-option v-for="item in statuses" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('role.key')" prop="filters[4].value">
        <el-select v-model="form.filters[4].value" :placeholder="$t('role.key')">
          <el-option v-for="item in keys" :key="item.name" :label="item.value" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('common.search') }}</el-button>
        <el-button type="default" icon="el-icon-refresh" @click="handleReset">{{ $t('common.reset') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-plus" @click="handleAddDialogOpen">{{ $t('common.add') }}</el-button>
      </el-form-item>
    </el-form>
    <add-dialog ref="AddDialog" :is-show="isAddShow" :is-add="true" @close="handleAddDialogClose" />
  </div>
</template>

<script>
import AddDialog from './EditDialog'
import { getRoleKeys } from '@/api/role'

export default {
  name: 'UserSearchBar',
  components: { AddDialog },
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isAddShow: false,
      statuses: this.$t('user.statuses'),
      keys: [],
      rules: {
        'filters[0].value': [
          { max: 255, message: '长度不能超过255个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadRoleKeys()
  },
  methods: {
    async loadRoleKeys() {
      const resp = await getRoleKeys()
      if (resp.success) {
        this.keys = resp.rows
        this.keys.splice(0, 0, { filed: '', value: this.$t('common.all') })
      }
    },
    handleSearch() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('search')
        }
      })
    },
    handleReset() {
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
      this.$emit('reset')
    },
    handleAddDialogOpen() {
      this.isAddShow = true
    },
    handleAddDialogClose() {
      this.isAddShow = false
      this.$emit('search')
    },
    handleBatchDelete() {
      this.$emit('batch-delete')
    }
  }
}
</script>
