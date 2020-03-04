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

      <!-- 任务 -->
      <el-table-column label="任务" prop="method_fmt" align="center" />
      <!-- 状态 -->
      <el-table-column label="状态" prop="status_fmt" align="center" />
      <!-- 启停 -->
      <el-table-column label="启停" prop="status" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" :disabled="!scope.row.status" :active-value="true" active-color="#13ce66" @change="change(scope.row)" />
        </template>
      </el-table-column>
      <!-- 时间 -->
      <el-table-column label="时间" prop="startTime_fmt" align="center" />
    </el-table>
  </div>
</template>

<script>
import OrderApi from '@/api/order'
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
    return {

    }
  },
  computed: {
    height() {
      return window.innerHeight - 170
    }
  },
  methods: {
    // 状态切换
    async change(row) {
      console.log(row, 'shuju')
      const res = await OrderApi.putOrderPaymentTIme(row.id)
      if (res.success) {
        this.$emit('search')
      }
    }
  }
}
</script>
