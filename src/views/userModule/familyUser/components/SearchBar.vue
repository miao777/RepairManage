<template>
  <div>
    <el-form
      ref="form"
      :inline="true"
      :model="form"
      :rules="rules"
      class="demo-form-inline"
    >
      <el-form-item label="姓名">
        <div style="width:150px;">
          <el-input v-model="form.filters[0].value" :placeholder="$t('common.please.enter')+'名字'" size="small" clearable />
        </div>
      </el-form-item>
      <el-form-item label="登陆手机号">
        <div style="width:150px;">
          <el-input v-model="form.filters[1].value" :placeholder="$t('common.please.enter')+'账号'" size="small" clearable />
        </div>
      </el-form-item>
      <el-form-item label="电话">
        <div style="width:150px;">
          <el-input v-model="form.filters[2].value" :placeholder="$t('common.please.enter')+'电话'" size="small" clearable />
        </div>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.filters[3].value" placeholder="请选择状态">
          <el-option v-for="item in statuses" :key="item.label" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="角色">
          <el-select v-model="form.filters[4].value" placeholder="请选择角色">
            <el-option v-for="item in enterpriseststuss" :key="item.id" :label="item.name" :value="item.key" />
          </el-select>
        </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">{{ $t('common.search') }}</el-button>
        <el-button size="small" icon="el-icon-refresh" @click="handleReset">{{ $t('common.reset') }}</el-button>
        <!-- <el-button type="success" icon="el-icon-plus" @click="handleAddDialogOpens">{{ $t("common.add") }}</el-button> -->
      </el-form-item>
    </el-form>
    <add-dialog
      ref="AddDialog"
      :is-show="isAddShow"
      :is-add="true"
      @close="handleAddDialogClose"
    />
  </div>
</template>

<script>
import AddDialog from './EditDialog'

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
      isAddShow: false,
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
