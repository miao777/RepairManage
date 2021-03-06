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
      <el-table-column prop="image" label="图片">
        <template slot-scope="scope">
          <el-image :class="scope.row.icon ? 'table-image-size' : ''" :src="scope.row.icon" :preview-src-list="[scope.row.icon]" fit="cover">
            <div v-if="!scope.row.icon" slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />{{ $t('common.noImgLoading') }}
            </div>
          </el-image>
        </template>
      </el-table-column>
      <!-- 维修类型 -->
      <el-table-column label="维修类型" prop="name" />
      <!-- 用户类型 -->
      <el-table-column label="用户类型" prop="type_fmt" />
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
import CategoryApi from '@/api/category'
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
      const resp = await CategoryApi.delete(this.selectRow.id)
      if (resp.success) {
        this.$emit('search')
      }
    },
    // 状态切换
    async change(row) {
      const res = await CategoryApi.toggle(row.id)
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
