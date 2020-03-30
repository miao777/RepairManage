<template>
  <div>
    <el-table
      ref="table"
      v-loading="loading"
      :data="data"
      :tree-props="{ children: 'children', hasChildren: 'children.length > 0' }"
      :element-loading-text="$t('common.loading')"
      :empty-text="$t('common.empty')"
      row-key="id"
      border
      stripe
      fit
      highlight-current-row
      :max-height="height"
    >
      <el-table-column type="index" label="#" align="center" width="40px" />
      <!-- 维修小类（名称） -->
      <el-table-column label="维修小类（名称）" prop="name" />
      <!-- 状态 -->
      <el-table-column label="显示状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isShow">显示</span>
          <span v-else>不显示</span>
        </template>
      </el-table-column>
      <!-- 启停 -->
      <el-table-column label="显示启停" prop="isShow" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isShow" :active-value="true" active-color="#13ce66" @change="change(scope.row)" />
        </template>
      </el-table-column>
      <!-- 排序 -->
      <el-table-column label="序号" prop="sortNo" align="center" />
      <!-- 维修分类（关联） -->
      <el-table-column label="维修分类（关联）" prop="category.name" />
      <!-- 用户类型（关联） -->
      <el-table-column label="用户类型（关联）" prop="category.type_fmt" />
      <!-- 操作 -->
      <el-table-column label="操作" width="200" align="center">
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
import SubclassApi from '@/api/subclass'
import { MessageBox } from 'element-ui'
export default {
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
    // 删除
    async deleteMenu() {
      const resp = await SubclassApi.delete(this.selectRow.id)
      if (resp.success) {
        this.$emit('search')
      }
    },
    // 状态切换
    async change(row) {
      const res = await SubclassApi.toggle(row.id)
      if (res.success) {
        this.$emit('search')
      }
    },
    handleEditDialogOpen(row) {
      this.selectRow = row
      this.isEditShow = true
    },
    handleDeteleMenu(row) {
      this.selectRow = row
      MessageBox.confirm(this.$t('common.alert.delete'), this.$t('common.confirm'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.deleteMenu()
      }).catch(() => {})
    },
    handleEditDialogClose() {
      this.isEditShow = false
      this.$emit('search')
    }
  }
}
</script>
