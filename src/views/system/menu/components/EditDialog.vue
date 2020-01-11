<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-form
      ref="form"
      :model="form"
      status-icon
      :rules="rules"
      label-width="100px"
    >
      <el-form-item :label="$t('menu.level')" prop="level">
        <el-select v-model="form.level" :placeholder="$t('common.please.select') + $t('menu.level')" @change="handleChangeLevel">
          <el-option v-for="item in levels" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('menu.title')" prop="title">
        <el-input v-model="form.title" type="text" :placeholder="$t('common.please.enter') + $t('menu.title')" />
      </el-form-item>

      <el-form-item v-if="showParent" :label="$t('menu.parentId')" prop="parentId">
        <el-select v-model="form.parentId" :placeholder="$t('common.please.select') + $t('menu.parentId')">
          <el-option v-for="item in parents" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('menu.icon')" prop="icon">
        <el-select v-model="form.icon" filterable :placeholder="$t('common.please.select') + $t('menu.icon')">
          <el-option v-for="item in icons" :key="item" :label="item" :value="item">
            <i :class="item + ' icon-in-table'" />{{ item }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('menu.href')" prop="href">
        <el-input v-model="form.href" type="text" :placeholder="$t('common.please.enter') + $t('menu.href')" />
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
import menuApi from '@/api/menu'
import ElementIcon from '@/icons'

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
        level: 1,
        href: '',
        icon: '',
        parentId: '',
        title: ''
      },
      rules: {
        title: [{ required: true, message: '请输入菜单名', trigger: 'blur,change' }]
      }
    }
  },
  created() {

  },
  methods: {
    async addMenu() {
      delete this.form.id
      const resp = await menuApi.add(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    async editMenu() {
      const resp = await menuApi.edit(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    async loadParentMenu() {
      const resp = await menuApi.tree({ page: { page: 0, size: 1000, sorts: [{ field: 'sortNo', order: 'asc' }] }})
      if (resp.success) {
        this.parents = resp.rows
      }
    },
    handleOpen() {
      if (!this.$props.isAdd) {
        this.form = this.$props.data
      } else {
        this.handleChangeLevel()
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
