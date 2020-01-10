<template>
  <div>
    <!-- dialog -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      top="5vh"
      width="55%"
      @open="handleOpen"
      @close="handleDialogClose('dialogFormRef')"
    >
      <el-form ref="dialogFormRef" :model="dialogForm" :rules="rules" label-position="right" label-width="180px">
        <el-form-item id="uploadImageId3" :label="$t('shop.image') + '：'">
          <Uploader ref="uploader" :image="dialogForm.image" @on-success="handleImageSuccess" />
        </el-form-item>
        <el-form-item :label="$t('shop.shopNo') + '：'" prop="shopNo">
          <el-input v-model.trim="dialogForm.shopNo" :placeholder="$t('common.please.enter') + $t('shop.shopNo')" />
        </el-form-item>
        <el-form-item :label="$t('shop.brand') + '：'" prop="brand">
          <el-input v-model.trim="dialogForm.brand" />
        </el-form-item>
        <el-form-item :label="$t('shop.contactPerson') + '：'">
          <el-input v-model.trim="dialogForm.contactPerson" clearable />
        </el-form-item>
        <el-form-item :label="$t('shop.contactPhone') + '：'">
          <el-input v-model.trim="dialogForm.contactPhone" clearable />
        </el-form-item>
        <el-form-item :label="$t('shop.mainBusiness') + '：'">
          <el-input v-model.trim="dialogForm.mainBusiness" clearable />
        </el-form-item>
        <el-form-item :label="$t('shop.isForeignTrade') + '：'">
          <el-tooltip :content="dialogForm.isForeignTrade ? $t('shop.foreignTradeTrue') : $t('shop.foreignTradeFalse')" placement="top">
            <el-switch
              v-model="dialogForm.isForeignTrade"
              class=""
            />
          </el-tooltip>
        </el-form-item>
        <el-form-item :label="$t('shop.address') + '：'">
          <el-input v-model.trim="dialogForm.address" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="dialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" icon="el-icon-check" :disabled="dialogBtnDisabled" @click="handleUpdate('dialogFormRef')">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import { addShop, editShop } from '@/api/shop'
import Uploader from '@/components/Uploader'
import { assignExistField } from '@/utils'

export default {
  name: 'EditDialog',
  components: { Uploader },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t('common.add')
      }
    },
    data: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      dialogBtnDisabled: false,
      dialogForm: {}
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    },
    // 校验规则
    rules() {
      return {
        shopNo: [{ required: true, message: this.$t('shop.rules.shopNo'), trigger: 'change' }],
        region: [{ required: true, message: this.$t('shop.rules.region'), trigger: 'change' }],
        brand: [{ required: true, message: this.$t('shop.rules.brand'), trigger: 'change' }]
      }
    }
  },
  created() {
  },
  methods: {
    // 打开时候处理数据
    handleOpen() {
      if (this.data.id) {
        assignExistField(this.$props.data, this.dialogForm)
      }
      this.$nextTick(() => {
        this.$refs.uploader.loadImage()
        this.$refs.uploader2.loadImage()
      })
    },

    // 处理上传成功之后的图片
    handleImageSuccess(data) {
      if (data && data.success) {
        this.dialogForm.image = data.data.url
      }
    },

    // dialog关闭事件
    handleDialogClose(formName) {
      this.$refs[formName].resetFields()
      this.$emit('dialogClose')
    },

    // 编辑事件
    handleUpdate(formName) {
      const params = this.dialogForm
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogBtnDisabled = true
          if (params.supervisers && params.supervisers.length === 1 && params.supervisers[0] == null) {
            params.supervisers = []
          }
          if (!params.merchant) {
            delete params.merchant
          }

          if (params.id) {
            this.editShop(params) // 调用编辑方法
          } else {
            if (!params.hasOwnProperty('isForeignTrade')) {
              params.isForeignTrade = false
            }
            this.addShop(params) // 新增方法
          }
        } else {
          return false
        }
      })
    },

    // --------------------------------------------ajxa-------------------------------------
    /**
     * @description 编辑
     * @param params 对象
     */
    async editShop(params) {
      const resp = await editShop(params)
      this.dialogBtnDisabled = false
      if (resp.success) {
        this.dialogVisible = false
        this.$emit('reloadTableData')
      }
    },

    /**
     * @description 新增
     * @param params 对象
     */
    async addShop(params) {
      const resp = await addShop(params)
      this.dialogBtnDisabled = false
      if (resp.success) {
        this.dialogVisible = false
        this.$emit('reloadTableData')
      }
    }

  }
}
</script>
