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
      <!-- <el-table-column v-if="multiple" type="selection" width="35" /> -->
      <el-table-column type="index" width="30" label="#" align="center" />
      <!-- <el-table-column align="center" type="index" width="35" class-name="table-detail" /> -->
      <!-- 下拉框 -->

      <el-table-column prop="orderNo" label="订单号" />
      <!-- <el-table-column prop="booking.contactMan" label="客户联系人"></el-table-column> -->
      <el-table-column prop="customerType_fmt" label="客户类型" />
      <el-table-column prop="orderStatus_fmt" label="订单状态" />
      <el-table-column prop="repairMinute" label="维修时长" />
      <el-table-column prop="totalPrice_fmt" label="维修总价" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-s-custom" @click="handlePerson(scope.row)">指派维修员</el-button>
          <el-button type="success" icon="el-icon-edit" @click="handleChangePrise(scope.row)">修改价格</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改价格及备注 -->
    <!-- <edit-dialog ref="EditDialog" :is-show="changePriseVisible" :title="$t('common.edit')" :is-add="false" :data="current" @add="changePrise" @close="handleEditDialogClose" /> -->
    <show-merchant
      :show.sync="changePriseVisible"
      :shop-id="current"
      @handleBindClose="
        () => {
          changePriseVisible=false
        }
      "
    />
    <!-- 指派维修人员 -->
    <el-dialog title="指派维修人员" width="30%" :visible.sync="choosePersonVisible">
      <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px">
        <el-form-item label="维修师傅">
          <el-select v-model="table.value" filterable style="width:100%">
            <el-option v-for="(item, i) in table.data" :key="i" :value="item.user.id" :label="item.user.name" />
          </el-select>
        </el-form-item>
        <el-form-item class="form-footer" style="margin: 0">
          <el-button type="primary" icon="el-icon-check" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
          <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import EditDialog from './EditDialog'
import ShowMerchant from './ShowMerchant'
import repairManApi from '@/api/repairMan'
import orderApi from '@/api/order'
// import { MessageBox } from 'element-ui'
// import { remove, toggleStatus, resetPwd, showBlacklist } from '@/api/user'

export default {
  name: 'UserTable',
  components: { ShowMerchant },
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
      choosePersonVisible: false,
      current: {},
      changePriseVisible: false,
      rules: {},
      form: {},
      searchForms: {
        page: {
          page: 0,
          size: 1000,
          sorts: [
            {
              field: 'createDate',
              order: 'desc'
            }
          ]
        }
      },
      table: { loding: false, data: [], value: '' }
    }
  },
  computed: {
    height() {
      return window.innerHeight - 170
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    // 维修人员列表
    async loadData() {
      this.table.loading = true
      const resp = await repairManApi.page(this.searchForms)
      if (resp.success) {
        this.table.data = resp.rows
      }
      this.table.loading = false
    },
    // 指派维修人员
    async fixrepairMan() {
      const data = {
        orderId: this.current.id,
        repairManId: this.table.value
      }
      const resp = await orderApi.asSign(data)
      if (resp.success) {
        console.log(resp, 'success')
        this.choosePersonVisible = false
      }
    },
    handleSubmit() {
      // this.choosePersonVisible = false
      console.log(this.current, 'shuju ')
      console.log(this.table.value, 'id')
      this.fixrepairMan()
    },
    handleClose() {
      this.choosePersonVisible = false
    },
    changePrise(val) {},
    handlePerson(row) {
      this.current = row
      this.choosePersonVisible = true
    },
    handleChangePrise(row) {
      this.current = row.booking.id
      console.log(12, this.current)
      this.changePriseVisible = true
    },
    // async toggleStatus() {
    //   const resp = await toggleStatus(this.selectRow.id)
    //   if (!resp.success) {
    //     this.selectRow.status = !this.selectRow.status
    //     this.$forceUpdate()
    //   }
    // },
    // async resetPwd() {
    //   const resp = await resetPwd(this.selectRow.id)
    //   if (resp.success) {
    //     MessageBox.alert('密码已重置为：' + resp.data, this.$t('common.info'))
    //   }
    // },
    // async showBlacklist() {
    //   const resp = await showBlacklist(this.selectRow.id)
    //   if (resp.success) {
    //     const html = resp.rows
    //       .map(row => {
    //         return '<div>' + row.username + '   ' + row.name + '</div>'
    //       })
    //       .join('')
    //     MessageBox.alert(html, this.$t('common.detail'), {
    //       dangerouslyUseHTMLString: true,
    //       customClass: 'message-box-detail'
    //     })
    //   }
    // },
    // async delete() {
    //   const resp = await remove(this.selectRow.id)
    //   if (resp.success) {
    //     this.$emit('search')
    //   }
    // },
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
    // handleDetele(row) {
    //   this.selectRow = row
    //   MessageBox.confirm(this.$t('common.alert.delete'), this.$t('common.please.confirm'), {
    //     confirmButtonText: this.$t('common.confirm'),
    //     cancelButtonText: this.$t('common.cancel'),
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       this.delete()
    //     })
    //     .catch(() => {})
    // },
    handleEditDialogClose() {
      this.changePriseVisible = false
      this.$emit('search')
    },
    handleSelectionChange(rows) {
      this.$emit('selection-change', rows)
    }
    // hanldeToggleStatus(row) {
    //   this.selectRow = row
    //   this.toggleStatus()
    // },
    // handleresetPwd(row) {
    //   this.selectRow = row
    //   MessageBox.confirm(this.$t('user.resetPwdInfo'), this.$t('user.resetPwd'), {
    //     confirmButtonText: this.$t('common.confirm'),
    //     cancelButtonText: this.$t('common.cancel'),
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       this.resetPwd()
    //     })
    //     .catch(() => {})
    // },
    // handleShowBlacklist(row) {
    //   this.selectRow = row
    //   this.showBlacklist()
    // }
  }
}
</script>
