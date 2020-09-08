<template>
  <div>
    <el-form
      ref="form"
      :inline="true"
      :model="form"
      :rules="rules"
      class="demo-form-inline"
    >
      <el-form-item label="反馈标题" prop="filters[0].value">
        <el-input v-model="form.filters[0].value" clearable placeholder="输入反馈标题" />
      </el-form-item>
      <el-form-item label="反馈级别" prop="filters[1].value">
        <el-select v-model="form.filters[1].value" clearable>
          <el-option v-for="item in customerListserch" :key="item.name" :label="item.value" :value="item.name" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{
          $t("common.search")
        }}</el-button>
        <el-button type="default" icon="el-icon-refresh" @click="handleReset">{{
          $t("common.reset")
        }}</el-button>
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="handleAddDialogOpen"
        >{{ $t("common.add") }}</el-button>
      </el-form-item>
    </el-form>
    <add-dialog ref="AddDialog" :is-show="isAddShow" :is-add="true" @close="handleAddDialogClose" />
  </div>
</template>

<script>
import AddDialog from './EditDialog'
import FeedbackApi from '@/api/feedback.js'

export default {
  components: { AddDialog },
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      customerListserch: [],
      isAddShow: false,
      isSortShow: false,
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
    this.custormerTypes()
  },
  methods: {
    async custormerTypes() {
      const resp = await FeedbackApi.titlegetlevel()
      if (resp.success) {
        resp.rows.unshift({ value: '全部', name: '' })
        this.customerListserch = resp.rows
      }
    },
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
    handleAddDialogOpen() {
      this.isAddShow = true
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
