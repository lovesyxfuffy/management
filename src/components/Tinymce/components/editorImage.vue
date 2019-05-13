<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
         ref="upload"
            action="/manage/img/upload"
            accept="image/*"
            :file-list="fileList"
            :headers="headers"
            list-type="picture-card"
            :on-success="uploadSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
        <el-button size="small" type="primary">
          点击上传
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        取 消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确 定
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import _ from 'lodash'
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      listObj: {},
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      headers: {
          methods: 'post'
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
        _.remove(this.fileList, item => {
            return item === file.response
        })
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    handleSubmit() {
      console.log(this.fileList)
        this.$emit('successCBK', this.fileList)
    },
    uploadSuccess(response, file, fileList) {
        this.fileList.push(response)
    },
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    // handleSubmit() {
    //   const arr = Object.keys(this.listObj).map(v => this.listObj[v])
    //   if (!this.checkAllSuccess()) {
    //     this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
    //     return
    //   }
    //   this.$emit('successCBK', arr)
    //   this.listObj = {}
    //   this.fileList = []
    //   this.dialogVisible = false
    // },
    // handleSuccess(response, file) {
    //   console.log(response)
    //   console.log(file)
    //   const uid = file.uid
    //   const objKeyArr = Object.keys(this.listObj)
    //   for (let i = 0, len = objKeyArr.length; i < len; i++) {
    //     if (this.listObj[objKeyArr[i]].uid === uid) {
    //       this.listObj[objKeyArr[i]].url = response.files.file
    //       this.listObj[objKeyArr[i]].hasSuccess = true
    //       return
    //     }
    //   }
    // },
    // handleRemove(file) {
    //   const uid = file.uid
    //   const objKeyArr = Object.keys(this.listObj)
    //   for (let i = 0, len = objKeyArr.length; i < len; i++) {
    //     if (this.listObj[objKeyArr[i]].uid === uid) {
    //       delete this.listObj[objKeyArr[i]]
    //       return
    //     }
    //   }
    // },
    // beforeUpload(file) {
    //   const _self = this
    //   const _URL = window.URL || window.webkitURL
    //   const fileName = file.uid
    //   this.listObj[fileName] = {}
    //   return new Promise((resolve, reject) => {
    //     const img = new Image()
    //     img.src = _URL.createObjectURL(file)
    //     img.onload = function() {
    //       _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
    //     }
    //     resolve(true)
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
