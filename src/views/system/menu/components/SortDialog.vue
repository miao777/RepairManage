<template>
  <el-dialog :title="title" :visible.sync="isShow" width="300px" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-tree
      :data="data"
      node-key="id"
      :empty-text="$t('common.empty')"
      :render-after-expand="false"
      :props="{label: 'title'}"
      :default-expand-all="false"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      @node-drop="handleDrop"
    />
    <span slot="footer" class="dialog-footer">
      <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.close') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { tree, sort } from '@/api/menu'
import { isEmpty } from '@/utils'
import { Message } from 'element-ui'
export default {
  props: {
    title: {
      type: String,
      default: '排序'
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: [],
      filters: { page: { size: 1000, sorts: [{ field: 'sortNo', order: 'asc' }] }},
      form: {
        id: '',
        parentId: '',
        sortNo: '',
        oldSortNo: '',
        oldParentId: ''
      }
    }
  },
  created() {

  },
  methods: {
    async loadTreeMenu() {
      const resp = await tree(this.filters)
      if (resp.success) {
        this.data = resp.rows.map(row => {
          if (!isEmpty(row.children)) {
            row.children.forEach(child => {
              child.parentId = row.id
            })
          }
          return row
        })
      }
    },
    async saveMenuSort() {
      const resp = await sort(this.form)
      if (resp.success) {
        this.loadTreeMenu()
      }
    },
    handleOpen() {
      this.loadTreeMenu()
    },
    handleClose(done) {
      this.data = []
      this.$emit('close')
    },
    handleSubmit() {
      this.saveMenuSort()
      this.handleClose()
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      if (dropNode.parent && dropType === 'inner') {
        Message.info('当前只支持2级菜单，默认会归为2级菜单')
      }
      this.form.id = draggingNode.data.id
      this.form.parentId = dropNode.data.parentId
      this.form.sortNo = dropNode.data.sortNo
      this.form.oldSortNo = draggingNode.data.sortNo
      this.form.oldParentId = draggingNode.data.parentId
      this.saveMenuSort()
    },
    allowDrop(draggingNode, dropNode, type) {
      return true
    },
    allowDrag(draggingNode) {
      return true
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
