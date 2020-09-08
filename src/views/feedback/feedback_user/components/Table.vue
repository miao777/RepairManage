<template>
  <div>
    <el-table
      ref="table"
      v-loading="loading"
      :data="data"
      :tree-props="{ children: 'children', hasChildren: 'children.length > 0' }"
      :element-loading-text="$t('common.loading')"
      :empty-text="$t('common.empty')"
      row-key="id"
      border
      stripe
      fit
      highlight-current-row
      :max-height="height"
    >
      <el-table-column type="index" label="#" align="center" width="40px" />
      <!-- 下拉框 -->
      <el-table-column type="expand" width="35" class-name="table-detail">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-detail-expands">
            <!-- 头像 -->
            <el-form-item label="头像">
              <el-image :class="props.row.icon ? 'table-image-size' : ''" :src="props.row.icon" :preview-src-list="props.row.iconarr" fit="cover">
                <div v-if="!props.row.icon" slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" />{{ $t('common.noImgLoading') }}
                </div>
              </el-image>
            </el-form-item>
            <el-form-item label="用户名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="电话">
              <span>{{ props.row.mobileNo }}</span>
            </el-form-item>
            <el-form-item label="反馈类型">
              <span>{{ props.row.title.title }}</span>
            </el-form-item>
            <el-form-item label="是否处理">
              <span>{{ props.row.status_fmt }}</span>
            </el-form-item>
            <el-form-item label="级别">
              <span>{{ props.row.title.level_fmt }}</span>
            </el-form-item>
            <br>
            <el-form-item label="反馈内容">
              <span>{{ props.row.content }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 图片 -->
      <el-table-column prop="image" label="图片" width="120">
        <template slot-scope="scope">
          <el-image :class="scope.row.icon ? 'table-image-size' : ''" :src="scope.row.icon" :preview-src-list="scope.row.iconarr" fit="cover">
            <div v-if="!scope.row.icon" slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />{{ $t('common.noImgLoading') }}
            </div>
          </el-image>
        </template>
      </el-table-column>
      <!-- 用户名 -->
      <el-table-column label="用户名" prop="name" width="130" align="center" />
      <!-- 电话 -->
      <el-table-column label="电话" prop="mobileNo" width="120" align="center" />
      <!-- 反馈类型 -->
      <el-table-column label="反馈类型" prop="title.title" width="190" align="center" />
      <!-- 反馈内容 -->
      <el-table-column label="反馈内容" prop="content" show-overflow-tooltip />
      <!-- 状态 -->
      <el-table-column label="状态" width="90" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" :disabled="!scope.row.status" active-color="#0fb336" @change="hanldeToggleStatus(scope.row)" />
        </template>
      </el-table-column>
      <!-- 是否处理 -->
      <el-table-column label="是否处理" prop="status_fmt" width="90" align="center" />
      <!-- 级别 -->
      <el-table-column label="级别" prop="title.level_fmt" width="90" align="center" />

      <!-- 操作 -->
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-tooltip :content="$t('common.delete')" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDeteleMenu(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import FeedbackApi from '@/api/feedback.js'
import { MessageBox } from 'element-ui'
export default {
  components: { },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectRow: {}
    }
  },
  computed: {
    height() {
      return window.innerHeight - 170
    }
  },
  methods: {
    // 删除
    async deleteMenu() {
      const resp = await FeedbackApi.feedbackdelete(this.selectRow.id)
      if (resp.success) {
        this.$emit('search')
      }
    },
    // 状态切换
    async adtoggleStatus(id) {
      const resp = await FeedbackApi.feedbackedit(id)
      if (resp.success) {
        this.$emit('search')
      }
    },
    handleDeteleMenu(row) {
      this.selectRow = row
      MessageBox.confirm(this.$t('common.alert.delete'), this.$t('common.confirm'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.deleteMenu()
      }).catch(() => {})
    },
    hanldeToggleStatus(row) {
      this.adtoggleStatus(row.id)
    }
  }
}
</script>
