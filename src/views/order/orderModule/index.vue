<template>
  <div class="app-container">
    <!-- 订单管理 -->
    <search-bar :form="searchForm" @reset="handleResetSearchForm" @search="fetchData" />
    <Table :loading="table.loading" :data="table.data" :multiple="table.multiple" @search="fetchData" @selection-change="handleSelectRows" />
    <Pagination :page="pagination" @pagination="handleChangePagination" />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar'
import Table from './components/Table'
import Pagination from '@/components/Pagination'
import { orderPage } from '@/api/order'
export default {
  components: { SearchBar, Table, Pagination },
  data() {
    return {
      searchForm: {
        filters: [
          { field: 'orderNo', op: 'EQ', value: '' },
          { field: 'addressee.name', op: 'LIKE', value: '' },
          { field: 'addressee.waybillNo', op: 'LIKE', value: '' },
          { field: 'addressee.phone', op: 'LIKE', value: '' },
          { field: 'orderStatus', op: 'EQ', value: '' }
        ],
        page: { page: 0, size: 10 }
      },
      table: { loading: false, data: [], multiple: false, multipleSelection: [] }, // 表格的数据
      pagination: { pageNo: 1, pageSize: 10, totalCount: 0 } // 这个是返回结果的时候的分页数据
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData(page) { // 后台分页请求的数据
      if (page) {
        this.searchForm.page.page = page - 1
      }
      this.table.loading = true
      const resp = await orderPage(this.searchForm)
      if (resp.success) {
        if (resp.totalCount > 0 && resp.rows.length === 0) {
          this.fetchData(1)
        }
        const preRows = resp.rows
        if (preRows && preRows.length > 0) {
          preRows.map(r => {
            if (r.productInfos) {
              r.productInfosJson = JSON.parse(r.productInfos)
              r.productInfosJson.map(item => {
                item.productJson = JSON.parse(item.product)
              })
            }
          })
        }
        this.table.data = preRows
        this.pagination.pageNo = resp.pageNo + 1
        this.pagination.pageSize = resp.pageSize
        this.pagination.totalCount = resp.totalCount
      }
      this.table.loading = false
    },
    // 分页
    handleChangePagination() { // 分页的时候需要赋值请求参数
      this.searchForm.page.page = this.pagination.pageNo - 1
      this.searchForm.page.size = this.pagination.pageSize
      this.fetchData()
    },
    // 重置
    handleResetSearchForm() { // 查询条件重置
      this.searchForm.filters = [
        { field: 'orderNo', op: 'EQ', value: '' },
        { field: 'addressee.name', op: 'LIKE', value: '' },
        { field: 'addressee.waybillNo', op: 'LIKE', value: '' },
        { field: 'addressee.phone', op: 'LIKE', value: '' },
        { field: 'orderStatus', op: 'EQ', value: '' }
      ]
      this.searchForm.page = { page: 0, size: 10 }
      this.fetchData()
    },
    handleSelectRows(rows) {
      console.log(rows)
      this.table.multipleSelection = rows
    }

  }

}
</script>
