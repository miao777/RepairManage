<template>
  <div class="app-container">
    <search-bar :form="searchForm" @search="fetchData" @reset="reset" />
    <Table :loading="table.loading" :data="table.data" :multiple="table.multiple" @search="fetchData" />
    <Pagination :page="pagination" @pagination="handleChangePagination" />
  </div>
</template>

<script>
import FeedbackApi from '@/api/feedback.js'
import SearchBar from './components/SearchBar'
import Table from './components/Table'
import Pagination from '@/components/Pagination'
export default {
  components: { SearchBar, Pagination, Table },
  data() {
    return {
      searchForm: {
        filters: [
          { field: 'title.title', op: 'LIKE', value: '' },
          { field: 'title.level', op: 'EQ', value: '' },
          { field: 'name', op: 'LIKE', value: '' },
          { field: 'mobileNo', op: 'LIKE', value: '' },
          { field: 'status', op: 'EQ', value: '' }
        ],
        page: {
          page: 0,
          size: 10
        }
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
      FeedbackApi.feedbackpage({ ...this.searchForm }).then(res => {
        if (res.success) {
          res.rows.map(item => {
            item.status = !item.status
            if (item.images.length !== 0) {
              const arr = []
              item.images.map(k => {
                arr.push(k.fullPath)
              })
              item.icon = arr[0]
              item.iconarr = arr
            }
          })
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
        { field: 'title.title', op: 'LIKE', value: '' },
        { field: 'title.level', op: 'EQ', value: '' },
        { field: 'name', op: 'LIKE', value: '' },
        { field: 'mobileNo', op: 'LIKE', value: '' },
        { field: 'status', op: 'EQ', value: '' }
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
