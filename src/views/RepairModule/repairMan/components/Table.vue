<template>
  <div>
    <!-- 店员table数据 -->
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
      <!-- 下拉框 -->
      <el-table-column type="expand" width="35" class-name="table-detail">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-detail-expand">
            <!-- 头像 -->
            <el-form-item label="头像">
              <div v-if="props.row.user.headerUrl">
                <a :key="props.row.user.headerUrl" :href="props.row.user.headerUrl" target="_blank" style="margin-left:20px;"><img :src="props.row.user.headerUrl" width="80px" height="80px"></a>
              </div>
              <div v-else>
                <span><i class="el-icon-picture-outline" />{{ $t('common.noImgLoading') }}</span>
              </div>
            </el-form-item>
            <el-form-item label="姓名">
              <span>{{ props.row.user.name }}</span>
            </el-form-item>
            <el-form-item label="账户名">
              <span>{{ props.row.user.username }}</span>
            </el-form-item>
            <el-form-item label="电话">
              <span>{{ props.row.user.mobileNo }}</span>
            </el-form-item>
            <el-form-item label="昵称">
              <span>{{ props.row.user.nickname }}</span>
            </el-form-item>
            <el-form-item label="身份证">
              <span>{{ props.row.idCard }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.user.email }}</span>
            </el-form-item>
            <el-form-item label="角色">
              <span>{{ props.row.user.role.key_fmt }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span v-if="props.row.user.sex">男</span>
              <span v-else>女</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.user.createDate_fmt }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 头像 -->
      <el-table-column prop="image" label="头像" width="80px" align="center">
        <template slot-scope="scope">
          <el-image :class="scope.row.user.headerUrl ? 'table-image-size' : ''" :src="scope.row.user.headerUrl" :preview-src-list="scope.row.previewImage" fit="cover">
            <div v-if="!scope.row.user.headerUrl" slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />{{ $t('common.noImgLoading') }}
            </div>
          </el-image>
        </template>
      </el-table-column>
      <!-- 账户 -->
      <el-table-column prop="user.username" label="账户名" />
      <!-- 姓名 -->
      <el-table-column prop="user.name" label="姓名" />
      <!-- 电话 -->
      <el-table-column prop="user.mobileNo" label="电话" />
      <!-- 昵称 -->
      <el-table-column prop="user.nickname" label="昵称" />
      <!-- 身份证 -->
      <el-table-column prop="idCard" label="身份证" />
      <!-- 邮箱 -->
      <el-table-column prop="user.email" label="邮箱" />
      <!-- 角色 -->
      <el-table-column prop="user.role.key_fmt" label="角色" align="center" width="80" />
      <!-- 性别 -->
      <el-table-column prop="user.sex" label="性别" width="50" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.user.sex">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>
      <!-- 创建时间 -->
      <el-table-column prop="user.createDate_fmt" label="创建时间" align="center" sortable />

      <el-table-column fixed="right" :label="$t('common.oper')" width="100px" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="$t('common.edit')" placement="top-start">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="handleUpdateBtn(scope.row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('common.delete')" placement="top-start">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDeleteBtn(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑店员dialog -->
    <edit-dialog
      :show.sync="dialogVisible"
      :dialog-title="dialogTitle"
      :data="dialogData"
      :is-add="false"
      @reloadTableData="handleReloadTableData"
    />
  </div>
</template>

<script>

import EditDialog from './EditDialog'
import { MessageBox } from 'element-ui'
import repairManApi from '@/api/repairMan'
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
    },
    roleData: {
      type: Array,
      default: () => []
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
      return window.innerHeight - 170
    }
  },
  created() {
  },
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
        this.remove(row.id)
      }).catch(() => {})
    },
    // 点击一行事件
    handleRowClick(row, event, column) {
      this.selectedRow = row
      this.$refs.tableRef.toggleRowSelection(row)
    },
    // 将子组件重新加载table数据的方法传递到父组件
    handleReloadTableData() {
      this.dialogVisible = false
      this.$emit('reloadTableData')
    },
    // 删除
    async remove(id) {
      const resp = await repairManApi.delete(id)
      if (resp.success) {
        this.$emit('reloadTableData', 1)
      }
    }
  }
}
</script>
