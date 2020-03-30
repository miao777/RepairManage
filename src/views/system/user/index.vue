<template>
  <div class="app-container">
    <search-bar :form="searchForm" @search="fetchData" @reset="handleResetSearchForm" @batch-delete="handleBatchDelete" />
    <Table :loading="table.loading" :data="table.data" :multiple="table.multiple" @search="fetchData" @sort="handleSort" @selection-change="handleSelectRows" />
    <Pagination :page="pagination" @pagination="handleChangePagination" />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar'
import Table from './components/Table'
import Pagination from '@/components/Pagination'
import { page, batchRemove } from '@/api/user'
import { MessageBox, Message } from 'element-ui'

export default {
  components: { SearchBar, Table, Pagination },
  data() {
    return {
      searchForm: {// 查询栏的数据
        filters: [
          { field: 'username', op: 'LIKE', value: '' },
          { field: 'name', op: 'LIKE', value: '' },
          { field: 'mobileNo', op: 'LIKE', value: '' },
          { field: 'status', op: 'EQ', value: '' },
          { field: 'role.key', op: 'EQ', value: '' }
        ],
        page: { page: 0, size: 10, sorts: [{ field: 'createDate', order: 'asc' }] } // 请求分页栏和排序的数据
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
      const resp = await page(this.searchForm)
      if (resp.success) {
        this.table.data = resp.rows.map(row => {
          row.headerUrls = [row.headerUrl]
          return row
        })
        this.pagination.pageNo = resp.pageNo + 1
        this.pagination.pageSize = resp.pageSize
        this.pagination.totalCount = resp.totalCount
      }
      this.table.loading = false
    },
    async deleteRoles() {
      const ids = this.table.multipleSelection.map(item => item.id)
      const resp = await batchRemove(ids)
      if (resp.success) {
        this.fetchData()
        this.table.multiple = false
      }
    },
    handleResetSearchForm() { // 查询条件重置
      this.searchForm.filters = [
        { field: 'username', op: 'LIKE', value: '' },
        { field: 'name', op: 'LIKE', value: '' },
        { field: 'mobileNo', op: 'LIKE', value: '' },
        { field: 'status', op: 'EQ', value: '' },
        { field: 'role.key', op: 'EQ', value: '' }
      ]
      this.fetchData()
    },
    handleChangePagination() { // 分页的时候需要赋值请求参数
      this.searchForm.page.page = this.pagination.pageNo - 1
      this.searchForm.page.size = this.pagination.pageSize
      this.fetchData()
    },
    handleSort(sort) { // 通过sort-change事件，进行后台排序，如果不写，就是前台数据排序
      this.searchForm.page.sorts = []
      if (Object.keys(sort).length > 0) {
        this.searchForm.page.sorts.push(sort)
      }
      this.fetchData()
    },
    handleBatchDelete() {
      if (!this.table.multiple) {
        this.table.multiple = true
      } else {
        if (this.table.multipleSelection.length > 0) {
          MessageBox.confirm(this.$t('common.alert.batchDeletePre') + this.table.multipleSelection.length + this.$t('common.alert.batchDeleteSuf'), this.$t('common.please.confirm'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            type: 'warning'
          }).then(() => {
            this.deleteRoles()
          }).catch(() => {})
        } else {
          Message.error(this.$t('common.alert.notDeleteRow'))
        }
      }
    },
    handleSelectRows(rows) {
      this.table.multipleSelection = rows
    }
  }
}
</script>
