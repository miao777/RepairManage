<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" :rules="rules" class="demo-form-inline">
      <el-form-item label="订单号" prop="filters[0].value">
        <el-input v-model="form.filters[0].value" placeholder="输入订单编号" clearable />
      </el-form-item>
      <!-- <el-form-item :label="$t('order.consignee')" prop="filters[0].value">
        <el-input v-model="form.filters[1].value" :placeholder="$t('order.consignee')" clearable />
      </el-form-item>
      <el-form-item :label="$t('order.waybillNo')" prop="filters[0].value">
        <el-input v-model="form.filters[2].value" :placeholder="$t('order.waybillNo')" clearable />
      </el-form-item>
      <el-form-item :label="$t('order.consigneePhone')" prop="filters[0].value">
        <el-input v-model="form.filters[3].value" :placeholder="$t('order.consigneePhone')" clearable />
      </el-form-item>
      <el-form-item :label="$t('order.orderState')" prop="filters[3].value">
        <el-select v-model="form.filters[4].value" :placeholder="$t('order.orderState')" clearable>
          <el-option v-for="item in statuses" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('common.search') }}</el-button>
        <el-button type="default" icon="el-icon-refresh" @click="handleReset">{{ $t('common.reset') }}</el-button>
        <!-- <el-button type="success" icon="el-icon-plus" @click="handleAddDialogOpen">{{ $t('common.add') }}</el-button>
        <el-button type="default" icon="el-icon-plus" @click="$emit('service')">新增服务</el-button> -->
      </el-form-item>
    </el-form>
    <!-- <add-dialog ref="AddDialog" :is-show="isAddShow" :is-add="true" @close="handleAddDialogClose" /> -->
  </div>
</template>

<script>
// import AddDialog from './EditDialog'
// import { orderTypeList } from '@/api/order'

export default {
  name: 'UserSearchBar',
  // components: { AddDialog },
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isAddShow: false,
      statuses: [], // 下拉框显示内容
      rules: {
        'filters[0].value': [
          { max: 20, message: '长度不能超过20个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // this.showOrderList()
  },
  methods: {
    // async showOrderList() {
    //   const resp = await orderTypeList()
    //   if (resp.success) {
    //     const data = resp.rows
    //     data.map(item => {
    //       const obj = {}
    //       obj.label = item.value
    //       obj.value = item.name
    //       this.statuses.push(obj)
    //     })
    //     this.statuses.splice(0, 0, { label: '全部', value: '' })
    //   }
    // },
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
    // handleAddDialogOpen() {
    //   this.isAddShow = true
    // },
    // handleAddDialogClose() {
    //   this.isAddShow = false
    //   this.$emit('search')
    // },
    // handleBatchDelete() {
    //   this.$emit('batch-delete')
    // }
  }
}
</script>
