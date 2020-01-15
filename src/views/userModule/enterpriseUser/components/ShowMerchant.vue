<template>
  <div>
    <!-- 企业登陆用户列表 -->
    <el-drawer
      :title="title"
      :visible.sync="drawerVisible"
      direction="rtl"
      size="80%"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-form :inline="true" class="demo-form-inline" style="margin-left:10px">
        <el-form-item label="姓名">
          <div style="width:150px;">
            <el-input v-model="searchForm.filters[0].value" :placeholder="$t('common.please.enter')+'名字'" size="small" clearable />
          </div>
        </el-form-item>
        <el-form-item label="账号">
          <div style="width:150px;">
            <el-input v-model="searchForm.filters[1].value" :placeholder="$t('common.please.enter')+'账号'" size="small" clearable />
          </div>
        </el-form-item>
        <el-form-item label="电话">
          <div style="width:150px;">
            <el-input v-model="searchForm.filters[2].value" :placeholder="$t('common.please.enter')+'电话'" size="small" clearable />
          </div>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.filters[3].value" placeholder="请选择状态">
            <el-option v-for="item in statuses" :key="item.label" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="searchForm.filters[4].value" placeholder="请选择角色">
            <el-option v-for="item in enterpriseststuss" :key="item.id" :label="item.name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">{{ $t('common.search') }}</el-button>
          <el-button size="small" icon="el-icon-refresh" @click="handleReset">{{ $t('common.reset') }}</el-button>
          <el-button type="success" icon="el-icon-plus" @click="handleAddDialogOpens">{{ $t("common.add") }}</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="merchantLoading"
        :data="merchantData"
        :element-loading-text="$t('common.loading')"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column align="center" type="index" width="35" class-name="table-detail" />
        <!-- 头像 -->
        <el-table-column prop="headerUrl" label="头像" min-width="80px" align="center">
          <template slot-scope="scope">
            <el-image :class="scope.row.headerUrl ? 'table-image-size' : ''" :src="scope.row.headerUrl" :preview-src-list="scope.row.previewImage" fit="cover">
              <div v-if="!scope.row.headerUrl" slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />{{ $t('common.noImgLoading') }}
              </div>
            </el-image>
          </template>
        </el-table-column>
        <!-- 姓名 -->
        <el-table-column prop="name" label="姓名" min-width="110" />
        <!-- 账号 -->
        <el-table-column prop="username" label="账号" min-width="140" />
        <!-- 昵称 -->
        <el-table-column prop="nickname" label="昵称" min-width="140" />
        <!-- 性别 -->
        <el-table-column prop="nickname" label="性别" width="50" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.sex">男</span>
            <span v-else>女</span>
          </template>
        </el-table-column>
        <!-- 电话 -->
        <el-table-column prop="mobileNo" label="电话" min-width="120" align="center" />
        <!-- 邮箱 -->
        <el-table-column prop="email" label="邮箱" min-width="180" align="center" />
        <!-- 角色 -->
        <el-table-column prop="role.name" label="角色" min-width="160" align="center" />
        <!-- 状态 -->
        <el-table-column prop="status_fmt" label="状态" width="50" align="center" />
        <!-- 状态 -->
        <el-table-column label="状态切换" prop="status_fmt" width="100" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" active-color="#0fb336" @change="hanldeToggleStatus(scope.row)" />
          </template>
        </el-table-column>
        <!-- 创建时间 -->
        <el-table-column prop="createDate_fmt" label="创建时间" min-width="140" align="center" sortable />
        <!-- 操作 -->
        <el-table-column label="操作" align="center" width="130">
          <template slot-scope="scope">
            <el-tooltip :content="$t('common.edit')" placement="top">
              <el-button type="primary" icon="el-icon-edit" circle @click="handleEditDialogOpen(scope.row)" />
            </el-tooltip>
            <el-tooltip :content="$t('common.delete')" placement="top">
              <el-button type="danger" icon="el-icon-delete" circle @click="handleDetele(scope.row)" />
            </el-tooltip>
          </template>
        </el-table-column>

      </el-table>
      <el-row type="flex" justify="end" style="margin-top:20px;">
        <Pagination :page="pagination" @pagination="handleChangePagination" />
      </el-row>
    </el-drawer>
    <!-- 新增 -->
    <UserEditDialog ref="EditDialog" :is-show="isEditShow" :enterprise-id="enterpriseId" :title="titles" :is-add="false" :data="selectRow" @close="handleEditDialogClose" />
    <!-- 修改 -->
    <UserEditDialog ref="EditDialog" :is-show="isEditShowType" :enterprise-id="enterpriseId" :title="titles" :is-add="true" :data="selectRow" @close="handleEditDialogCloses" />
  </div>
