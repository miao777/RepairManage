<template>
  <div>
    <el-table
      v-loading="loading"
      :data="data"
      :element-loading-text="$t('common.loading')"
      :empty-text="$t('common.empty')"
      border
      stripe
      fit
      :max-height="height"
      highlight-current-row
      @sort-change="handleSort"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="multiple" type="selection" width="35" />
      <el-table-column align="center" type="index" width="35" class-name="table-detail" />
      <el-table-column type="expand" width="35" class-name="table-detail">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-detail-expand">
            <el-form-item :label="$t('role.name') + '：'">
              <span>{{ props.row.roleName }}</span>
            </el-form-item>
            <el-form-item :label="$t('user.username') + '：'">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item :label="$t('user.name') + '：'">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item :label="$t('user.headerUrl') + '：'">
              <el-image :class="props.row.headerUrl ? 'table-image-size' : ''" :src="props.row.headerUrl" :preview-src-list="props.row.headerUrls" fit="cover">
                <div v-if="!props.row.headerUrl" slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" />{{ $t('common.notLoading') }}
                </div>
              </el-image>
            </el-form-item>
            <el-form-item :label="$t('user.mobileNo') + '：'">
              <span>{{ props.row.mobileNo }}</span>
            </el-form-item>
            <el-form-item :label="$t('user.email') + '：'">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item :label="$t('user.sex') + '：'">
              <span>{{ props.row.sex_fmt }}</span>
            </el-form-item>
            <el-form-item :label="$t('user.createDate') + '：'">
              <span>{{ props.row.createDate_fmt }}</span>
            </el-form-item>
            <el-form-item :label="$t('user.lastLoginTime') + '：'">
              <span>{{ props.row.lastModifiedDate_fmt }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.headerUrl')" prop="headerUrl">
        <template slot-scope="scope">
          <el-image :class="scope.row.headerUrl ? 'table-image-size' : ''" :src="scope.row.headerUrl" :preview-src-list="scope.row.headerUrls" fit="cover">
            <div v-if="!scope.row.headerUrl" slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />{{ $t('common.notLoading') }}
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.username')" prop="username" sortable />
      <el-table-column :label="$t('user.name')" prop="name" sortable />
      <el-table-column :label="$t('user.sex')" prop="sex_fmt" width="50" />
      <el-table-column :label="$t('user.mobileNo')" prop="mobileNo" sortable />
      <el-table-column :label="$t('role.name')" prop="roleName" />
      <el-table-column :label="$t('user.status')" prop="status_fmt">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#0fb336" @change="hanldeToggleStatus(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.blacklist')" prop="blacklist">
        <template slot-scope="scope">
          <div v-if="scope.row.blacklist && scope.row.blacklist.length > 0" :gutter="20">
            <span style="margin-right: 10px;">{{ scope.row.blacklist.length }}个</span>
            <span :span="12"><el-link :underline="false" @click="handleShowBlacklist(scope.row)">查看<i class="el-icon-view el-icon--right" /></el-link></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.createDate')" prop="createDate_fmt" sortable />
      <el-table-column>
        <template slot-scope="scope">
          <el-tooltip :content="$t('common.edit')" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleEditDialogOpen(scope.row)" />
          </el-tooltip>
          <el-tooltip :content="$t('user.resetPwd')" placement="top">
            <el-button type="warning" icon="el-icon-s-tools" circle @click="handleresetPwd(scope.row)" />
          </el-tooltip>
          <el-tooltip :content="$t('common.delete')" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDetele(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <edit-dialog ref="EditDialog" :is-show="isEditShow" :title="$t('common.edit')" :is-add="false" :data="selectRow" @close="handleEditDialogClose" />
  </div>
</template>

<script>
import EditDialog from './EditDialog'
import { MessageBox } from 'element-ui'
import { remove, toggleStatus, resetPwd, showBlacklist } from '@/api/user'

export default {
  name: 'UserTable',
  components: { EditDialog },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    multiple: {
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
    async toggleStatus() {
      const resp = await toggleStatus(this.selectRow.id)
      if (!resp.success) {
        this.selectRow.status = !this.selectRow.status
        this.$forceUpdate()
      }
    },
    async resetPwd() {
      const resp = await resetPwd(this.selectRow.id)
      if (resp.success) {
        MessageBox.alert('密码已重置为：' + resp.data, this.$t('common.info'))
      }
    },
    async showBlacklist() {
      const resp = await showBlacklist(this.selectRow.id)
      if (resp.success) {
        const html = resp.rows.map(row => {
          return '<div>' + row.username + '   ' + row.name + '</div>'
        }).join('')
        MessageBox.alert(html, this.$t('common.detail'), {
          dangerouslyUseHTMLString: true,
          customClass: 'message-box-detail'
        })
      }
    },
    async delete() {
      const resp = await remove(this.selectRow.id)
      if (resp.success) {
        this.$emit('search')
      }
    },
    handleSort({ column, prop, order }) {
      let sort = {}
      if (order) {
        sort = { field: prop.replace('_fmt', ''), order: 'asc' }
        if (order === 'descending') {
          sort.order = 'desc'
        }
      }
      this.$emit('sort', sort)
    },
    handleEditDialogOpen(row) {
      this.selectRow = row
      this.isEditShow = true
    },
    handleDetele(row) {
      this.selectRow = row
      MessageBox.confirm(this.$t('common.alert.delete'), this.$t('common.please.confirm'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.delete()
      }).catch(() => {})
    },
    handleEditDialogClose() {
      this.isEditShow = false
      this.$emit('search')
    },
    handleSelectionChange(rows) {
      this.$emit('selection-change', rows)
    },
    hanldeToggleStatus(row) {
      this.selectRow = row
      this.toggleStatus()
    },
    handleresetPwd(row) {
      this.selectRow = row
      MessageBox.confirm(this.$t('user.resetPwdInfo'), this.$t('user.resetPwd'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.resetPwd()
      }).catch(() => {})
    },
    handleShowBlacklist(row) {
      this.selectRow = row
      this.showBlacklist()
    }
  }
}
</script>
