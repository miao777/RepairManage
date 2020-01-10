<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="requestUrl"
      :headers="headers"
      :list-type="listType"
      :show-file-list="showFileList"
      :on-preview="onPreview"
      :on-change="onChange"
      :on-error="onError"
      :on-success="onSuccess"
      :before-upload="beforeUpload"
      :on-exceed="onExceed"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :limit="limit"
      :multiple="multiple"
      :file-list="imagesList"
      :disabled="disabled"
      :accept="accept"
    >
      <template v-if="listType === 'text'">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </template>
      <template v-if="listType === 'picture-card'">
        <i class="el-icon-plus" />
      </template>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
export default {
  name: 'Uploader',
  props: {
    action: {
      type: String,
      default: '/admin/image/upload'
    },
    image: {
      type: String,
      default: undefined
    },
    listType: {
      type: String,
      default: 'text'
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    types: {
      type: Array,
      default() {
        return ['jpg', 'gif', 'png', 'bmp', 'jpeg']
      }
    },
    limit: {
      type: Number,
      default: 5
    },
    limitSize: {
      type: String,
      default: '10M'
    },
    headers: {
      type: Object,
      default() {
        return {
          Authorization: getToken()
        }
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    imagesList: {
      type: Array,
      default: () => { return [] }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP'
    }
  },
  data() {
    return {
      requestUrl: process.env.VUE_APP_BASE_API + this.$props.action,
      imageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    loadImage() {
      this.imageUrl = this.$props.image
      this.$forceUpdate()
    },
    onSuccess(resp, file, fileList) {
      console.log('上传文件成功，返回内容', resp, fileList)
      console.log(process.env.VUE_APP_BASE_API)
      this.imageUrl = resp.data.url
      this.$emit('on-success', resp, fileList)
    },
    onPreview(file) {
      this.imageUrl = file.url
      this.dialogVisible = true
    },
    onChange(file, fileList) {
      this.$emit('on-change', file, fileList)
    },
    onError(err, file, fileList) {
      Message.error(JSON.stringify(err))
      this.$emit('on-error', err, file, fileList)
    },
    beforeUpload(file) {
      // 判断类型是不是我们需要的类型
      const type = file.type.substring(file.type.lastIndexOf('/') + 1, file.type.length)
      const isType = this.$props.types.indexOf(type) !== -1

      // 判断是否文件大小太大
      let isLimitSize = true
      const unit = this.$props.limitSize.substring(this.$props.limitSize.length - 1, this.$props.limitSize.length)
      const size = this.$props.limitSize.substring(0, this.$props.limitSize.length - 1)
      if (unit === 'M') {
        isLimitSize = file.size / 1024 / 1024 <= size
      } else if (unit === 'K') {
        isLimitSize = file.size / 1024 <= size
      } else {
        isLimitSize = file.size <= size
      }
      const result = this.$emit('before-upload', file)
      return isType && isLimitSize && result
    },
    beforeRemove(file, fileList) {
      this.$emit('before-remove', file, fileList)
    },
    handleRemove(file, fileList) {
      this.$emit('remove', file, fileList)
    },
    onExceed(files, fileList) {
      if (this.$props.listType !== 'text') {
        Message.warning('已超过最大上传数量（' + this.limit + '个）')
        this.$emit('on-exceed', files, fileList)
      }
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
