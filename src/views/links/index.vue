<template>
    <el-main>
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item
            v-for="(link, index) in dynamicValidateForm.links"
            :label="'链接' + index"
            :key="link.key"
            :prop="'links.' + index + '.value'"
        >
            <el-input v-model="link.name" style="width: 20%; margin-right: 10px" placeholder="描述"></el-input>
            <el-input v-model="link.value" style="width: 50%; margin-right: 10px" placeholder="链接"></el-input>
            <el-button @click="handleRemove(link)">删除</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
            <el-button @click="addlink">新增链接</el-button>
        </el-form-item>
    </el-form>
    </el-main>
</template>

<script>
import {createArticle, fetchArticleByModel} from '@/api/article'
export default {
data() {
      return {
        dynamicValidateForm: {
          links: [{
            value: '',
            name: ''
          }]
        }
      };
    },
    created() {
      this.getLinks()
    },
    methods: {
      getLinks() {
        fetchArticleByModel('link').then((result) => {
          if(result.status == 1) {
            this.dynamicValidateForm.links = JSON.parse(result.data.content)
          }
        }).catch((err) => {
          
        });
      },
      submitForm(formName) {
        createArticle({
          content: JSON.stringify(this.dynamicValidateForm.links),
          type: 'link'
        }).then((result) => {
          if(result.status == 1) {
              this.$notify({
                title: '成功',
                message: '新增链接成功',
                type: 'success',
                duration: 2000
              })
            } else  {
              this.$message({
                message: res.message,
                type: 'warning'
              })
            }
        }).catch((err) => {
          
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleRemove(item) {
        var index = this.dynamicValidateForm.links.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.links.splice(index, 1)
        }
      },
      addlink() {
        this.dynamicValidateForm.links.push({
          value: '',
          key: Date.now()
        });
      }
    }
}
</script>

<style>

</style>
