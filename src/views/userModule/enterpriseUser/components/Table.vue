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
      <el-table-column v-if="multiple" type="selection" width="35" />
      <el-table-column align="center" type="index" width="35" class-name="table-detail" />
      <!-- 下拉框 -->
      <el-table-column type="expand" width="35" class-name="table-detail">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-detail-expand">
            <el-form-item label="企业名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="员工人数">
              <span>{{ props.row.staffCount }}</span>
            </el-form-item>
            <el-form-item label="联系人">
              <span>{{ props.row.contactPerson }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.contractPhone }}</span>
            </el-form-item>
            <el-form-item label="企业地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="企业名称" prop="name" />
      <el-table-column label="联系人" prop="contactPerson" width="120" />
      <el-table-column label="联系电话" prop="contractPhone" width="120" />
      <el-table-column label="员工人数" prop="staffCount" width="80" align="center" />
      <el-table-column label="企业地址" prop="address" />
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <!-- 新增登陆用户 -->
          <el-tooltip content="新增用户" placement="top">
            <el-button type="success" icon="el-icon-s-custom" circle @click="handleBindServiceMerchantBtn(scope.row)" />
          </el-tooltip>
          <!-- <el-tooltip content="地址" placement="top">
            <el-button type="warning" icon="el-icon-s-promotion" circle @click="handleBindServiceMerchantBtnss(scope.row)" />
          </el-tooltip> -->
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
    <!-- 企业登陆用户 -->
    <show-merchant :show.sync="enterpriserighttable.visible" :shop-id="enterpriserighttable.id" @handleBindClose="handleBindClose" />
    <!-- 用户地位 -->
    <!-- <MapShowMerchant :show.sync="map.visible" :shop-id="enterpriserighttable.id" @handleBindClose="handleBindClosess" /> -->
  </div>
</template>

<script>
import EditDialog from './EditDialog'
import ShowMerchant from './ShowMerchant'
// import MapShowMerchant from './mapShowMerchant'
import EnterpriseApi from '@/api/enterprise'
import { MessageBox } from 'element-ui'
export default {
  components: { EditDialog, ShowMerchant },
  // components: { EditDialog, ShowMerchant, MapShowMerchant },
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
      enterpriserighttable: { visible: false, id: '' }
      // map: { visible: false, addr: '' }
    }
  },
  computed: {
    height() {
      return window.innerHeight - 170
    }
  },
  methods: {
    // 删除企业用户
    async delete() {
      const resp = await EnterpriseApi.delete(this.selectRow.id)
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
        this.delete()
      }).catch(() => {})
    },
    handleEditDialogClose() {
      this.isEditShow = false
      this.$emit('search')
    },
    handleBindServiceMerchantBtn(row) {
      this.enterpriserighttable.id = row.id
      this.enterpriserighttable.visible = true
    },
    handleBindClose() {
      this.enterpriserighttable.visible = false
    }
    // handleBindServiceMerchantBtnss(row) {
    //   console.log(row, 'sizhi')
    //   this.map.visible = true
    // }
    // handleBindClosess() {
    //   this.map.visible = false
    // }
  }
}
</script>
