<template>
  <div>
    <el-table
      v-loading="loading"
      :data="data"
      :element-loading-text="$t('common.loading')"
      :empty-text="$t('common.empty')"
      border
      stripe
      fit
      :max-height="height"
      highlight-current-row
      @sort-change="handleSort"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="multiple" type="selection" width="35" />
      <el-table-column align="center" type="index" width="35" class-name="table-detail" />
      <el-table-column :label="$t('role.type')" prop="type_fmt" sortable />
      <el-table-column :label="$t('role.key')" prop="key_fmt" sortable />
      <el-table-column :label="$t('role.name')" prop="name" sortable />
      <el-table-column :label="$t('role.url')" prop="url" />
      <el-table-column :label="$t('common.description')" prop="description" />
      <el-table-column>
        <template slot-scope="scope">
          <el-tooltip :content="$t('common.edit')" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleEditDialogOpen(scope.row)" />
          </el-tooltip>
          <el-tooltip :content="$t('common.delete')" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDetele(scope.row)" />
          </el-tooltip>
          <el-tooltip :content="$t('common.Jurisdiction')" placement="top">
            <el-button type="success" icon="el-icon-setting" circle @click="Jurisdiction(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <edit-dialog ref="EditDialog" :is-show="isEditShow" :title="$t('common.edit')" :is-add="false" :data="selectRow" @close="handleEditDialogClose" />
    <sort-dialog ref="SortDialog" :is-show="isSortShow" :title="content.name" :list="content" @close="handleSortDialogClose" />
  </div>
</template>

<script>
import EditDialog from './EditDialog'
import SortDialog from './SortDialog'
import { MessageBox } from 'element-ui'
import { remove } from '@/api/role'

export default {
  name: 'RoleTable',
  components: { EditDialog, SortDialog },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    multiple: {
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
      selectRow: {},
      isSortShow: false, // 权限状态
      content: {} // 权限传递数据
    }
  },
  computed: {
    height() {
      return window.innerHeight - 170
    }
  },
  methods: {
    async delete() {
      const resp = await remove(this.selectRow.id)
      if (resp.success) {
        this.$emit('search')
      }
    },
    handleSort({ column, prop, order }) {
      let sort = {}
      if (order) {
        sort = { field: prop.replace('_fmt', ''), order: 'asc' }
        if (order === 'descending') {
          sort.order = 'desc'
        }
      }
      this.$emit('sort', sort)
    },
    handleEditDialogOpen(row) {
      this.selectRow = row
      this.isEditShow = true
    },
    handleDetele(row) {
      this.selectRow = row
      MessageBox.confirm(this.$t('common.alert.delete'), this.$t('common.please.confirm'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.delete()
      }).catch(() => {})
    },
    handleEditDialogClose() {
      this.isEditShow = false
      this.$emit('search')
    },
    handleSelectionChange(rows) {
      this.$emit('selection-change', rows)
    },
    Jurisdiction(row) {
      this.isSortShow = true
      this.content = row
    },
    handleSortDialogClose() {
      this.isSortShow = false
      this.$emit('search')
    }
  }
}
</script>
