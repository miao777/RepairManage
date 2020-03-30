<template>
  <div class="app-container">
    <search-bar :form="searchForm" @search="fetchData" @reset="handleResetSearchForm" />
    <Table :loading="table.loading" :data="table.data" :multiple="table.multiple" @search="fetchData" />
    <Pagination :page="pagination" @pagination="handleChangePagination" />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar'
import Table from './components/Table'
import Pagination from '@/components/Pagination'
// import { tree } from '@/api/menu'
import menuApi from '@/api/menu'

export default {
  components: { SearchBar, Table, Pagination },
  data() {
    return {
      searchForm: {// 查询栏的数据
        filters: [
          { field: 'title', op: 'LIKE', value: '' },
          { field: 'children.title', op: 'LIKE', value: '' }
        ],
        page: { page: 0, size: 10, sorts: [{ field: 'sortNo', order: 'asc' }] } // 请求分页栏和排序的数据
      },
      table: { loading: false, data: [], multiple: false, multipleSelection: [] }, // 表格的数据
      pagination: { pageNo: 1, pageSize: 10, totalCount: 0 } // 这个是返回结果的时候的分页数据
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() { // 后台分页请求的数据
      this.table.loading = true
      const resp = await menuApi.tree(this.searchForm)
      if (resp.success) {
        // 需要把父节点的id赋值到子节点上使用
        this.table.data = resp.rows.map(row => {
          if (row.children && row.children.length > 0) {
            row.children.forEach(child => {
              child.parentId = row.id
              child.level = 2
            })
          }
          row.level = 1
          return row
        })
        this.pagination.pageNo = resp.pageNo + 1
        this.pagination.pageSize = resp.pageSize
        this.pagination.totalCount = resp.totalCount
      }
      this.table.loading = false
    },
    handleResetSearchForm() { // 查询条件重置
      this.searchForm.filters = [
        { field: 'name', op: 'LIKE', value: '' },
        { field: 'children.title', op: 'EQ', value: '' }
      ]
      this.fetchData()
    },
    handleChangePagination() { // 分页的时候需要赋值请求参数
      this.searchForm.page.page = this.pagination.pageNo - 1
      this.searchForm.page.size = this.pagination.pageSize
      this.fetchData()
    }
  }
}
</script>
