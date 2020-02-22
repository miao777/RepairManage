<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" :rules="rules" class="demo-form-inline">
      <el-form-item label="订单号" prop="filters[0].value">
        <el-input v-model="form.filters[0].value" placeholder="输入订单编号" clearable />
      </el-form-item>
      <el-form-item label="订单状态" prop="filters[1].value">
        <el-select v-model="form.filters[1].value" :placeholder="$t('order.orderState')" clearable>
          <el-option v-for="item in statuses" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('common.search') }}</el-button>
        <el-button type="default" icon="el-icon-refresh" @click="handleReset">{{ $t('common.reset') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import orderApi from '@/api/order'

export default {
  name: 'UserSearchBar',
  components: { },
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      statuses: [], // 下拉框显示内容
      rules: {
        'filters[0].value': [
          { max: 30, message: '长度不能超过30个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.showOrderType()
  },
  methods: {
    async showOrderType() {
      const resp = await orderApi.orderType()
      if (resp.success) {
        const data = resp.rows
        data.map(item => {
          const obj = {}
          obj.label = item.value
          obj.value = item.name
          this.statuses.push(obj)
        })
        this.statuses.splice(0, 0, { label: '全部', value: '' })
      }
    },
    // 搜索按钮
    handleSearch() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('search', 1)
        }
      })
    },
    // 重置按钮
    handleReset() {
      this.$refs.form.resetFields()// 重置表单
      this.$refs.form.clearValidate()// 移除该表单项的校验结果
      this.$emit('reset')
    }
  }
}
</script>
