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
      <el-form-item label="客户类型" prop="filters[2].value">
        <el-select v-model="form.filters[2].value" placeholder="企业类型" clearable>
          <el-option v-for="item in tycome" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称" prop="filters[3].value">
        <el-input v-model="form.filters[3].value" placeholder="输入企业名称" clearable />
      </el-form-item>
      <el-form-item label="日期" prop="filters[4].value">
        <el-date-picker
          v-model="form.filters[4].value"
          type="daterange"
          align="right"
          unlink-panels
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          size="small"
          clearable
        />
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
      // 时间
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      statuses: [], // 下拉框显示内容
      tycome: [{ label: '全部', value: '' }, { label: '企业客户', value: 'ENTERPRISE' }, { label: '家庭客户', value: 'FAMILY' }],
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
