<template>
  <div class="tinymce">
    <editor :id="tinymceId" v-model="content" :init="settings" @onChange="handleChange" />
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/print'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/spellchecker'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/code'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/save'
import 'tinymce/plugins/table'
// import 'tinymce/plugins/contextmenu' 核心包里包含了
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/emoticons/js/emojis.js'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/template'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/indent2em'
// import 'tinymce/plugins/textcolor' 核心包里包含了
// import 'tinymce/plugins/colorpicker' 核心包里包含了

import { Message } from 'element-ui'
import { uploadBase64 } from '@/api/upload'

export default {
  name: 'TinymceEditor',
  components: { Editor },
  props: {
    tinymceId: {
      type: String,
      default: 'tinymce'
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    data: {
      type: String,
      default: ''
    }
  },
  data() {
    var vue_editor = this
    return {
      settings: {
        // selector: '#tinymce',
        branding: false,
        language_url: './tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: './tinymce/skins/ui/oxide',
        theme: 'silver',
        skin: 'oxide',
        height: 300,
        plugins: [
          'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
          'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
          'save table directionality emoticons template paste indent2em'
        ],
        toolbar: ['insertfile undo redo | styleselect | bold italic strikethrough | alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent indent2em  | link mybutton image media | preview fullpage | forecolor backcolor emoticons | fullscreen'],
        font_formats: '宋体=宋体;微软雅黑=微软雅黑;黑体=黑体;仿宋=仿宋;楷体=楷体;隶书=隶书;幼圆=幼圆;Arial=arial,helvetica,sans-serif;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Tahoma=tahoma,arial,helvetica,sans-serif;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats',
        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'file, image, media',
        file_picker_callback(callback, value, meta) {
          vue_editor.hanldePicker(callback, value, meta)
        },
        init_instance_callback() {
          vue_editor.handleReady()
        }
      },
      content: ''
    }
  },
  mounted() {
    Object.assign(this.settings, this.$props.options)
  },
  methods: {
    hanldePicker(callback, value, meta) {
      const that = this
      var $input = document.createElement('input')
      $input.setAttribute('type', 'file')
      document.body.appendChild($input)
      $input.click()
      $input.onchange = function() {
        var file = this.files[0]
        if (Number(file.size) / 1024 / 1024 > 100) {
          Message.warning('上传的文件不能超过100M大小')
          return false
        }
        var reader = new FileReader()
        reader.onload = function() {
          var base64 = reader.result.split(',')[1]
          const loading = that.$loading({
            lock: true,
            text: '文件上传中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            customClass: 'loading-box'
          })
          uploadBase64({ fileName: file.name, content: base64 }).then(resp => {
            loading.close()
            if (resp.success) {
              if (meta.filetype === 'file') {
                callback(resp.data.fullPath, { text: file.name, title: file.name })
              } else if (meta.filetype === 'image') {
                callback(resp.data.fullPath, { alt: file.name, title: file.name })
              } else if (meta.filetype === 'media') {
                callback(resp.data.fullPath, { source2: resp.data.url, poster: '' })
              }
              that.$emit('picker', resp)
            }
            $input.parentNode.removeChild($input)
          })
        }
        reader.readAsDataURL(file)
      }
    },
    handleReady() {
      tinymce.activeEditor.setContent(this.$props.data)
      this.$emit('ready')
    },
    handleChange() {
      this.$emit('change', this.content)
    }
  }
}
</script>
<style>
.tox-silver-sink {
  z-index: 2300 !important;
}
.loading-box {
  z-index: 2400 !important;
}
</style>
