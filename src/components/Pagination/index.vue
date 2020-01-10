<template>
  <el-pagination
    background
    :current-page="page.pageNo"
    :page-size="page.pageSize"
    :page-sizes="sizes"
    :layout="layout"
    :total="page.totalCount"
    :hide-on-single-page="hideOnSinglePage"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />

</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Object,
      default() {
        return {
          pageNo: 1,
          pageSize: 10,
          totalCount: 0
        }
      }
    },
    sizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100, 200]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleSizeChange(val) {
      this.$props.page.pageSize = val
      this.$emit('pagination')
    },
    handleCurrentChange(val) {
      this.$props.page.pageNo = val
      this.$emit('pagination')
    }
  }
}
</script>

<style>

</style>
