<template>
  <div class="app-container">
    <search-bar :form="searchForm" @search="fetchData" @reset="reset" />
    <Table :loading="table.loading" :data="table.data" :multiple="table.multiple" @search="fetchData" />
    <!-- <Table :data="[]" /> -->
    <Pagination :page="pagination" @pagination="handleChangePagination" />
  </div>
</template>

<script>
import FamilyApi from '@/api/family'
import SearchBar from './components/SearchBar'
import Table from './components/Table'
import Pagination from '@/components/Pagination'
export default {
  components: { SearchBar, Pagination, Table },
  data() {
    return {
      searchForm: {
        filters: [
          { field: 'user.name', op: 'EQ', value: '' },
          { field: 'user.username', op: 'EQ', value: '' },
          { field: 'user.mobileNo', op: 'EQ', value: '' },
          { field: 'user.status', op: 'EQ', value: '' }
          // { field: 'user.role.key', op: 'EQ', value: '' }
        ],
        page: { page: 0, size: 10, sorts: [{ field: 'createDate', order: 'desc' }] }
      },
      table: { loading: false, data: [], multiple: false, multipleSelection: [] }, // 表格的数据
      pagination: { pageNo: 1, pageSize: 10, totalCount: 0 }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    //   初始化数据（TableData）
    fetchData() {
      this.table.loading = true
      FamilyApi.page({ ...this.searchForm }).then(res => {
        if (res.success) {
          this.table.data = res.rows
          this.pagination.pageNo = res.pageNo + 1
          this.pagination.pageSize = res.pageSize
          this.pagination.totalCount = res.totalCount
        }
        this.table.loading = false
      })
    },
    reset() {
      this.searchForm.filters = [
        { field: 'user.name', op: 'EQ', value: '' },
        { field: 'user.username', op: 'EQ', value: '' },
        { field: 'user.mobileNo', op: 'EQ', value: '' },
        { field: 'user.status', op: 'EQ', value: '' }
      ]
      this.searchForm.page = { page: 0, size: 10 }
      this.fetchData()
    },
    handleChangePagination() {
      this.searchForm.page.page = this.pagination.pageNo - 1
      this.searchForm.page.size = this.pagination.pageSize
      this.fetchData()
    }
  }
}
</script>