</template>

<script>

import UserEditDialog from './userEditDialog'
import EnterpriseApi from '@/api/enterprise'
import { toggleStatus } from '@/api/user'
import { MessageBox } from 'element-ui'
import Pagination from '@/components/Pagination'

export default {
  name: 'ShowMerchant',
  components: { UserEditDialog, Pagination },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default() {
        return '企业登陆用户列表'
      }
    },
    shopId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isEditShow: false,
      isEditShowType: false,
      titles: '新增',
      selectRow: {},
      enterpriseId: '', // 企业id
      merchantData: [], // 数据
      searchForm: {
        filters: [
          { field: 'name', op: 'EQ', value: '' },
          { field: 'username', op: 'EQ', value: '' },
          { field: 'mobileNo', op: 'EQ', value: '' },
          { field: 'status', op: 'EQ', value: '' },
          { field: 'role.key', op: 'EQ', value: '' }
        ],
        page: { page: 0, size: 10, sorts: [{ field: 'createDate', order: 'desc' }] }
      },
      pagination: { pageNo: 1, pageSize: 10, totalCount: 0 },
      merchantLoading: false,
      statuses: [{ label: '全部', value: '' }, { label: '是', value: true }, { label: '否', value: false }],
      enterpriseststuss: []
    }
  },
  computed: {
    drawerVisible: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  created() {
    this.getroless()
  },
  methods: {
    // 获取企业角色id
    async getroless() {
      const resp = await EnterpriseApi.getroles()
      if (resp.success) {
        resp.rows.unshift({ name: '全部', key: '' })
        this.enterpriseststuss = resp.rows
      }
    },
    // 打开事件
    handleOpen() {
      this.enterpriseId = this.shopId
      this.loadMerchantData()
    },
    // 关闭事件
    handleClose() {
      this.pagination.totalCount = 0
      this.$emit('close')
    },
    handleSearch() {
      this.loadMerchantData(1)
    },
    // 重置
    handleReset() {
      this.searchForm.filters = [
        { field: 'name', op: 'EQ', value: '' },
        { field: 'username', op: 'EQ', value: '' },
        { field: 'mobileNo', op: 'EQ', value: '' },
        { field: 'status', op: 'EQ', value: '' },
        { field: 'role.key', op: 'EQ', value: '' }
      ]
      this.searchForm.page = { page: 0, size: 10 }
      this.loadMerchantData()
    },
    // 分页
    handleChangePagination() {
      this.searchForm.page.page = this.pagination.pageNo - 1
      this.searchForm.page.size = this.pagination.pageSize
      this.loadMerchantData()
    },
    // 打开新增表
    handleAddDialogOpens() {
      this.titles = '新增'
      this.isEditShow = true
    },
    // 打开新增修改表
    handleEditDialogClose() {
      this.isEditShow = false
      this.loadMerchantData()
    },
    hanldeToggleStatus(row) {
      this.selectRow = row
      this.toggleStatus()
    },
    // 切换状态
    async toggleStatus() {
      const resp = await toggleStatus(this.selectRow.id)
      if (!resp.success) {
        this.selectRow.status = !this.selectRow.status
        this.$forceUpdate()
      } else {
        this.loadMerchantData()
      }
    },
    // 修改
    handleEditDialogOpen(row) {
      this.titles = '修改'
      this.selectRow = row// 改变
      this.isEditShowType = true
    },
    handleEditDialogCloses() {
      this.isEditShowType = false
      this.loadMerchantData()
    },
    // 删除
    async delete() {
      const resp = await EnterpriseApi.deleteUser(this.enterpriseId, this.selectRow.id)
      if (resp.success) {
        this.loadMerchantData()
      }
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
    // -------------------------------------------------------ajax----------------------------------------
    /**
     * @description 加载企业登陆用户列表
     * @param page 页数
     */
    async loadMerchantData(page) {
      if (page) {
        this.searchForm.page.page = page - 1
      }
      this.merchantLoading = true
      const resp = await EnterpriseApi.pageUser(this.enterpriseId, this.searchForm)
      if (resp.success) {
        if (resp.totalCount > 0 && resp.rows.length === 0) {
          this.loadData(1)
        }
        this.merchantData = resp.rows
        this.pagination.pageNo = resp.pageNo + 1
        this.pagination.pageSize = resp.pageSize
        this.pagination.totalCount = resp.totalCount
        this.merchantLoading = false
      }
    }
  }
}
</script>
