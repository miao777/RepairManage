<template>
  <div>
    <el-form
      ref="form"
      :inline="true"
      :model="form"
      :rules="rules"
      class="demo-form-inline"
    >
      <el-form-item label="支付号">
        <div style="width:150px;">
          <el-input v-model="form.filters[0].value" :placeholder="$t('common.please.enter')+'支付号'" size="small" clearable />
        </div>
      </el-form-item>
      <el-form-item label="交易用户名">
        <div style="width:150px;">
          <el-input v-model="form.filters[1].value" :placeholder="$t('common.please.enter')+'交易用户名'" size="small" clearable />
        </div>
      </el-form-item>
      <el-form-item label="第三方交易号">
        <div style="width:150px;">
          <el-input v-model="form.filters[2].value" :placeholder="$t('common.please.enter')+'第三方交易号'" size="small" clearable />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">{{ $t('common.search') }}</el-button>
        <el-button size="small" icon="el-icon-refresh" @click="handleReset">{{ $t('common.reset') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: { },
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
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
    }
  }
}
</script>
