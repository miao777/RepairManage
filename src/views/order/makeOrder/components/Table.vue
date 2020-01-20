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
      <el-table-column label="联系电话" prop="address.mobileNo" />
      <el-table-column label="用户类型" prop="customerType_fmt" />
      <el-table-column label="地址" prop="address.addresstext" min-width="300" />
      <el-table-column label="服务项目" align="center" width="160">
        <template slot-scope="scope">
          <el-link type="primary" @click="openService(scope.row)">查看维修项目</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="80">
        <template slot-scope="scope">
          <el-tooltip content="创建订单" placement="top">
            <el-button type="success" icon="el-icon-edit" circle @click="handleEditDialogOpen(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看项目 -->
    <show-merchant :show.sync="enterpriserighttable.visible" :shop-id="enterpriserighttable.id" @handleBindClose="handleBindClose" />
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
      enterpriserighttable: { visible: false, id: '' }
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
      }).then(() => {
        // 创建订单
        this.addOrder()
      }).catch(() => {})
    },
    // 创建订单
    async addOrder() {
      const param = {
        filters: [
          { field: 'booking.id', op: 'EQ', value: this.selectRow.id }
        ],
        page: { page: 0, size: 10, sorts: [{ field: 'createDate', order: 'desc' }] }
      }
      const resp = await BookingApi.searvicePage(param)
      if (resp.success) {
        // console.log(this.selectRow)
        // console.log(resp.rows, 'shujuneirong')
        let time = 0
        const arr = []
        resp.rows.map(item => {
          time += item.item.repairMinute
          const obj = {}
          obj.orderProductId = item.item.id
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
        }
      }
    },
    openService(row) {
      this.enterpriserighttable.visible = true
      this.enterpriserighttable.id = row.id
    },
    handleBindClose() {
      this.this.enterpriserighttable.visible = false
    }
  }
}
</script>
