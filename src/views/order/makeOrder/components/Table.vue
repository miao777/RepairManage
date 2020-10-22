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
      <el-table-column label="姓名" prop="address.contactMan" />
      <el-table-column label="联系电话" prop="address.mobileNo" width="110" align="center" />
      <el-table-column label="用户类型" prop="customerType_fmt" width="80" />
      <el-table-column label="地址" prop="address.addresstext" min-width="230" show-overflow-tooltip />
      <el-table-column label="备注信息" prop="remark" min-width="200" show-overflow-tooltip />
      <el-table-column label="状态" prop="status_fmt" min-width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==='BOOKING'" type="danger">{{ scope.row.status_fmt }}</el-tag>
          <el-tag v-if="scope.row.status==='POSTING'" type="warning">{{ scope.row.status_fmt }}</el-tag>
          <el-tag v-if="scope.row.status==='CANCEL'" type="info" style="border-color:#e9e9eb;background-color:#f4f4f5;color:#909399;">{{ scope.row.status_fmt }}</el-tag>
          <el-tag v-if="scope.row.status==='COMPLETE'" type="success">{{ scope.row.status_fmt }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" prop="payMode_fmt" min-width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.payMode==='AFTER'">{{ scope.row.payMode_fmt }}</el-tag>
          <el-tag v-if="scope.row.payMode==='BEFORE'" type="success">{{ scope.row.payMode_fmt }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createDate_fmt" min-width="160" align="center" sortable />
      <el-table-column label="期待上门时间" prop="doorstepTime_fmt" min-width="160" align="center" sortable />
      <el-table-column label="服务项目" align="center" width="120">
        <template slot-scope="scope">
          <el-link type="primary" @click="openService(scope.row)">查看维修项目</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.status === 'BOOKING'" content="创建订单" placement="top">
            <el-button type="success" icon="el-icon-plus" circle @click="handleEditDialogOpen(scope.row)" />
          </el-tooltip>
          <!-- <span v-if="scope.row.status === 'CANCEL'">已取消</span>
          <span v-if="scope.row.status === 'POSTING'">已创建</span> -->
          <!-- 取消预约 -->
          <el-tooltip v-if="scope.row.status == 'BOOKING' || scope.row.status === 'POSTING'" class="item" effect="dark" content="取消预约" placement="top-start">
            <el-button type="primary" icon="el-icon-document-delete" circle @click="handleDeleteBtn(scope.row)" />
          </el-tooltip>
          <!-- 删除订单 -->
          <el-tooltip content="删除预约订单" placement="top-start">
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDetele(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 选择支付方式 -->
    <el-dialog
      title="确认创建订单？"
      :visible.sync="centerDialogVisible"
      width="30%"
      :before-close="handleCloseds"
      :close-on-click-modal="false"
    >
      <p style="font-size:15px;margin-top:-6px;color:red;"><i class="el-icon-warning" /> 请选择支付方式</p>
      <div style="width：100%;text-align:center;margin-top:30px;">
        <el-radio v-model="radio" :label="radioarr[0]&&radioarr[0].name" style="margin-right:0;margin-bottom:20px;display:inline-block;width:80%;" border size="small">{{ radioarr[0]&&radioarr[0].value }}</el-radio>
        <br>
        <el-radio v-model="radio" style="display:inline-block;width:80%;" :label="radioarr[1]&&radioarr[1].name" border size="small">{{ radioarr[1]&&radioarr[1].value }}</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseds">取 消</el-button>
        <el-button type="primary" @click="addOrder">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 查看项目 -->
    <show-merchant :show.sync="enterpriserighttable.visible" :shop-id="enterpriserighttable.id" :shop-type="enterpriserighttable.type" @handleBindClose="handleBindClose" />
  </div>
</template>

<script>
import BookingApi from '@/api/booking'
import OrderApi from '@/api/order'
import ShowMerchant from './ShowMerchant'
import { MessageBox } from 'element-ui'
export default {
  components: { ShowMerchant },
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
      selectRow: {},
      enterpriserighttable: { visible: false, id: '', type: '' },
      centerDialogVisible: false,
      radio: 'BEFORE',
      radioarr: []
    }
  },
  computed: {
    height() {
      return window.innerHeight - 170
    }
  },
  created() {
    this.getordermode()
  },
  methods: {
    async getordermode() {
      const resp = await OrderApi.orderMode()
      if (resp.success) {
        this.radioarr = resp.rows
      }
    },
    handleCloseds() {
      this.centerDialogVisible = false
      this.radio = 'BEFORE'
    },
    handleEditDialogOpen(row) {
      this.selectRow = row
      // 获取用户选择支付方式
      this.radio = row.payMode
      this.centerDialogVisible = true
    },
    // 创建订单
    async addOrder() {
      const param = {
        filters: [{ field: 'booking.id', op: 'EQ', value: this.selectRow.id }],
        page: { page: 0, size: 10, sorts: [{ field: 'createDate', order: 'desc' }] }
      }
      const resp = await BookingApi.searvicePage(param)
      if (resp.success) {
        let time = 0
        const arr = []
        resp.rows.map(item => {
          time += item.item.repairMinute
          const obj = {}
          obj.orderProductId = item.id
          obj.price = item.price
          obj.remark = ''
          arr.push(obj)
        })
        const obj = {
          fixPriceVos: arr,
          orderBookingId: this.selectRow.id,
          remark: '',
          repairMinute: time,
          payMode: this.radio
        }
        const res = await OrderApi.add(obj)
        if (res.success) {
          this.handleCloseds()
          this.$message({
            message: '订单生成成功',
            type: 'success'
          })
          this.$emit('search')
        }
      }
    },
    openService(row) {
      this.enterpriserighttable.visible = true
      this.enterpriserighttable.id = row.id
      this.enterpriserighttable.type = row.status
    },
    handleBindClose() {
      this.enterpriserighttable.visible = false
    },
    async deleteMethod(data) {
      const resp = await BookingApi.cancelOrder(data)
      if (resp.success) {
        this.$emit('search')
      }
    },
    async delete() {
      const resp = await BookingApi.delete(this.selectRow.id)
      if (resp.success) {
        this.$emit('search')
      }
    },
    // 删除订单
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
    // 删除事件
    handleDeleteBtn(row) {
      MessageBox.prompt('请填写取消预约的原因（必填）', {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        inputValidator: (value) => {
          if (!value) {
            return '请输入取消点预约原因'
          }
        }
      }).then(({ value }) => {
        const obj = { id: row.id, remark: value }
        this.deleteMethod(obj)
      }).catch(() => {})
    }
  }
}
</script>
