<template>
  <div class="orders">
    <!-- table数据 -->
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="tableData"
      :max-height="height"
      :empty-text="$t('common.empty')"
      :element-loading-text="$t('common.loading')"
      highlight-current-row
      border
      stripe
      fit
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      @row-click="handleRowClick"
    >
      <el-table-column v-if="multiple" type="selection" width="35" />
      <el-table-column align="center" type="index" width="35" class-name="table-detail" />
      <el-table-column type="expand" width="35" class-name="table-detail">
        <template slot-scope="props">
          <el-form label-position="right" inline class="table-detail-expand">
            <el-form-item :label="$t('repairReport.images') +'：'" class="repairImagesClass">
              <div v-if="props.row.images && props.row.images.length > 0">
                <a v-for="img in props.row.images" :key="img" :href="img" target="_blank" style="margin-left:20px;"><img :src="img" width="80px" height="80px"></a>
              </div>
              <div v-else>
                <span>{{ $t('repairReport.noimages') }}</span>
              </div>
            </el-form-item>
            <!-- 申报人名称 -->
            <el-form-item :label="$t('repairReport.repairname') +'：'">
              <span>{{ props.row.author.name }}</span>
            </el-form-item>
            <!-- 申报人电话 -->
            <el-form-item :label="$t('repairReport.repairTel') +'：'">
              <span>{{ props.row.author.mobileNo }}</span>
            </el-form-item>
            <!-- 报修店铺号 -->
            <el-form-item :label="$t('repairReport.repairshopnumber') +'：'">
              <span>{{ props.row.shopNo }}</span>
            </el-form-item>
            <!-- 报修类型 -->
            <el-form-item :label="$t('repairReport.repirType') +'：'">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <!-- 报修区域 -->
            <el-form-item :label="$t('repairReport.repairRegin') +'：'">
              <span>{{ props.row.part }}</span>
            </el-form-item>
            <!-- 保修状态 -->
            <el-form-item :label="$t('repairReport.repairStatus') +'：'">
              <span>{{ props.row.status_fmt }}</span>
            </el-form-item>
            <!-- 创建时间 -->
            <el-form-item :label="$t('repairReport.repairSetUpTime') +'：'">
              <span>{{ props.row.createDate_fmt }}</span>
            </el-form-item>
            <!-- 期望维修开始时间 -->
            <el-form-item :label="$t('repairReport.ecpectStartTime') +'：'">
              <span>{{ props.row.expectBeginTime_fmt }}</span>
            </el-form-item>
            <!-- 期望维修结束时间 -->
            <el-form-item :label="$t('repairReport.expectEndTime') +'：'">
              <span>{{ props.row.expectEndTime_fmt }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 申报人 -->
      <el-table-column prop="author.name" :label="$t('repairReport.name')" show-overflow-tooltip min-width="100px" />
      <!-- 申报人电话 -->
      <el-table-column prop="author.mobileNo" :label="$t('repairReport.mobileNo')" show-overflow-tooltip min-width="120px" />
      <!-- 店铺号 -->
      <el-table-column prop="shopNo" :label="$t('repairReport.shopNo')" show-overflow-tooltip min-width="100px" />
      <!-- 报修区域 -->
      <el-table-column prop="part" :label="$t('repairReport.part')" show-overflow-tooltip min-width="80px" align="center" />
      <!-- 报修状态 -->
      <el-table-column prop="status_fmt" :label="$t('repairReport.status')" show-overflow-tooltip min-width="80px" align="center" />
      <!-- 创建时间 -->
      <el-table-column prop="createDate_fmt" :label="$t('repairReport.createDate')" show-overflow-tooltip min-width="160px" sortable />
    </el-table>

    <!-- 编辑dialog -->
    <edit-dialog
      :show.sync="dialogVisible"
      :dialog-title="dialogTitle"
      :data="dialogData"
      @dialogClose="handleDialogClose"
      @reloadTableData="handleReloadTableData"
    />
  </div>
</template>

<script>

import EditDialog from './EditDialog'
import { deleteShop } from '@/api/shop'
import { MessageBox } from 'element-ui'
import('@/styles/upload.scss')

export default {
  name: 'Table',
  components: { EditDialog },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => { return [] }
    }
  },
  data() {
    return {
      selectedRow: {},
      dialogVisible: false,
      dialogData: {},
      dialogTitle: ''
    }
  },
  computed: {
    height() {
      return window.innerHeight - 220 - 430
    }
  },
  created() {},
  methods: {
    // 编辑按钮事件
    handleUpdateBtn(row) {
      this.dialogVisible = true
      this.dialogTitle = this.$t('common.edit')
      this.dialogData = Object.assign({}, row)
    },

    // 删除事件
    handleDeleteBtn(row) {
      MessageBox.confirm(this.$t('common.alert.delete'), this.$t('common.confirm'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.deleteMethod(row.id)
      }).catch(() => {})
    },

    // 点击一行事件
    handleRowClick(row, event, column) {
      this.selectedRow = row
      this.$refs.tableRef.toggleRowSelection(row)
    },

    // 将子组件重新加载table数据的方法传递到父组件
    handleReloadTableData() {
      this.$emit('reloadTableData')
    },

    // 子组件的关闭回调
    handleDialogClose() {
      this.dialogData = {}
    },

    // 切换分类
    handleEditStatusChange(val, row) {
      if (val) {
        // this.restartMethod(row)
      } else {
        // this.stopMethod(row)
      }
    },

    // ----------------------------------------ajax----------------------------------------------
    /**
     * @description 删除
     * @param id 对象id
     */
    async deleteMethod(id) {
      const resp = await deleteShop(id)
      if (resp.success) {
        this.$emit('reloadTableData', 1)
      }
    }
  }
}
</script>
