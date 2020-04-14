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
        <el-select v-model="form.filters[2].value" :placeholder="$t('order.orderState')" clearable>
          <el-option v-for="item in statuses" :key="item.label" :label="item.label" :value="item.value" />
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
      statuses: [
        { label: '全部', value: '' },
        { label: '预约中', value: 'BOOKING' },
        { label: '订单执行中', value: 'POSTING' },
        { label: '取消预约', value: 'CANCEL' }
      ],
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
  created() {},
  methods: {
    handleSearch() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('search')
        }
      })
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
