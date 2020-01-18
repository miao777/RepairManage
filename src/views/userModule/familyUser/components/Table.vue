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
      <el-table-column type="index" label="序号" align="center" width="40px" />
      <el-table-column type="expand" width="30" class-name="table-detail">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-detail-expand">
            <el-form-item :label="$t('user.headerUrl') + '：'">
              <el-image :class="props.row.user.headerUrl ? 'table-image-size' : ''" :src="props.row.user.headerUrl" :preview-src-list="[props.row.user.headerUrl]" fit="cover">
                <div v-if="!props.row.user.headerUrl" slot="error" class="image-slot"><i class="el-icon-picture-outline" />{{ $t('common.notLoading') }}</div>
              </el-image>
            </el-form-item>
            <el-form-item label="姓名">
              <span>{{ props.row.user.name }}</span>
            </el-form-item>
            <el-form-item label="账号">
              <span>{{ props.row.user.username }}</span>
            </el-form-item>
            <el-form-item label="昵称">
              <span>{{ props.row.user.nickname }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span v-if="props.row.user.sex">男</span>
              <span v-else>女</span>
            </el-form-item>
            <el-form-item label="电话">
              <span>{{ props.row.user.mobileNo }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.user.email }}</span>
            </el-form-item>
            <el-form-item label="角色">
              <span>{{ props.row.user.role.name }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ props.row.user.status_fmt }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.user.createDate_fmt }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-image :src="scope.row.user.headerUrl" :class="scope.row.user.headerUrl ? 'table-image-size' : ''">
            <div v-if="!scope.row.user.headerUrl" slot="error" class="image-slot"><i class="el-icon-picture-outline" />{{ $t('common.notLoading') }}</div>
          </el-image>
        </template>
      </el-table-column>
      <!-- 姓名 -->
      <el-table-column prop="user.name" label="姓名" min-width="110" />
      <!-- 账号 -->
      <el-table-column prop="user.username" label="登陆手机号" min-width="140" />
      <!-- 昵称 -->
      <el-table-column prop="user.nickname" label="昵称" min-width="140" />
      <!-- 性别 -->
      <el-table-column prop="nickname" label="性别" width="50" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.user.sex">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>
      <!-- 电话 -->
      <el-table-column prop="user.mobileNo" label="电话" min-width="120" align="center" />
      <!-- 邮箱 -->
      <el-table-column prop="user.email" label="邮箱" min-width="180" align="center" />
      <!-- 角色 -->
      <el-table-column prop="user.role.name" label="角色" min-width="160" align="center" />
      <!-- 状态 -->
      <el-table-column prop="user.status_fmt" label="状态" width="50" align="center" />
      <!-- 状态 -->
      <!-- <el-table-column label="状态切换" prop="status_fmt" width="100" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" active-color="#0fb336" @change="hanldeToggleStatus(scope.row)" />
                </template>
            </el-table-column> -->
      <!-- 创建时间 -->
      <el-table-column prop="user.createDate_fmt" label="创建时间" min-width="140" align="center" sortable />
    </el-table>
    <!-- <edit-dialog ref="EditDialog" :is-show="isEditShow" :title="$t('common.edit')" :is-add="false" :data="selectRow" @close="handleEditDialogClose" /> -->
  </div>
</template>

<script>
// import EditDialog from './EditDialog';
import ProvinceApi from '@/api/province'
import { MessageBox } from 'element-ui'
import { isEmpty } from '@/utils'
export default {
  // components: { EditDialog },
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
      isEditShow: false,
      selectRow: {}
    }
  },
  computed: {
    height() {
      return window.innerHeight - 170
    }
  },
  methods: {
    async deleteMenu() {
      const resp = await ProvinceApi.delete(this.selectRow.id)
      if (resp.success) {
        this.$emit('search')
      }
    },
    async change(row) {
      console.log(row)
      const res = await ProvinceApi.toggle(row.id)
      if (res.success) {
        this.$emit('search')
      }
    },
    handleEditDialogOpen(row) {
      this.selectRow = row
      this.isEditShow = true
    },
    handleDeteleMenu(row) {
      this.selectRow = row
      if (this.selectRow.level === 1 && !isEmpty(this.selectRow.children)) {
        MessageBox.confirm(this.$t('menu.deleteLevel1Menu'), this.$t('common.please.confirm'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            this.deleteMenu()
          })
          .catch(() => {})
      } else {
        MessageBox.confirm(this.$t('common.alert.delete'), this.$t('common.confirm'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        })
          .then(() => {
            this.deleteMenu()
          })
          .catch(() => {})
      }
    },
    handleEditDialogClose() {
      this.isEditShow = false
      this.$emit('search')
    }
  }
}
</script>
