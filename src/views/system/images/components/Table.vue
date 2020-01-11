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

      <!-- 图片 -->
      <el-table-column label="图片" prop="localPath">
        <template slot-scope="scope">
          <el-image :class="scope.row.localPath ? 'table-image-size' : ''" :src="scope.row.localPath" :preview-src-list="scope.row.localPaths" fit="cover">
            <div v-if="!scope.row.localPath" slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />{{ $t('common.notLoading') }}
            </div>
          </el-image>
        </template>
      </el-table-column>
      <!-- 图片名称 -->
      <el-table-column label="图片名称" prop="originalName" min-width="150" show-overflow-tooltip />
      <!-- 上传人 -->
      <el-table-column label="上传人" prop="user.name" />
      <!-- 上传时间-- -->
      <el-table-column label="上传时间" prop="createDate_fmt" sortable />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip :content="$t('common.delete')" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDetele(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import { imagesRemove } from '@/api/role'

export default {
  name: 'UserTable',
  components: { },
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
    async delete() {
      const resp = await imagesRemove(this.selectRow.id)
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
    hanldeToggleStatus(row) {
      this.selectRow = row
      this.toggleStatus()
    },
    handleresetPwd(row) {
      this.selectRow = row
      MessageBox.confirm(this.$t('user.resetPwdInfo'), this.$t('user.resetPwd'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.resetPwd()
      }).catch(() => {})
    },
    handleShowBlacklist(row) {
      this.selectRow = row
      this.showBlacklist()
    }
  }
}
</script>
