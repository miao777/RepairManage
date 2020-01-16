<template>
  <div>
    <!-- 用户地址管理 -->
    <el-drawer
      :title="title"
      :visible.sync="drawerVisible"
      direction="rtl"
      size="80%"
      @open="handleOpen"
      @close="handleClose"
    >
      <div>
        <el-form :inline="true" class="demo-form-inline" style="margin-left:10px">
          <el-form-item label="位置1">
            <div style="width:150px;">
              <el-input v-model="searchForm.filters[0].value" :placeholder="$t('common.please.enter')+'名字'" size="small" clearable />
            </div>
          </el-form-item>
          <el-form-item label="位置2">
            <div style="width:150px;">
              <el-input v-model="searchForm.filters[1].value" :placeholder="$t('common.please.enter')+'账号'" size="small" clearable />
            </div>
          </el-form-item>
          <el-form-item label="位置3">
            <div style="width:150px;">
              <el-input v-model="searchForm.filters[2].value" :placeholder="$t('common.please.enter')+'电话'" size="small" clearable />
            </div>
          </el-form-item>
          <!-- <el-form-item label="状态">
            <el-select v-model="searchForm.filters[3].value" placeholder="请选择状态">
              <el-option v-for="item in statuses" :key="item.label" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="searchForm.filters[4].value" placeholder="请选择角色">
              <el-option v-for="item in enterpriseststuss" :key="item.id" :label="item.name" :value="item.key" />
            </el-select> -->
          <!-- </el-form-item> -->
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">{{ $t('common.search') }}</el-button>
            <el-button size="small" icon="el-icon-refresh" @click="handleReset">{{ $t('common.reset') }}</el-button>
            <el-button type="success" icon="el-icon-plus" @click="handleAddDialogOpens">{{ $t("common.add") }}</el-button>
          </el-form-item>
        </el-form>
        <el-table
          ref="table"
          v-loading="table.loading"
          :data="table.data"
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
          <el-table-column type="index" label="序号" align="center" width="40px" />
          <el-table-column label="地址">
            <template slot-scope="scope">
              <div>{{ scope.row.province.name }}{{ scope.row.city.name }}{{ scope.row.district.name }}{{ scope.row.address }}</div>
            </template>
          </el-table-column>
          <el-table-column label="联系人" prop="contactMan" />
          <el-table-column label="联系电话" prop="mobileNo" />
          <!-- <el-table-column label="启停" prop="status">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                :active-value="true"
                @change="change(scope.row)"
              />
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
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
        <Pagination :page="pagination" @pagination="handleChangePagination" />
      </div>
    </el-drawer>
    <!-- 编辑 -->
    <EditDialogmap ref="EditDialog" :is-show="mapisEditShow" :title="$t('common.edit')" :is-add="false" :data="selectRow" @close="handleEditDialogClose" />
    <!-- 新增 -->
    <EditDialogmap ref="EditDialog" :is-show="isEditShow" :title="titlesmap" :is-add="true" :data="selectRow" @close="handleEditDialogCloseadd" />
  </div>
</template>

<script>

// import { MessageBox } from 'element-ui'
import AddressApi from '@/api/address'

// import SearchBar from './mapSearchBar'
import EditDialogmap from './mapEditDialog'
import Pagination from '@/components/Pagination'
export default {
  name: 'ShowMerchant',
  components: { EditDialogmap, Pagination },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default() {
        return '用户地址管理'
      }
    },
    shopId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      enterpriseId: '',
      titlesmap: '新增',
      mapisEditShow: false,
      isEditShow: false,
      selectRow: {},
      searchForm: {
        filters: [
          { field: 'name', op: 'EQ', value: '' },
          { field: 'code', op: 'EQ', value: '' },
          { field: 'status', op: 'EQ', value: '' }
        ],
        page: { page: 0, size: 10 }
      },
      table: { loading: false, data: [], multiple: false, multipleSelection: [] }, // 表格的数据
      pagination: { pageNo: 1, pageSize: 10, totalCount: 0 }
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
    },
    height() {
      return window.innerHeight - 170
    }
  },
  watch: {
    show: function(val) {
      if (val) {
        this.fetchData()
      }
    }
  },
  created() {
  },

  methods: {
    // 打开事件
    handleOpen() {
      this.enterpriseId = this.shopId
    },
    // 关闭事件
    handleClose() {
      this.pagination.totalCount = 0
      this.$emit('close')
    },

    // =======================
    // 初始化数据
    fetchData(page) {
      if (page) {
        this.searchForm.page.page = page - 1
      }
      this.table.loading = true
      AddressApi.page({ ...this.searchForm }).then(res => {
        if (res.success) {
          this.table.data = res.rows
          this.pagination.pageNo = res.pageNo + 1
          this.pagination.pageSize = res.pageSize
          this.pagination.totalCount = res.totalCount
        }
        this.table.loading = false
      })
    },
    // 搜索
    handleSearch() {
      this.fetchData(1)
    },
    // 重置
    handleReset() {
      this.searchForm.filters = [
        { field: 'name', op: 'EQ', value: '' },
        { field: 'code', op: 'EQ', value: '' },
        { field: 'status', op: 'EQ', value: '' }
      ]
      this.searchForm.page = { page: 0, size: 10 }
      this.fetchData()
    },
    // 分页
    handleChangePagination() {
      this.searchForm.page.page = this.pagination.pageNo - 1
      this.searchForm.page.size = this.pagination.pageSize
      this.fetchData()
    },
    // 打开新增表
    handleAddDialogOpens() {
      this.titlesmap = '新增'
      this.isEditShow = true
    },
    // 关闭edit弹窗
    handleEditDialogClose() {
      this.mapisEditShow = false
      this.fetchData(1)
      // this.$emit('search')
    },
    // 关闭新增框
    handleEditDialogCloseadd() {
      this.isEditShow = false
      this.fetchData(1)
      // this.$emit('search')
    },
    // 删除按钮
    handleDeteleMenu(row) {
      this.selectRow = row
      AddressApi.delete(row.id).then(
        res => {
          if (res.success) {
            this.fetchData(1)
          }
        }
      )
    },
    // table编辑按钮
    handleEditDialogOpen(row) {
      this.selectRow = row
      this.mapisEditShow = true
    }
  }
}
</script>
