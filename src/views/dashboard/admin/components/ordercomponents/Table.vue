<template>
  <div class="orders">
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
      <el-table-column v-if="multiple" type="selection" width="35" />
      <el-table-column align="center" type="index" width="35" class-name="table-detail" />
      <!-- 下拉框 -->
      <el-table-column type="expand" width="35" class-name="table-detail">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-detail-expand">
            <el-form-item :label="$t('order.oederNumber') + '：'">
              <span>{{ props.row.orderNo }}</span>
            </el-form-item>
            <el-form-item :label="$t('order.consignee') + '：'">
              <span>{{ props.row.addressee.name }}</span>
            </el-form-item>
            <el-form-item :label="$t('order.waybillNo') + '：'">
              <span>{{ props.row.addressee.waybillNo }}</span>
            </el-form-item>
            <el-form-item :label="$t('order.consigneePhone') + '：'">
              <span>{{ props.row.addressee.phone }}</span>
            </el-form-item>
            <el-form-item :label="$t('order.consigneeaddr') + '：'">
              <span>{{ props.row.addressee.address }}</span>
            </el-form-item>
            <el-form-item :label="$t('order.orderState') + '：'">
              <span>{{ props.row.orderStatus_fmt }}</span>
            </el-form-item>
            <el-form-item :label="$t('order.orderType') + '：'">
              <span>{{ props.row.orderType_fmt }}</span>
            </el-form-item>
            <el-form-item :label="$t('order.delivery') + '：'">
              <span>{{ props.row.deliveryType_fmt }}</span>
            </el-form-item>
            <el-form-item :label="$t('order.orderTime') + '：'">
              <span>{{ props.row.orderTime_fmt }}</span>
            </el-form-item>
            <el-form-item :label="$t('order.paymentTime') + '：'">
              <span>{{ props.row.payTime_fmt }}</span>
            </el-form-item>
            <el-form-item :label="$t('order.deliveryTime') + '：'">
              <span>{{ props.row.shipTime_fmt }}</span>
            </el-form-item><el-form-item :label="$t('order.receivingTime') + '：'">
              <span>{{ props.row.receiveTime_fmt }}</span>
            </el-form-item>
            <el-form-item :label="$t('order.commentTime') + '：'">
              <span>{{ props.row.commentTime_fmt }}</span>
            </el-form-item>
            <el-form-item :label="$t('order.remarks') + '：'">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
            <hr>
            <div v-for="(product,index) in props.row.productInfosJson" :key="index">
              <el-form-item :label="$t('order.goodsimg') + '：'" class="productImagesClass">
                <div v-if="product.productJson.images && product.productJson.images.length > 0">
                  <a v-for="img in product.productJson.images" :key="img" :href="img" target="_blank" style="margin-left:20px;"><img :src="img" width="80px" height="80px"></a>
                </div>
                <div v-else>
                  <span>暂无</span>
                </div>
              </el-form-item>
              <br>
              <el-form-item :label="$t('order.goodsname') + '：'">
                <span>{{ product.name }}</span>
              </el-form-item>

              <el-form-item :label="$t('order.goodsprice') + '：'">
                <span>￥{{ (product.price/ 100).toFixed(2) }}</span>
              </el-form-item>

              <div v-show="index < props.row.productInfosJson.length - 1" style="width:100%;height: 0px;border-bottom:#000000 1px dashed;" />
            </div>
          </el-form>
        </template>
      </el-table-column>
      <!-- 商品名称 -->
      <el-table-column :label="$t('order.goodsname')" prop="productInfosJson[0].name" show-overflow-tooltip />
      <!-- 订单编号 -->
      <el-table-column :label="$t('order.oederNumber')" prop="orderNo" sortable width="160" show-overflow-tooltip />
      <!-- 运单号 -->
      <el-table-column :label="$t('order.waybillNo')" prop="addressee.waybillNo" show-overflow-tooltip />
      <!-- 订单状态 -->
      <el-table-column :label="$t('order.orderState')" prop="orderStatus_fmt" width="78" />
      <!-- 订单金额 -->
      <el-table-column :label="$t('order.orderPrice')" prop="totalAmount_fmt" show-overflow-tooltip />
      <!-- 下单时间 -->
      <el-table-column :label="$t('order.orderTime')" prop="orderTime_fmt" show-overflow-tooltip />
      <edit-dialog ref="EditDialog" :is-show="isEditShow" :title="$t('common.edit')" :is-add="false" :data="selectRow" @close="handleEditDialogClose" />
    </el-table></div>
</template>

<script>
import EditDialog from './EditDialog'
import { MessageBox } from 'element-ui'
import { remove, toggleStatus, resetPwd, showBlacklist } from '@/api/user'

export default {
  name: 'UserTable',
  components: { EditDialog },
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
      selectRow: {}
    }
  },
  computed: {
    height() {
      return window.innerHeight - 220 - 430
    }
  },
  methods: {
    async toggleStatus() {
      const resp = await toggleStatus(this.selectRow.id)
      if (!resp.success) {
        this.selectRow.status = !this.selectRow.status
        this.$forceUpdate()
      }
    },
    async resetPwd() {
      const resp = await resetPwd(this.selectRow.id)
      if (resp.success) {
        MessageBox.alert('密码已重置为：' + resp.data, this.$t('common.info'))
      }
    },
    async showBlacklist() {
      const resp = await showBlacklist(this.selectRow.id)
      if (resp.success) {
        const html = resp.rows.map(row => {
          return '<div>' + row.username + '   ' + row.name + '</div>'
        }).join('')
        MessageBox.alert(html, this.$t('common.detail'), {
          dangerouslyUseHTMLString: true,
          customClass: 'message-box-detail'
        })
      }
    },
    async delete() {
      const resp = await remove(this.selectRow.id)
      if (resp.success) {
        this.$emit('search')
      }
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
    handleEditDialogClose() {
      this.isEditShow = false
      this.$emit('search')
    },
    handleSelectionChange(rows) {
      this.$emit('selection-change', rows)
    },
    hanldeToggleStatus(row) {
      this.selectRow = row
      this.toggleStatus()
    },
    handleresetPwd(row) {
      this.selectRow = row
      MessageBox.confirm(this.$t('user.resetPwdInfo'), this.$t('user.resetPwd'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.resetPwd()
      }).catch(() => {})
    },
    handleShowBlacklist(row) {
      this.selectRow = row
      this.showBlacklist()
    }
  }
}
</script>

<style scoped lang="scss">
.orders{
  /deep/.el-table-th{
    background-color: #e6f3ff;
  }
}

</style>

