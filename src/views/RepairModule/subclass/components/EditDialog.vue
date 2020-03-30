<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px">
      <el-form-item label="类型" prop="categoryId">
        <el-cascader
          v-model="values"
          placeholder="试试搜索"
          :options="options"
          filterable
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="小类名称" prop="name">
        <el-input v-model="form.name" type="text" :placeholder="$t('common.please.enter') + '小类名称'" />
      </el-form-item>
      <el-form-item label="排序" prop="sortNo">
        <!-- <el-input v-model="form.sortNo" type="tel" :placeholder="$t('common.please.enter') + '排序'" /> -->
        <el-input-number v-model="form.sortNo" :min="0" :step="1" step-strictly label="排序" />
      </el-form-item>
      <el-form-item class="form-footer" style="margin: 0">
        <el-button type="primary" icon="el-icon-check" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
        <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { assignExistField } from '@/utils'
import CategoryApi from '@/api/category'
import SubclassApi from '@/api/subclass'
export default {
  props: {
    title: {
      type: String,
      default: '新增'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      values: [],
      form: {
        id: '',
        categoryId: '',
        name: '',
        sortNo: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur,change' }],
        sortNo: [{ required: true, message: '请填写顺序', trigger: 'blur,change' }],
        categoryId: [{ required: true, message: '请选择类型', trigger: 'blur,change' }]
      },
      searchForms: {
        page: { page: 0, size: 1000 }
      },
      options: []
    }
  },
  created() {
    this.custormerTypess()
  },
  methods: {
    // 维修分类
    async categoryList() {
      const resp = await CategoryApi.page(this.searchForms)
      if (resp.success) {
        const Earr = []
        const Farr = []
        resp.rows.map(item => {
          const obj = {}
          if (item.type === 'ENTERPRISE') {
            obj.value = item.id
            obj.label = item.name
            Earr.push(obj)
          } else if (item.type === 'FAMILY') {
            obj.value = item.id
            obj.label = item.name
            Farr.push(obj)
          }
        })
        this.options.map(item => {
          if (item.value === 'ENTERPRISE') {
            item.children = Earr
          } else if (item.value === 'FAMILY') {
            item.children = Farr
          }
        })
      }
    },
    async custormerTypess() {
      const resp = await CategoryApi.custormerType()
      if (resp.success) {
        const arr = []
        resp.rows.map(item => {
          const obj = {}
          obj.value = item.name
          obj.label = item.value
          obj.children = []
          arr.push(obj)
        })
        this.options = arr
        this.categoryList()
      }
    },
    // 新增
    async addMenu() {
      delete this.form.id
      const resp = await SubclassApi.add(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    // 修改
    async editMenu() {
      const resp = await SubclassApi.edit(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    handleOpen() {
      if (!this.$props.isAdd) {
        console.log(this.$props.data, '11111222')
        assignExistField(this.$props.data, this.form)
        this.form.categoryId = this.$props.data.category.id
        this.values = [this.$props.data.category.type, this.$props.data.category.id]
      }
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$props.isAdd ? this.addMenu() : this.editMenu()
        }
      })
    },
    handleClose(done) {
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
      this.values = []
      this.$emit('close')
    },
    handleChange(value) {
      this.form.categoryId = value[1]
    }
  }
}
</script>
<style>
    .icon-in-table {
        font-size: 18px;
        color: #f56c6c;
        margin-right: 5px;
    }
    .el-cascader--small{
        width: 100%;
    }
</style>
