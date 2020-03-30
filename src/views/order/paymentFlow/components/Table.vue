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
      <el-table-column type="index" label="序号" align="center" width="40px" />
      <el-table-column type="expand" width="30" class-name="table-detail">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-detail-expand">
            <el-form-item label="支付号">
              <span>{{ props.row.payNo }}</span>
            </el-form-item>
            <el-form-item label="交易用户名">
              <span>{{ props.row.tradeUsername }}</span>
            </el-form-item>
            <el-form-item label="第三方交易号">
              <span>{{ props.row.tradeNo }}</span>
            </el-form-item>
            <el-form-item label="交易渠道">
              <span>{{ props.row.channel_fmt }}</span>
            </el-form-item>
            <el-form-item label="交易金额">
              <span>{{ props.row.amount }}</span>
            </el-form-item>
            <el-form-item label="手续费">
              <span>{{ props.row.fee }}</span>
            </el-form-item>
            <el-form-item label="支付状态">
              <span>{{ props.row.payStatus_fmt }}</span>
            </el-form-item>
            <el-form-item label="第三方状态">
              <span v-if="props.row.status='SUCCESS'">成功</span>
              <span v-else>失败</span>
            </el-form-item>
            <el-form-item label="交易时间">
              <span>{{ props.row.launchTime_fmt }}</span>
            </el-form-item>
            <el-form-item label="完成交易时间">
              <span>{{ props.row.completeTime_fmt }}</span>
            </el-form-item>
            <el-form-item label="支付失败原因">
              <span>{{ props.row.failReason }}</span>
            </el-form-item>
            <el-form-item label="支付内容（返回）">
              <span>{{ props.row.payContent }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 支付号 -->
      <el-table-column prop="payNo" label="支付号" min-width="120" />
      <!-- 交易用户名 -->
      <el-table-column prop="tradeUsername" label="交易用户名" min-width="80" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.tradeUsername">{{ scope.row.tradeUsername }}</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <!-- 第三方交易号 -->
      <el-table-column prop="tradeNo" label="第三方交易号" min-width="100" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.tradeNo">{{ scope.row.tradeNo }}</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <!-- 交易渠道 -->
      <el-table-column prop="channel_fmt" label="交易渠道" min-width="90" align="center" />
      <!-- 交易金额 -->
      <el-table-column prop="amount" label="交易金额" min-width="60" align="center" />
      <!-- 手续费 -->
      <el-table-column prop="fee" label="手续费" min-width="60" align="center" />
      <!-- 支付状态 -->
      <el-table-column prop="payStatus_fmt" label="支付状态" min-width="60" align="center" />
      <!-- 第三方状态 -->
      <el-table-column prop="payStatus_fmt" label="第三方状态" min-width="60" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status==='SUCCESS'">成功</span>
          <span v-else>失败</span>
        </template>
      </el-table-column>
      <!-- 交易时间 -->
      <el-table-column prop="launchTime_fmt" label="交易时间" min-width="90" align="center" sortable />
      <!-- 完成交易时间 -->
      <el-table-column prop="completeTime_fmt" label="完成交易时间" min-width="90" align="center" sortable />

    </el-table>
  </div>
</template>

<script>
export default {
  components: { },
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
    return {}
  },
  computed: {
    height() {
      return window.innerHeight - 170
    }
  },
  methods: {}
}
</script>
