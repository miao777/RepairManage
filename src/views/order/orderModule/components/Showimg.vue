<template>
  <div>
    <!-- 企业登陆用户列表 -->
    <el-drawer :title="title" :visible.sync="drawerVisible" direction="rtl" size="80%" @open="handleOpen" @close="handleClose">
      <el-table :data="gridData" border :element-loading-text="$t('common.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column align="center" type="index" width="30" class-name="table-detail" />
        <!-- 图像 -->
        <el-table-column label="图片" width="130px">
          <template slot-scope="scope">
            <el-image :class="scope.row.img ? 'table-image-size' : ''" :src="scope.row.img" :preview-src-list="scope.row.imgarray" fit="cover">
              <div v-if="!scope.row.img" slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />{{ $t('common.noImgLoading') }}
              </div>
            </el-image>
          </template>
        </el-table-column>
        <!-- 维修进度 -->
        <el-table-column prop="orderStatus_fmt" label="维修进度" align="center" width="150" />
        <!-- 备注 -->
        <el-table-column prop="remark" label="备注" show-overflow-tooltip />
        <!-- 时间 -->
        <el-table-column prop="createDate_fmt" label="时间" align="center" width="160" />

      </el-table>
    </el-drawer>
    <!-- 修改 -->
  </div>
</template>

<script>
// import orderApi from '@/api/order'

export default {
  name: 'ShowMerchant',
  components: { },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default() {
        return '维修进度表'
      }
    },
    gridData: {
      type: Array,
      default: () => []
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
  watch: {
    show: val => {
      // console.log(val)
    }
  },
  created() {

  },
  methods: {
    // 打开事件
    handleOpen() {

    },
    handleClose() {

    }
  }
}
</script>
