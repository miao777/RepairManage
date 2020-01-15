<template>
  <div>
    <!-- 搜索栏 -->
    <el-form id="label-M" :inline="true" class="demo-form-inline ">
      <el-form-item label="姓名">
        <div style="width:200px;">
          <el-input v-model="searchForm.filters[0].value" placeholder="姓名" size="small" clearable />
        </div>
      </el-form-item>
      <el-form-item label="电话">
        <div style="width:200px;">
          <el-input v-model="searchForm.filters[1].value" placeholder="电话" size="small" clearable />
        </div>
      </el-form-item>
      <el-form-item label="账号">
        <div style="width:200px;">
          <el-input v-model="searchForm.filters[2].value" placeholder="账号" size="small" clearable />
        </div>
      </el-form-item>
      <el-form-item label="身份证">
        <div style="width:200px;">
          <el-input v-model="searchForm.filters[3].value" placeholder="身份证" size="small" clearable />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">{{ $t('common.search') }}</el-button>
        <el-button size="small" icon="el-icon-refresh" @click="handleReset">{{ $t('common.reset') }}</el-button>
        <el-button type="success" size="small" icon="el-icon-plus" @click="handleAdd">{{ $t('common.add') }}</el-button>
      </el-form-item>
    </el-form>

    <!-- 新增店员 -->
    <addDialog
      :show.sync="isAddShow"
      :is-add="true"
      @reloadTableData="handleReloadTableData"
    />

  </div>
</template>

<script>
import addDialog from './EditDialog'

export default {
  name: 'SearchBar',
  components: { addDialog },
  props: {
    searchForm: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      isAddShow: false
    }
  },
  computed: {},
  methods: {
    // 搜索事件，并调用父组件的方法
    handleSearch() {
      this.$emit('reloadTableData', 1)
    },
    // 重置事件，并调用父组件方法
    handleReset() {
      this.$emit('reset')
    },
    // 新增事件
    handleAdd() {
      this.isAddShow = true
    },
    // 将子组件重新加载table数据的方法传递到父组件
    handleReloadTableData() {
      this.isAddShow = false
      this.$emit('reloadTableData')
      // 513221199110231123
    }
  }
}
</script>
