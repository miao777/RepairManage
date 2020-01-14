<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" :rules="rules" class="demo-form-inline">
      <el-form-item :label="$t('role.name')" prop="filters[0].value">
        <el-input v-model="form.filters[0].value" :placeholder="$t('role.name')" />
      </el-form-item>
      <el-form-item :label="$t('role.type')">
        <el-select v-model="form.filters[1].value" :placeholder="$t('role.type')">
          <el-option v-for="item in types" :key="item.name" :label="item.value" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('role.key')">
        <el-select v-model="form.filters[2].value" :placeholder="$t('role.key')">
          <el-option v-for="item in keys" :key="item.name" :label="item.value" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('common.search') }}</el-button>
        <el-button type="default" icon="el-icon-refresh" @click="handleReset">{{ $t('common.reset') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-plus" @click="handleAddDialogOpen">{{ $t('common.add') }}</el-button>
        <!-- <el-button type="danger" icon="el-icon-folder-remove" @click="handleBatchDelete">{{ $t('common.batch.delete') }}</el-button> -->
      </el-form-item>
    </el-form>
    <add-dialog ref="AddDialog" :is-show="isAddShow" :is-add="true" @close="handleAddDialogClose" />
  </div>
</template>

<script>
import AddDialog from './EditDialog'
import { getRoleKeys, getRoleTypes } from '@/api/role'

export default {
  name: 'RoleSearchBar',
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
      types: [],
      keys: [],
      rules: {
        'filters[0].value': [
          { max: 255, message: '长度不能超过255个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadRoleTypes()
    this.loadRoleKeys()
  },
  methods: {
    async loadRoleTypes() {
      const resp = await getRoleTypes()
      if (resp.success) {
        this.types = resp.rows
        this.types.splice(0, 0, { filed: '', value: '全部' })
      }
    },
    async loadRoleKeys() {
      const resp = await getRoleKeys()
      if (resp.success) {
        this.keys = resp.rows
        this.keys.splice(0, 0, { filed: '', value: '全部' })
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
    }
    // handleBatchDelete() {
    //   this.$emit('batch-delete')
    // }
  }
}
</script>
