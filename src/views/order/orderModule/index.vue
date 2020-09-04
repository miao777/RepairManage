<template>
  <div class="app-container">
    <!-- 订单管理 -->
    <search-bar :form="searchForm" @reset="handleResetSearchForm" @search="fetchData" @service="addServiceVisible = true" />
    <Table :loading="table.loading" :data="table.data" :multiple="table.multiple" @search="fetchData" @selection-change="handleSelectRows" />
    <Pagination :page="pagination" @pagination="handleChangePagination" />
    <el-dialog title="新增服务" :visible.sync="addServiceVisible" />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar'
import Table from './components/Table'
import Pagination from '@/components/Pagination'
import OrderApi from '@/api/order'
export default {
  components: { SearchBar, Table, Pagination },
  data() {
    return {
      searchForm: {
        filters: [
          { field: 'orderNo', op: 'EQ', value: '' },
          { field: 'orderStatus', op: 'EQ', value: '' },
          { field: 'customerType', op: 'EQ', value: '' },
          { field: 'booking.enterprise.name', op: 'LIKE', value: '' },
          { field: 'createDate_fmt', op: 'EQ', value: '' }
        ],
        page: { page: 0, size: 10, sorts: [{ field: 'applyTime', 'order': 'desc' }] }
      },
      table: { loading: false, data: [], multiple: false, multipleSelection: [] }, // 表格的数据
      pagination: { pageNo: 1, pageSize: 10, totalCount: 0 }, // 这个是返回结果的时候的分页数据
      addServiceVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData(page) {
      // 后台分页请求的数据
      if (page) {
        this.searchForm.page.page = page - 1
      }
      const data = JSON.parse(JSON.stringify(this.searchForm))
      if (data.filters[4].value.length > 0) {
        data.filters.push({ field: 'createDate', op: 'GTE', value: data.filters[4].value[0] + ' 00:00:00' })
        data.filters.push({ field: 'createDate', op: 'LTE', value: data.filters[4].value[1] + ' 23:59:59' })
        data.filters.splice(4, 1)
      }
      this.table.loading = true
      const resp = await OrderApi.page(data)
      if (resp.success) {
        if (resp.totalCount > 0 && resp.rows.length === 0) {
          this.fetchData(1)
        }
        this.table.data = resp.rows
        this.pagination.pageNo = resp.pageNo + 1
        this.pagination.pageSize = resp.pageSize
        this.pagination.totalCount = resp.totalCount
      }
      this.table.loading = false
    },
    // 分页
    handleChangePagination() {
      // 分页的时候需要赋值请求参数
      this.searchForm.page.page = this.pagination.pageNo - 1
      this.searchForm.page.size = this.pagination.pageSize
      this.fetchData()
    },
    // 重置
    handleResetSearchForm() {
      // 查询条件重置
      this.searchForm.filters = [
        { field: 'orderNo', op: 'EQ', value: '' },
        { field: 'orderStatus', op: 'EQ', value: '' },
        { field: 'customerType', op: 'EQ', value: '' },
        { field: 'booking.enterprise.name', op: 'LIKE', value: '' },
        { field: 'createDate_fmt', op: 'EQ', value: '' }
      ]
      this.searchForm.page = { page: 0, size: 10, sorts: [{ field: 'applyTime', 'order': 'desc' }] }
      this.fetchData()
    },
    handleSelectRows(rows) {
      this.table.multipleSelection = rows
    }
  }
}
</script>

