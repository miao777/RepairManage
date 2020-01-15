<template>
  <div>
    <!-- 用户地址管理 -->
    <el-drawer
      :title="title"
      :visible.sync="drawerVisible"
      direction="rtl"
      size="80%"
      @open="handleOpen"
      @close="handleClose"
    >
      <div>地图</div>
    </el-drawer></div>
</template>

<script>

// import { MessageBox } from 'element-ui'

export default {
  name: 'ShowMerchant',
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default() {
        return '用户地址管理'
      }
    },
    shopId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  computed: {
    drawerVisible: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  created() {
  },
  methods: {
    // 打开事件
    handleOpen() {
      this.enterpriseId = this.shopId
    },
    // 关闭事件
    handleClose() {
      this.pagination.totalCount = 0
      this.$emit('close')
    }
  }
}
</script>
