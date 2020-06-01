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
      <!-- 下拉框 -->
      <el-table-column type="expand" width="35" class-name="table-detail">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-detail-expand">
            <el-form-item label="订单号">
              <span>{{ props.row.orderNo }}</span>
            </el-form-item>
            <el-form-item label="姓名">
              <span>{{ props.row.booking.address.contactMan }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.booking.address.mobileNo }}</span>
            </el-form-item>
            <el-form-item label="客户类型">
              <span>{{ props.row.customerType_fmt }}</span>
            </el-form-item>
            <el-form-item label="客户地址">
              <span>{{ props.row.booking.address.province.name }}{{ props.row.booking.address.city.name }}{{ props.row.booking.address.district.name }}{{ props.row.booking.address.address }}</span>
            </el-form-item>
            <el-form-item label="订单状态">
              <span>{{ props.row.orderStatus_fmt }}</span>
            </el-form-item>
            <el-form-item label="维修时长">
              <span>{{ props.row.repairMinute }}</span>
            </el-form-item>
            <el-form-item label="维修总价">
              <span>{{ props.row.totalPrice_fmt }}</span>
            </el-form-item>
            <el-form-item label="维修师傅">
              <span v-if="props.row.repairMan&&props.row.repairMan.user.name">{{ props.row.repairMan.user.name }}</span>
              <span v-else>未指派</span>
            </el-form-item>
            <el-form-item label="报修时间">
              <span v-if="props.row.applyTime_fmt!=''">{{ props.row.applyTime_fmt }}</span>
              <span v-else>未知</span>
            </el-form-item>
            <el-form-item label="客户确认时间">
              <span v-if="props.row.confirmTime_fmt!=''">{{ props.row.confirmTime_fmt }}</span>
              <span v-else>未确认</span>
            </el-form-item>
            <el-form-item label="指派师傅时间">
              <span v-if="props.row.assignTime_fmt!=''">{{ props.row.assignTime_fmt }}</span>
              <span v-else>未指派</span>
            </el-form-item>
            <el-form-item label="师傅接单时间">
              <span v-if="props.row.takeOrderTime_fmt!=''">{{ props.row.takeOrderTime_fmt }}</span>
              <span v-else>未接单</span>
            </el-form-item>
            <el-form-item label="上门时间">
              <span v-if="props.row.doorstepTime_fmt!=''">{{ props.row.doorstepTime_fmt }}</span>
              <span v-else>未上门</span>
            </el-form-item>
            <el-form-item label="完成时间">
              <span v-if="props.row.completeTime_fmt!=''">{{ props.row.completeTime_fmt }}</span>
              <span v-else>未完成</span>
            </el-form-item>
            <el-form-item label="留言时间">
              <span v-if="props.row.commentTime_fmt!=''">{{ props.row.commentTime_fmt }}</span>
              <span v-else>未留言</span>
            </el-form-item>
            <el-form-item label="取消时间">
              <span v-if="props.row.cancelTime_fmt!=''">{{ props.row.cancelTime_fmt }}</span>
              <span v-else>未取消</span>
            </el-form-item>
            <el-form-item label="打分">
              <span v-if="props.row.star!=''">{{ props.row.star }}</span>
              <span v-else>未打分</span>
            </el-form-item>
            <el-form-item label="留言">
              <span v-if="props.row.comment!=''">{{ props.row.comment }}</span>
              <span v-else>未留言</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="orderNo" label="订单号" min-width="150" />
      <el-table-column prop="booking.address.contactMan" label="姓名" width="100" />
      <el-table-column prop="booking.address.mobileNo" label="联系电话" width="150" />
      <el-table-column prop="customerType_fmt" label="客户类型" min-width="120" />
      <el-table-column prop="orderStatus_fmt" label="订单状态" min-width="120" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.orderStatus==='PENDING'||scope.row.orderStatus==='CONFIRM_ORDER'||scope.row.orderStatus==='CONFIRM_COMPLETE'">{{ scope.row.orderStatus_fmt }}</el-tag>
          <el-tag v-if="scope.row.orderStatus==='PAID'" color="#66CDAA" style="color:white;">{{ scope.row.orderStatus_fmt }}</el-tag>
          <el-tag v-if="scope.row.orderStatus==='ASSIGN'" type="danger">{{ scope.row.orderStatus_fmt }}</el-tag>
          <el-tag v-if="scope.row.orderStatus==='TAKE_ORDER'||scope.row.orderStatus==='BEFORE_REPAIR'||scope.row.orderStatus==='REPAIRING'" type="warning">{{ scope.row.orderStatus_fmt }}</el-tag>
          <el-tag v-if="scope.row.orderStatus==='AFTER_REPAIR'" type="warning">{{ scope.row.orderStatus_fmt }}</el-tag>
          <el-tag v-if="scope.row.orderStatus==='CANCEL'" type="info">{{ scope.row.orderStatus_fmt }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="repairMinute" label="维修时长" min-width="90" align="center" />
      <el-table-column prop="totalPrice_fmt" label="维修总价" min-width="90" align="center" />
      <el-table-column label="维修师傅" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.repairMan&&scope.row.repairMan.user.name">{{ scope.row.repairMan.user.name }}</span>
          <span v-else>未指派</span>
        </template>
      </el-table-column>
      <el-table-column prop="doorstepTime_fmt" label="上门时间" min-width="160" align="center" sortable />
      <el-table-column prop="completeTime_fmt" label="完成时间" min-width="160" align="center" sortable />
      <el-table-column label="操作" align="center" min-width="130">
        <template slot-scope="scope">
          <el-tooltip v-if="(scope.row.customerType==='ENTERPRISE'&& scope.row.orderStatus==='PAID')||(scope.row.customerType==='ENTERPRISE'&& scope.row.orderStatus==='ASSIGN')||(scope.row.customerType==='FAMILY'&& scope.row.orderStatus==='PAID') || (scope.row.customerType==='FAMILY'&& scope.row.orderStatus==='ASSIGN')" type="success" icon="el-icon-edit" content="指派维修员" placement="top">
            <el-button type="primary" icon="el-icon-s-custom" circle @click="handlePerson(scope.row)" />
          </el-tooltip>
          <!-- <el-button type="primary" icon="el-icon-s-custom" @click="handlePerson(scope.row)">指派维修员</el-button> -->
          <el-tooltip v-if="scope.row.orderStatus!='CANCEL'" type="success" icon="el-icon-edit" content="查看维修项目" placement="top">
            <el-button type="success" icon="el-icon-edit" circle @click="handleChangePrise(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看维修项目 -->
    <show-merchant
      :show.sync="changePriseVisible"
      :shop-id="shopid"
      :orderid="orderid"
      @showprice="showprice"
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
    showprice() {
      this.$emit('search')
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

