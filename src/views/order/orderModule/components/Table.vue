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
      <el-table-column type="index" width="30" label="#" align="center" />

      <el-table-column prop="orderNo" label="订单号" />
      <el-table-column prop="customerType_fmt" label="客户类型" />
      <el-table-column prop="orderStatus_fmt" label="订单状态" />
      <el-table-column prop="repairMinute" label="维修时长" />
      <el-table-column prop="totalPrice_fmt" label="维修总价" />
      <el-table-column label="维修师傅" width="100" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.repairMan&&scope.row.repairMan.user.name">{{ scope.row.repairMan.user.name }}</span>
          <span v-else>未指派</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="(scope.row.customerType==='ENTERPRISE'&& scope.row.orderStatus==='PAID')||(scope.row.customerType==='ENTERPRISE'&& scope.row.orderStatus==='ASSIGN')||(scope.row.customerType==='FAMILY'&& scope.row.orderStatus==='PAID') || (scope.row.customerType==='FAMILY'&& scope.row.orderStatus==='ASSIGN')" type="primary" icon="el-icon-s-custom" @click="handlePerson(scope.row)">指派维修员</el-button>
          <!-- <el-button type="primary" icon="el-icon-s-custom" @click="handlePerson(scope.row)">指派维修员</el-button> -->
          <el-button v-if="scope.row.orderStatus!='CANCEL'" type="success" icon="el-icon-edit" @click="handleChangePrise(scope.row)">维修项目</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看维修项目 -->
    <show-merchant
      :show.sync="changePriseVisible"
      :shop-id="shopid"
      :orderid="orderid"
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
            <el-option v-for="(item, i) in table.data" :key="i" :value="item.id" :label="item.user.name" />
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
import ShowMerchant from './ShowMerchant'
import repairManApi from '@/api/repairMan'
import orderApi from '@/api/order'

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
      shopid: '',
      orderid: '',
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
        console.log(resp.rows, 'repariLIst')
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
        this.choosePersonVisible = false
        this.$emit('search')
      }
    },
    // 指派维修人员确认按钮
    handleSubmit() {
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
      this.shopid = row.booking.id
      this.orderid = row.id
      this.changePriseVisible = true
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
    handleEditDialogClose() {
      this.changePriseVisible = false
      this.$emit('search')
    },
    handleSelectionChange(rows) {
      this.$emit('selection-change', rows)
    }
  }
}
</script>
