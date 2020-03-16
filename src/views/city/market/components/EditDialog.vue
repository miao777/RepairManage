<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-form
      ref="form"
      :model="form"
      status-icon
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="省份" prop="provinceId">
        <el-select v-model="form.provinceId" placeholder="选择省份" @change="handleChangeLevel">
          <el-option v-for="item in parents" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="name">
        <el-input v-model="form.name" type="text" placeholder="请输入城市" />
      </el-form-item>

      <el-form-item label="编码" prop="code">
        <el-input v-model="form.code" type="text" placeholder="请输入城市编码" />
      </el-form-item>

      <el-form-item class="form-footer" style="margin: 0">
        <el-button type="primary" icon="el-icon-check" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
        <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// import { tree, add, edit } from '@/api/menu'
import ElementIcon from '@/icons'
import ProvinceApi from '@/api/province'
import CityApi from '@/api/city'
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
      levels: [{
        label: this.$t('menu.title1'),
        value: 1
      }, {
        label: this.$t('menu.title2'),
        value: 2
      }],
      parents: [],
      icons: ElementIcon,
      showParent: false,
      form: {
        id: '',
        name: '',
        code: '',
        provinceId: ''
      },
      rules: {
        name: [{ required: true, message: '请输入城市', trigger: 'blur,change' }],
        code: [{ required: true, message: '请输入城市编码', trigger: 'blur,change' }],
        provinceId: [{ required: true, message: '请选择省级', trigger: 'blur,change' }]
      }
    }
  },
  created() {
    this.handleChangeLevel()
  },
  methods: {
    async addMenu() {
      delete this.form.id
      const resp = await CityApi.add(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    async editMenu() {
      const resp = await CityApi.edit(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    handleOpen() {
      // this.handleChangeLevel()
      if (!this.$props.isAdd) {
        this.form.provinceId = this.$props.data.id
        this.form = this.$props.data
      }
    },
    handleChangeLevel() {
      if (this.form.level === 1) {
        this.showParent = false
        this.form.parentId = ''
      } else {
        this.showParent = true
        if (this.parents.length === 0) {
          this.loadParentMenu()
        }
      }
    },
    async loadParentMenu() {
      const resp = await ProvinceApi.page({ page: { page: 0, size: 1000 }})
      if (resp.success) {
        this.parents = resp.rows
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
      this.$emit('close')
    }
  }
}
</script>
<style>
.icon-in-table {
  font-size:18px;
  color:#F56C6C;
  margin-right: 5px;
}
</style>
