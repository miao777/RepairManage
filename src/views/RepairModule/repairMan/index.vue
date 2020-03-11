<template>
  <div class="app-container">
    <!-- 搜索 -->
    <search-bar
      :search-form.sync="searchForm"
      @reset="handleResetSearch"
      @reloadTableData="loadData"
    />
    <!-- 表格 -->
    <Table
      :loading="table.loading"
      :table-data="table.tableData"
      @reloadTableData="loadData"
    />
    <!-- 分页 -->
    <pagination
      :page="pagination"
      :page-no.sync="pagination.pageNo"
      :limit.sync="pagination.pageSize"
      @pagination="loadData"
    />
  </div>
</template>

<script>
import SearchBar from './components//SearchBar'
import Table from './components/Table'
import Pagination from '@/components/Pagination/index'
import repairManApi from '@/api/repairMan'

export default {
  components: { SearchBar, Table, Pagination },
  data() {
    return {
      searchForm: {
        filters: [
          { field: 'user.name', op: 'EQ', value: '' },
          { field: 'user.mobileNo', op: 'EQ', value: '' },
          { field: 'user.username', op: 'EQ', value: '' },
          { field: 'idCard', op: 'EQ', value: '' }
        ],
        page: { page: 0, size: 10, sorts: [{ field: 'createDate', order: 'desc' }] }
      },
      table: { loding: false, tableData: [], businessCategory: [], businessType: [] },
      pagination: { pageNo: 1, pageSize: 10, totalCount: 0 }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    // 重置搜索
    handleResetSearch() {
      this.searchForm.filters = [
        { field: 'user.name', op: 'EQ', value: '' },
        { field: 'user.mobileNo', op: 'EQ', value: '' },
        { field: 'user.username', op: 'EQ', value: '' },
        { field: 'idCard', op: 'EQ', value: '' }
      ]
      this.searchForm.page = { page: 0, size: 10, sorts: [{ field: 'createDate', order: 'desc' }] }
      this.loadData()
    },
    // -----------------------------------------------------ajax------------------------------------
    /**
     * @description 加载table数据
     * @param pageNo 页数
     */
    async loadData(page) {
      if (page) {
        this.searchForm.page.page = page - 1
      }
      this.table.loading = true
      const resp = await repairManApi.page(this.searchForm)
      if (resp.success) {
        if (resp.totalCount > 0 && resp.rows.length === 0) {
          this.loadData(1)
        }
        this.table.tableData = resp.rows
        this.pagination.pageNo = resp.pageNo + 1
        this.pagination.pageSize = resp.pageSize
        this.pagination.totalCount = resp.totalCount
      }
      this.table.loading = false
    }
  }
}
</script>
