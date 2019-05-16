<template>
  <el-main>
      <el-row :gutter="20">
          <el-col :span="8" v-for="(item) in oldFileList" :key="item" style="margin: 10px 0">
            <el-card :body-style="{ padding: '0px' }">
            <img :src="item" class="image" style="height: 350px">
            <div style="padding: 14px;">
                <el-button type="text" class="button" @click="removeOldFile(item)">删除</el-button>
            </div>
            </el-card>
        </el-col>
      </el-row>
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
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-button style="margin-top: 10px" type="primary" @click="onSubmit" :disabled="fileList.concat(oldFileList).length == 0">提交</el-button>
  </el-main>
</template>

<script>
import { uploadImg, carsouleImg, getCarsouleImg } from '@/api/carousel'
import _ from 'lodash'
export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
            headers: {
                methods: 'post'
            },
            oldFileList: []
        };
    },
    created() {
        this.getCarsouleImg()
    },
    methods: {
        getCarsouleImg() {
            getCarsouleImg().then(result => {
                if(result.status === 1) {
                    this.oldFileList = result.data.concat()
                }
            })
        },
        handleRemove(file, fileList) {
            _.remove(this.fileList, item => {
                return item === file.response
            })
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        onSubmit() {
            carsouleImg(this.fileList.concat(this.oldFileList)).then((result) => {
                if(result.status == 1) {
                    this.$message({
                    message: '提交成功！',
                    type: 'success'
                    });
                    if (this.$refs.upload) {
                        this.$refs.upload.clearFiles()
                    }
                    this.getCarsouleImg()
                }
            }).catch((err) => {
                
            });
        },
        uploadSuccess(response, file, fileList) {
            this.fileList.push(response)
        },
        removeOldFile(data) {
            let index = this.oldFileList.indexOf(data)
            if(index != -1) {
                this.oldFileList.splice(index,1)
            }
        }
    }
}
</script>

<style scoped>

</style>
