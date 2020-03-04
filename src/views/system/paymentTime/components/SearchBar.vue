<template>
  <div>
    <el-form
      ref="form"
      :inline="true"
      :model="form"
      :rules="rules"
      class="demo-form-inline"
    >
      <el-form-item label="状态" prop="filters[0].value">
        <el-select v-model="form.filters[0].value">
          <el-option v-for="(item,i) in statuses" :key="i" :value="item.value" :label="item.label" />
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
  components: { },
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      statuses: [
        { label: '全部', value: '' },
        { label: '执行中', value: true },
        { label: '已关闭', value: false }
      ],
      rules: {
        // 'filters[0].value': [
        //   { max: 255, message: '长度不能超过255个字符', trigger: 'blur' }
        // ]
      }
    }
  },
  created() {
  },
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
