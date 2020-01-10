<template>
  <div>
    <el-form id="label-M" :inline="true" class="demo-form-inline ">
      <el-form-item :label="$t('shop.shopNo')">
        <div style="width:150px;">
          <el-input v-model="searchForm.filters[0].value" :placeholder="$t('common.please.enter') + $t('shop.shopNo')" size="small" clearable />
        </div>
      </el-form-item>
      <el-form-item :label="$t('shop.contactPhone')">
        <div style="width:150px;">
          <el-input v-model="searchForm.filters[1].value" :placeholder="$t('common.please.enter') + $t('shop.contactPhone')" size="small" clearable />
        </div>
      </el-form-item>
      <el-form-item :label="$t('shop.isForeignTrade')">
        <div style="width:140px;">
          <el-select v-model="searchForm.filters[4].value" :placeholder="$t('shop.isForeignTrade')" size="small" filterable clearable>
            <el-option :label="$t('shop.foreignTradeTrue')" value="true" />
            <el-option :label="$t('shop.foreignTradeFalse')" value="false" />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">{{ $t('common.search') }}</el-button>
        <el-button size="small" icon="el-icon-refresh" @click="handleReset">{{ $t('common.reset') }}</el-button>
        <el-button type="success" size="small" icon="el-icon-plus" @click="handleAdd">{{ $t('common.add') }}</el-button>
        <el-button type="danger" size="small" icon="el-icon-folder-remove" @click="handleBatchDelete">{{ $t('common.batch.delete') }}</el-button>
      </el-form-item>
    </el-form>

    <!-- 新增dialog -->
    <addDialog
      :show.sync="dialogVisible"
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
      dialogVisible: false
    }
  },
  computed: {},
  methods: {
    // 搜索事件，并调用父组件的方法
    handleSearch() {
      this.$emit('search', this.searchForm)
    },

    // 重置事件，并调用父组件方法
    handleReset() {
      this.$emit('reset')
    },

    // 新增事件
    handleAdd() {
      this.dialogVisible = true
    },

    // 将子组件重新加载table数据的方法传递到父组件
    handleReloadTableData() {
      this.$emit('reloadTableData')
    },

    // 批量删除
    handleBatchDelete() {
      // this.$emit('batchDelete')
    }
  }
}
</script>
