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
      <el-table-column label="联系电话" prop="address.mobileNo" min-width="90" />
      <el-table-column label="用户类型" prop="customerType_fmt" width="80" />
      <el-table-column label="地址" prop="address.addresstext" min-width="230" show-overflow-tooltip />
      <el-table-column label="备注信息" prop="remark" min-width="200" show-overflow-tooltip />
      <el-table-column label="状态" prop="status_fmt" min-width="80" align="center" />
      <el-table-column label="创建时间" prop="createDate_fmt" min-width="160" align="center" />
      <el-table-column label="期待上门时间" prop="doorstepTime_fmt" min-width="160" align="center" />
      <el-table-column label="服务项目" align="center" width="160">
        <template slot-scope="scope">
          <el-link type="primary" @click="openService(scope.row)">查看维修项目</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="80">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.status === 'BOOKING'" content="创建订单" placement="top">
            <el-button type="success" icon="el-icon-edit" circle @click="handleEditDialogOpen(scope.row)" />
          </el-tooltip>
          <span v-else>已创建</span>
        </template>
      </el-table-column>
    </el-table>
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
      enterpriserighttable: { visible: false, id: '', type: '' }
    }
  },
  computed: {
    height() {
      return window.innerHeight - 170
    }
  },
  methods: {
    handleEditDialogOpen(row) {
      this.selectRow = row
      MessageBox.confirm('确认创建订单？', {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      })
        .then(() => {
          // 创建订单
          this.addOrder()
        })
        .catch(() => {})
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
          repairMinute: time
        }
        const res = await OrderApi.add(obj)
        if (res.success) {
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
    }
  }
}
</script>
