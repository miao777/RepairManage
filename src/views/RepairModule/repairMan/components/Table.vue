<template>
  <div>
    <!-- 店员table数据 -->
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="tableData"
      :max-height="height"
      :empty-text="$t('common.empty')"
      :element-loading-text="$t('common.loading')"
      highlight-current-row
      border
      stripe
      fit
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      @row-click="handleRowClick"
    >
      <!-- 下拉框 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="right" inline class="demo-table-expand" label-width="150px" style="margin-left:-50px;">
            <div style="margin-bottom: -20px;">
              <el-form-item :label="$t('clerk.headerUrl') + '：'">
                <div v-if="props.row.user.headerUrl">
                  <a :key="props.row.user.headerUrl" :href="props.row.user.headerUrl" target="_blank" style="margin-left:20px;"><img :src="props.row.user.headerUrl" width="80px" height="80px"></a>
                </div>
                <div v-else>
                  <span><i class="el-icon-picture-outline" />{{ $t('common.noImgLoading') }}</span>
                </div>
              </el-form-item>
            </div>
            <div style="margin-bottom: -35px;">
              <el-form-item :label="$t('clerk.username') + '：'">
                <span>{{ props.row.user.username }}</span>
              </el-form-item>
            </div>
            <div style="margin-bottom: -35px;">
              <el-form-item :label="$t('clerk.name') + '：'">
                <span>{{ props.row.user.name }}</span>
              </el-form-item>
            </div>
            <div style="margin-bottom: -35px;">
              <el-form-item :label="$t('clerk.roleName') + '：'">
                <span>{{ props.row.user.roleName }}</span>
              </el-form-item>
            </div>
            <div style="margin-bottom: -35px;">
              <el-form-item :label="$t('clerk.sex') + '：'">
                <span>{{ props.row.user.sex_fmt }}</span>
              </el-form-item>
            </div>
            <div style="margin-bottom: -35px;">
              <el-form-item :label="$t('clerk.mobileNo') + '：'">
                <span>{{ props.row.user.mobileNo }}</span>
              </el-form-item>
            </div>
            <div style="margin-bottom: -35px;">
              <el-form-item :label="$t('clerk.email') + '：'">
                <span>{{ props.row.user.email }}</span>
              </el-form-item>
            </div>
            <div style="margin-bottom: -35px;">
              <el-form-item :label="$t('clerk.status') + '：'">
                <span>{{ props.row.user.status_fmt }}</span>
              </el-form-item>
            </div>
            <div style="margin-bottom: -35px;">
              <el-form-item :label="$t('clerk.signIn') + '：'">
                <span>{{ props.row.user.isSignIn ? $t('clerk.signInTrue') : $t('clerk.signInFalse') }}</span>
              </el-form-item>
            </div>
          </el-form>
        </template>
      </el-table-column>
      <!-- 头像 -->
      <el-table-column prop="image" label="头像" width="80px" align="center">
        <template slot-scope="scope">
          <el-image :class="scope.row.user.headerUrl ? 'table-image-size' : ''" :src="scope.row.user.headerUrl" :preview-src-list="scope.row.previewImage" fit="cover">
            <div v-if="!scope.row.user.headerUrl" slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />{{ $t('common.noImgLoading') }}
            </div>
          </el-image>
        </template>
      </el-table-column>
      <!-- 账户 -->
      <el-table-column prop="user.username" label="账户名" />
      <!-- 姓名 -->
      <el-table-column prop="user.name" label="姓名" />
      <!-- 电话 -->
      <el-table-column prop="user.mobileNo" label="电话" />
      <!-- 昵称 -->
      <el-table-column prop="user.nickname" label="昵称" />
      <!-- 身份证 -->
      <el-table-column prop="idCard" label="身份证" />
      <!-- 邮箱 -->
      <el-table-column prop="user.email" label="邮箱" />
      <!-- 角色 -->
      <el-table-column prop="user.role.key_fmt" label="角色" align="center" width="80" />
      <!-- 性别 -->
      <el-table-column prop="user.sex" label="性别" width="50" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.sex">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column prop="user.status_fmt" label="状态" align="center" width="50" />
      <!-- 状态操作 -->
      <el-table-column label="状态切换" prop="status" width="80" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#0fb336" @change="hanldeToggleStatus(scope.row)" />
        </template>
      </el-table-column>
      <!-- 创建时间 -->
      <el-table-column prop="user.createDate_fmt" label="创建时间" align="center" sortable />

      <el-table-column fixed="right" :label="$t('common.oper')" width="100px" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="$t('common.edit')" placement="top-start">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="handleUpdateBtn(scope.row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('common.delete')" placement="top-start">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDeleteBtn(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑店员dialog -->
    <edit-dialog
      :show.sync="dialogVisible"
      :dialog-title="dialogTitle"
      :data="dialogData"
      :role-data="roleData"
      @reloadTableData="handleReloadTableData"
    />
  </div>
</template>

<script>

import EditDialog from './EditDialog'
// import { remove } from '@/api/merchant/clerk'
import { MessageBox } from 'element-ui'
import('@/styles/upload.scss')

export default {
  name: 'Table',
  components: { EditDialog },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => { return [] }
    },
    roleData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedRow: {},
      dialogVisible: false,
      dialogData: {},
      dialogTitle: ''
    }
  },
  computed: {
    height() {
      return window.innerHeight - 170
    }
  },
  created() {
  },
  methods: {
    // 编辑按钮事件
    handleUpdateBtn(row) {
      this.dialogVisible = true
      this.dialogTitle = this.$t('common.edit')
      this.dialogData = Object.assign({}, row)
    },

    // 删除事件
    handleDeleteBtn(row) {
      MessageBox.confirm(this.$t('common.alert.delete'), this.$t('common.confirm'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.remove(row.id)
      }).catch(() => {})
    },

    // 点击一行事件
    handleRowClick(row, event, column) {
      this.selectedRow = row
      this.$refs.tableRef.toggleRowSelection(row)
    },

    // 将子组件重新加载table数据的方法传递到父组件
    handleReloadTableData() {
      this.$emit('reloadTableData')
    },
    //  async toggleStatus() {
    //   const resp = await toggleStatus(this.selectRow.id)
    //   if (!resp.success) {
    //     this.selectRow.status = !this.selectRow.status
    //     this.$forceUpdate()
    //   } else {
    //     this.$emit('search')
    //   }
    // },
    hanldeToggleStatus(row) {
      this.selectRow = row
      // this.toggleStatus()
    }

    // ----------------------------------------ajax----------------------------------------------
    /**
     * @description 删除店员
     * @param id 店员id
     */
    // async remove(id) {
    //   const resp = await remove(id)
    //   if (resp.success) {
    //     this.$emit('reloadTableData', 1)
    //   }
    // }
  }
}
</script>