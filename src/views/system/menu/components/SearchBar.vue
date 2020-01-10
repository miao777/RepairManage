<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" :rules="rules" class="demo-form-inline">
      <el-form-item :label="$t('menu.title1')" prop="filters[0].value">
        <el-input v-model="form.filters[0].value" :placeholder="$t('menu.title1')" />
      </el-form-item>
      <el-form-item :label="$t('menu.title2')" prop="filters[1].value">
        <el-input v-model="form.filters[1].value" :placeholder="$t('menu.title2')" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('common.search') }}</el-button>
        <el-button type="default" icon="el-icon-refresh" @click="handleReset">{{ $t('common.reset') }}</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleAddDialogOpen">{{ $t('common.add') }}</el-button>
        <el-button type="info" icon="el-icon-sort" @click="handleSortDialogOpen">{{ $t('common.sort') }}</el-button>
      </el-form-item>
    </el-form>
    <add-dialog ref="AddDialog" :is-show="isAddShow" :is-add="true" @close="handleAddDialogClose" />
    <sort-dialog ref="SortDialog" :is-show="isSortShow" @close="handleSortDialogClose" />
  </div>
</template>

<script>
import AddDialog from './EditDialog'
import SortDialog from './SortDialog'

export default {
  name: 'MenuSearchBar',
  components: { AddDialog, SortDialog },
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isAddShow: false,
      isSortShow: false,
      types: [],
      keys: [],
      rules: {
        'filters[0].value': [
          { max: 255, message: '长度不能超过255个字符', trigger: 'blur' }
        ],
        'filters[1].value': [
          { max: 255, message: '长度不能超过255个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
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
    handleSortDialogOpen() {
      this.isSortShow = true
    },
    handleSortDialogClose() {
      this.isSortShow = false
      this.$emit('search')
    }
  }
}
</script>
