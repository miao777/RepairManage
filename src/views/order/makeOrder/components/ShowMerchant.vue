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
        <el-form-item label="维修项目">
          <div style="width:150px;">
            <el-input v-model="searchForm.filters[1].value" :placeholder="$t('common.please.enter')+'维修项目'" size="small" clearable />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">{{ $t('common.search') }}</el-button>
          <el-button size="small" icon="el-icon-refresh" @click="handleReset">{{ $t('common.reset') }}</el-button>
          <el-button v-if="shopType==='BOOKING'" type="success" icon="el-icon-plus" @click="handleAddDialogOpens">{{ $t("common.add")+'服务项目' }}</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="merchantLoading"
        :data="merchantData"
        :element-loading-text="$t('common.loading')"
        border
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column align="center" type="index" width="30" class-name="table-detail" />
        <!-- 图像 -->
        <el-table-column label="图片" min-width="60px">
          <template slot-scope="scope">
            <!-- <el-image :class="scope.row.images[0].fullPath ? 'table-image-size' : ''" :src="scope.row.images[0].fullPath" :preview-src-list="scope.row.imagesList" fit="cover">
              <div v-if="!scope.row.images[0].fullPath" slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />{{ $t('common.notLoading') }}
              </div>
            </el-image> -->
            <el-image :class="scope.row.headerUrl ? 'table-image-size' : ''" :src="scope.row.headerUrl" :preview-src-list="scope.row.imagesList" fit="cover">
              <div v-if="!scope.row.headerUrl" slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />{{ $t('common.noImgLoading') }}
              </div>
            </el-image>
          </template>
        </el-table-column>
        <!-- 维修项目 -->
        <el-table-column prop="item.name" label="维修项目" align="center" />
        <!-- 预估价格 -->
        <el-table-column prop="item.price" label="预估价格" align="center" />
        <!-- 维修预计时间 -->
        <el-table-column prop="item.repairMinute" label="维修预计时间（分）" align="center" />
        <!-- 所属维修分类 -->
        <el-table-column prop="category.name" label="所属维修分类" align="center" />
        <!-- 所属维修小类 -->
        <!-- <el-table-column prop="subclass.name" label="所属维修小类" align="center" /> -->
        <!-- 评估价格 -->
        <el-table-column prop="price_fmt" label="评估价格" align="center" />

        <!-- 操作 -->
        <el-table-column label="操作" align="center" width="130">
          <template v-if="scope.row.booking.status==='BOOKING'" slot-scope="scope">
            <el-tooltip :content="$t('common.edit')" placement="top">
              <el-button type="primary" icon="el-icon-edit" circle @click="handleEditDialogOpen(scope.row)" />
            </el-tooltip>
            <el-tooltip v-if="scope.row.booking.status==='BOOKING'" :content="$t('common.delete')" placement="top">
              <el-button type="danger" icon="el-icon-delete" circle @click="handleDetele(scope.row)" />
            </el-tooltip>
          </template>
        </el-table-column>

      </el-table>
      <el-row type="flex" justify="end" style="margin-top:20px;">
        <Pagination :page="pagination" @pagination="handleChangePagination" />
      </el-row>
    </el-drawer>
    <!-- 修改 -->
    <UserEditDialog ref="EditDialog" :is-show="isEditShow" :enterprise-id="enterpriseId" :title="titles" :is-add="false" :data="selectRow" @close="handleEditDialogClose" />
    <!-- 新增 -->
    <UserEditDialog ref="EditDialog" :is-show="isEditShowType" :enterprise-id="enterpriseId" :title="titles" :is-add="true" :data="selectRow" @close="handleEditDialogCloses" />
  </div>
</template>

<script>

import UserEditDialog from './userEditDialog'
import BookingApi from '@/api/booking'
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
        return '维修预约项目列表'
      }
    },
    shopId: {
      type: String,
      default: ''
    },
    shopType: {
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
      enterpriseId: '', // 预定订单id
      merchantData: [], // 数据
      searchForm: {
        filters: [
          { field: 'booking.id', op: 'EQ', value: '' },
          { field: 'item.name', op: 'EQ', value: '' }
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
  },
  methods: {
    // 打开事件
    handleOpen() {
      this.enterpriseId = this.shopId
      this.searchForm.filters[0].value = this.shopId
      this.loadMerchantData()
    },
    // 关闭事件
    handleClose() {
      this.pagination.totalCount = 0
      this.searchForm.filters[1].value = ''
      this.$emit('close')
    },
    handleSearch() {
      this.loadMerchantData(1)
    },
    // 重置
    handleReset() {
      this.searchForm.filters = [
        { field: 'booking.id', op: 'EQ', value: this.shopId },
        { field: 'item.name', op: 'EQ', value: '' }
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
      this.isEditShowType = true
    },
    // 修改
    handleEditDialogOpen(row) {
      this.titles = '修改'
      this.selectRow = row// 改变
      this.isEditShow = true
    },
    handleEditDialogClose() {
      this.isEditShow = false
      this.loadMerchantData()
    },
    handleEditDialogCloses() {
      this.isEditShowType = false
      this.loadMerchantData()
    },
    // 删除
    async delete() {
      const resp = await BookingApi.removeProduct(this.selectRow.id)
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
      const resp = await BookingApi.searvicePage(this.searchForm)
      if (resp.success) {
        if (resp.totalCount > 0 && resp.rows.length === 0) {
          this.loadData(1)
        }

        resp.rows.map(item => {
          const arr = []
          if (item.images.length !== 0) {
            item.images.map(k => {
              if (k !== null) {
                arr.push(k.fullPath)
              } else {
                arr.push('https://img.cdjingchu.net/unfound.jpg')
              }
            })
            item.headerUrl = arr[0]
          } else {
            item.headerUrl = ''
          }
          item.imagesList = arr
        })
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
