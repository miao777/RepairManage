<template>
  <div>
    <el-form
      ref="form"
      :inline="true"
      :model="form"
      :rules="rules"
      class="demo-form-inline"
    >
      <el-form-item label="省份" prop="filters[0].value">
        <el-input v-model="form.filters[0].value" placeholder="输入省份" />
      </el-form-item>
      <el-form-item label="编码" prop="filters[1].value">
        <el-input v-model="form.filters[1].value" placeholder="输入编码" />
      </el-form-item>
      <el-form-item label="状态" prop="filters[2].value">
        <el-select v-model="form.filters[2].value">
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
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="handleAddDialogOpen"
        >{{ $t("common.add") }}</el-button>
      </el-form-item>
    </el-form>
    <AddDialogmap
      ref="AddDialog"
      :is-show="isAddShowmaps"
      :is-add="true"
      @close="handleAddDialogClose"
    />
  </div>
</template>

<script>
import AddDialogmap from './mapEditDialog'

export default {
  components: { AddDialogmap },
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isAddShowmaps: false,
      isSortShow: false,
      statuses: [
        { label: '全部', value: '' },
        { label: '是', value: true },
        { label: '否', value: false }
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
    handleAddDialogOpen() {
      this.isAddShowmaps = true
    },
    handleAddDialogClose() {
      this.isAddShowmaps = false
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
