<template>
  <el-dialog :title="title+$t('common.Jurisdiction')" :visible.sync="isShow" width="300px" :before-close="handleCloses" :close-on-click-modal="false" @open="handleOpen">
    <el-tree
      ref="tree"
      :data="data"
      show-checkbox
      node-key="id"
      highlight-current
      :props="{label: 'title'}"
    />
    <span slot="footer" class="dialog-footer">
      <el-button type="default" icon="el-icon-check" @click="handleClose">{{ $t('common.confirm') }}</el-button>
    </span>

  </el-dialog>
</template>

<script>
import menuApi from '@/api/menu'
import { isEmpty } from '@/utils'
export default {
  props: {
    title: {
      type: String,
      default: () => {}
    },
    isShow: {
      type: Boolean,
      default: false
    },
    list: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      data: [],
      filters: { page: { size: 1000, sorts: [{ field: 'sortNo', order: 'asc' }] }},
      deleteId: []
    }
  },
  created() {

  },
  methods: {
    // 树形列表
    async loadTreeMenu() {
      const resp = await menuApi.tree(this.filters)
      if (resp.success) {
        this.data = resp.rows.map(row => {
          this.deleteId.push(row.id)
          if (!isEmpty(row.children)) {
            row.children.forEach(child => {
              child.parentId = row.id
            })
          }
          return row
        })
        this.permissionList()
      }
    },
    // 角色权限列表
    async permissionList() {
      const res = await menuApi.permissionList(this.list.id)
      if (res.success) {
        // console.log(res.rows, '角色权限列表')
        const arr = []
        res.rows.map(item => {
          if (!~this.deleteId.indexOf(item.id)) {
            arr.push(item)
          }
        })
        this.$refs.tree.setCheckedNodes(arr)
      }
    },
    // 绑定角色
    async rolrList(data) {
      const resp = await menuApi.rolrList(this.list.id, data)
      if (resp.success) {
        // console.log(resp, '绑定角色')
        this.data = []
        this.$emit('close')
      }
    },
    handleOpen() {
      this.loadTreeMenu()
    },
    // 点击确认
    handleClose(done) {
      const data = this.$refs.tree.getCheckedNodes()
      const arr = []
      data.map(item => {
        const obj = {}
        if (item.parentId) {
          obj.id = item.id
          obj.parentId = item.parentId
        } else {
          obj.id = item.id
        }
        arr.push(obj)
      })
      this.rolrList(arr)
    },
    handleSubmit() {
      this.saveMenuSort()
      this.handleClose()
    },
    handleCloses() {
      this.data = []
      this.$emit('close')
    }
  }
}
</script>
<style>
.icon-in-table {
  font-size:18px;
  color:#F56C6C;
  margin-right: 5px;
}
</style>
