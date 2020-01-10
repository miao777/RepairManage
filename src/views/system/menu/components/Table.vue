<template>
  <div>
    <el-table
      ref="table"
      v-loading="loading"
      :data="data"
      :tree-props="{children: 'children', hasChildren: 'children.length > 0'}"
      :element-loading-text="$t('common.loading')"
      :empty-text="$t('common.empty')"
      row-key="id"
      border
      stripe
      fit
      highlight-current-row
      :max-height="height"
    >
      <el-table-column :label="$t('menu.title')" prop="title">
        <template slot-scope="scope">
          <span class="menu-title" @click="handleChangeExpansion(scope.row)">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('menu.sortNo')" prop="sortNo" width="100" align="center" />
      <el-table-column :label="$t('menu.icon')" prop="icon">
        <template slot-scope="scope">
          <i :class="scope.row.icon + ' icon-in-table'" />{{ scope.row.icon }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('menu.href')" prop="href" />
      <el-table-column>
        <template slot-scope="scope">
          <el-tooltip :content="$t('common.edit')" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleEditDialogOpen(scope.row)" />
          </el-tooltip>
          <el-tooltip :content="$t('common.delete')" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDeteleMenu(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <edit-dialog ref="EditDialog" :is-show="isEditShow" :title="$t('common.edit')" :is-add="false" :data="selectRow" @close="handleEditDialogClose" />
  </div>
</template>

<script>
import EditDialog from './EditDialog'
import { MessageBox } from 'element-ui'
import { remove } from '@/api/menu'
import { isEmpty } from '@/utils'

export default {
  name: 'MenuTable',
  components: { EditDialog },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isEditShow: false,
      selectRow: {}
    }
  },
  computed: {
    height() {
      return window.innerHeight - 170
    }
  },
  methods: {
    async deleteMenu() {
      const resp = await remove(this.selectRow.parentId ? this.selectRow.parentId : null, this.selectRow.id)
      if (resp.success) {
        this.$emit('search')
      }
    },
    handleChangeExpansion(row) {
      if (!isEmpty(row.children)) {
        row.expansion = !row.expansion
        this.$refs.table.toggleRowExpansion(row, row.expansion)
      }
    },
    handleEditDialogOpen(row) {
      this.selectRow = row
      this.isEditShow = true
    },
    handleDeteleMenu(row) {
      this.selectRow = row
      if (this.selectRow.level === 1 && !isEmpty(this.selectRow.children)) {
        MessageBox.confirm(this.$t('menu.deleteLevel1Menu'), this.$t('common.please.confirm'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.deleteMenu()
        }).catch(() => {})
      } else {
        MessageBox.confirm(this.$t('common.alert.delete'), this.$t('common.confirm'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.deleteMenu()
        }).catch(() => {})
      }
    },
    handleEditDialogClose() {
      this.isEditShow = false
      this.$emit('search')
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
.menu-title {
  cursor: pointer;
}
</style>

