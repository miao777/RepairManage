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
      <!-- 图片 -->
      <el-table-column prop="image" label="图片" width="130">
        <template slot-scope="scope">
          <el-image :class="scope.row.image.fullPath ? 'table-image-size' : ''" :src="scope.row.image.fullPath" :preview-src-list="[scope.row.image.fullPath]" fit="cover">
            <div v-if="!scope.row.image.fullPath" slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />{{ $t('common.noImgLoading') }}
            </div>
          </el-image>
        </template>
      </el-table-column>

      <!-- 图片类型 -->
      <el-table-column label="图片类型" prop="type_fmt" width="150" align="center" />
      <!-- 标题 -->
      <el-table-column label="标题" prop="title" width="160" align="center" />
      <!-- 简介 -->
      <el-table-column label="简介" prop="summary" align="center" show-overflow-tooltip />
      <!-- 状态 -->
      <el-table-column label="是否启用" width="90" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#0fb336" @change="hanldeToggleStatus(scope.row)" />
        </template>
      </el-table-column>
      <!-- 排序 -->
      <el-table-column label="序号" prop="sortNo" align="center" width="90" sortable />

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
import PosterApi from '@/api/poster'
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
      const resp = await PosterApi.delete(this.selectRow.id)
      if (resp.success) {
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
    },
    // 状态切换
    async updatestatus(id) {
      const resp = await PosterApi.updatestatus(id)
      if (resp.success) {
        this.$emit('search')
      }
    },
    hanldeToggleStatus(row) {
      this.updatestatus(row.id)
    }
  }
}
</script>
