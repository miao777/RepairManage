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

              <el-form-item :label="$t('order.ordernums') + '：'">
                <span>{{ product.nums }}</span>
              </el-form-item>

              <div v-show="index < props.row.productInfosJson.length - 1" style="width:100%;height: 0px;border-bottom:#000000 1px dashed;" />
            </div>
          </el-form>
        </template>
      </el-table-column>
      <!-- 图片 -->
      <el-table-column label="图片" prop="localPath">
        <template slot-scope="scope">
          <el-image :class="scope.row.localPath ? 'table-image-size' : ''" :src="scope.row.localPath" :preview-src-list="scope.row.localPaths" fit="cover">
            <div v-if="!scope.row.localPath" slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />{{ $t('common.notLoading') }}
            </div>
          </el-image>
        </template>
      </el-table-column>
      <!-- 图片名称 -->
      <el-table-column label="图片名称" prop="originalName" min-width="150" show-overflow-tooltip />
      <!-- 上传人 -->
      <el-table-column label="上传人" prop="user.name" />
      <!-- 上传时间-- -->
      <el-table-column label="上传时间" prop="createDate_fmt" sortable />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip :content="$t('common.delete')" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDetele(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import { imagesRemove } from '@/api/role'

export default {
  name: 'UserTable',
  components: { },
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
      return window.innerHeight - 170
    }
  },
  methods: {
    // 删除
    async delete() {
      const resp = await imagesRemove(this.selectRow.id)
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
