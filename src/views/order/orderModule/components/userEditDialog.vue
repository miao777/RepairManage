<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-form ref="forms" :model="forms" status-icon :rules="rules" label-width="100px">
      <el-form-item label="类型" prop="categoryId">
        <el-cascader
          v-model="values"
          placeholder="试试搜索"
          :options="options"
          filterable
          @change="handleChange"
        />
      </el-form-item>

      <el-form-item label="管理员头像" prop="headerUrl">
        <Uploader ref="uploader" :image="forms.headerUrl" @on-success="handleUploadSuccess" />
      </el-form-item>
      <el-form-item label="评估价格" prop="price">
        <el-input v-model="forms.price" type="text" placeholder="请输入评估价格" />
      </el-form-item>
      <el-form-item class="form-footer" style="margin: 0">
        <el-button type="primary" icon="el-icon-check" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
        <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import CategoryApi from '@/api/category'
import SubclassApi from '@/api/subclass'
import RepairItemApi from '@/api/repairItem'
import Uploader from '@/components/Uploader'
import BookingApi from '@/api/booking'
export default {
  components: { Uploader },
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
    },
    enterpriseId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      values: [],
      showParent: false,
      enterpriseststus: [],
      editId: '',
      forms: {
        id: '',
        categoryId: '',
        images: [],
        itemId: '',
        subclassId: '',
        price: '',
        headerUrl: ''
      },
      rules: {
        price: [{ required: true, message: '评估价格不能为空', trigger: 'blur' }]
      },
      searchForms: {
        page: { page: 0, size: 1000 }
      },
      subclassSearchForm: {
        page: { page: 0, size: 1000 }
      },
      searchFormsrepairt: {
        page: { page: 0, size: 1000 }
      },
      options: []
    }
  },
  created() {
    this.custormerTypess()
  },
  methods: {
    // 维修项目
    async repairItemList() {
      const resp = await RepairItemApi.page(this.searchFormsrepairt)
      if (resp.success) {
        this.options.map(item => {
          item.children.map(i => {
            i.children.map(k => {
              resp.rows.map(q => {
                const obj = {}
                if (k.value === q.subclass.id) {
                  obj.value = q.id
                  obj.label = q.name
                  k.children.push(obj)
                }
              })
            })
          })
        })
      }
    },
    // 维修小类
    async subclassFun() {
      const resp = await SubclassApi.page(this.subclassSearchForm)
      if (resp.success) {
        this.options.map(item => {
          item.children.map(i => {
            resp.rows.map(g => {
              const obj = {}
              if (g.category.id === i.value) {
                obj.value = g.id
                obj.label = g.name
                obj.children = []
                i.children.push(obj)
              }
            })
          })
        })
        this.repairItemList()
      }
    },
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
            obj.children = []
            Earr.push(obj)
          } else if (item.type === 'FAMILY') {
            obj.value = item.id
            obj.label = item.name
            obj.children = []
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
        this.subclassFun()
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
    handleUploadSuccess(resp) {
      this.forms.images = [resp.data.id]
    },
    async addMenu() {
      delete this.forms.id
      delete this.forms.headerUrl
      const resp = await BookingApi.addService(this.enterpriseId, this.forms)
      if (resp.success) {
        this.handleClose()
      }
    },
    async editMenu() {
      const resp = await BookingApi.edit(this.forms)
      if (resp.success) {
        this.handleClose()
      }
    },
    handleOpen() {
      if (!this.$props.isAdd) {
        this.forms.id = this.$props.data.id
        this.forms.categoryId = this.$props.data.category.id
        this.forms.itemId = this.$props.data.item.id
        this.forms.subclassId = this.$props.data.subclass.id
        this.forms.price = this.$props.data.price
        this.forms.headerUrl = this.$props.data.images[0].fullPath
        this.values = [this.$props.data.booking.customerType, this.$props.data.category.id, this.$props.data.subclass.id, this.$props.data.item.id]
        this.$nextTick(() => {
          this.$refs.uploader.loadImage()
        })
      }
    },
    handleSubmit() {
      this.$refs.forms.validate(valid => {
        if (valid) {
          console.log(this.$props.isAdd, '1')
          this.$props.isAdd ? this.addMenu() : this.editMenu()
        }
      })
    },
    handleClose(done) {
      this.$refs.forms.resetFields()
      this.$refs.forms.clearValidate()
      this.values = []
      this.forms.headerUrl = ''
      this.forms.images = []
      this.$emit('close')
    },
    handleChange(value) {
      this.forms.categoryId = value[1]
      this.forms.subclassId = value[2]
      this.forms.itemId = value[3]
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
</style>
