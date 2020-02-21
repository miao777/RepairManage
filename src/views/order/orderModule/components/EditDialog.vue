<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" @open="handleOpen">
    <el-form
      ref="form"
      :model="form"
      status-icon
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="价格" prop="price">
        <el-input v-model="form.price" type="text" placeholder="请输入价格" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="text" placeholder="请输入备注" />
      </el-form-item>
      <!-- 确定，删除按钮 -->
      <el-form-item class="form-footer" style="margin: 0">
        <el-button type="primary" icon="el-icon-check" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
        <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import orderApi from '@/api/order'
export default {
  components: { },
  props: {
    title: {
      type: String,
      default() {
        return this.$t('common.add')
      }
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    enterpriseId: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      roles: [],
      form: {
        orderProductId: '',
        price: '',
        remark: ''
      },
      rules: {
        price: [{ required: true, message: '请输入价格', trigger: 'blur,change' }],
        remark: [{ required: true, message: '请输入备注信息', trigger: 'blur,change' }]
      }
    }
  },
  created() {
  },
  methods: {
    async edit() {
      this.form.price = +this.form.price
      const resp = await orderApi.editPrice(this.enterpriseId, this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    handleOpen() {
      if (!this.$props.isAdd) {
        console.log(this.data)
        this.form.orderProductId = this.$props.data.id
        this.form.price = this.$props.data.price
        this.form.remark = this.$props.data.booking.remark
      }
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.edit()
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
