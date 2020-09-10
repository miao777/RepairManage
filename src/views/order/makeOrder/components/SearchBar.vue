<template>
  <div>
    <el-form
      ref="form"
      :inline="true"
      :model="form"
      :rules="rules"
      class="demo-form-inline"
    >
      <el-form-item label="姓名" prop="filters[0].value">
        <el-input v-model="form.filters[0].value" placeholder="输入姓名" />
      </el-form-item>
      <el-form-item label="联系电话" prop="filters[1].value">
        <el-input v-model="form.filters[1].value" placeholder="输入联系电话" />
      </el-form-item>
      <el-form-item label="订单状态" prop="filters[2].value">
        <el-select v-model="form.filters[2].value" placeholder="请选择订单状态" clearable>
          <el-option label="全部" value="" />
          <el-option v-for="item in statuses" :key="item.name" :label="item.value" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{
          $t("common.search")
        }}</el-button>
        <el-button type="default" icon="el-icon-refresh" @click="handleReset">{{
          $t("common.reset")
        }}</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BookingApi from '@/api/booking'
export default {
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isAddShow: false,
      isSortShow: false,
      statuses: [],
      types: [],
      keys: [],
      rules: {
        'filters[0].value': [
          { max: 255, message: '长度不能超过255个字符', trigger: 'blur' }
        ],
        'filters[1].value': [
          { max: 255, message: '长度不能超过255个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getOrderstatus()
  },
  methods: {
    handleSearch() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('search')
        }
      })
    },
    async getOrderstatus() {
      const resp = await BookingApi.getOrderstatus()
      if (resp.success) {
        this.statuses = resp.rows
        console.log(resp.rows, '121212')
      }
    },
    handleReset() {
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
      this.$emit('reset')
    },
    handleAddDialogClose() {
      this.isAddShow = false
      this.$emit('search')
    },
    handleSortDialogOpen() {
      this.isSortShow = true
    },
    handleSortDialogClose() {
      this.isSortShow = false
      this.$emit('search')
    }
  }
}
</script>
