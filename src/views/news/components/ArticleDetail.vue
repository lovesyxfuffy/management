<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          发布
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="作者:" class="postInfo-container-item">
                    <el-input v-model="postForm.creator" :rows="1"  placeholder="请输入内容" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
          <el-input v-model="postForm.subtitle" :rows="1" type="textarea" class="article-textarea" autosize placeholder="请输入内容" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
        </el-form-item>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>

        <el-form-item prop="imgUrl" style="margin-bottom: 30px;" v-if="projectShow">
          <span>请上传一张业绩荣誉的封面图，用于列表展示。</span>
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
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import MDinput from "@/components/MDinput";
import Sticky from "@/components/Sticky"; // 粘性header组件
import { validURL } from "@/utils/validate";
import { fetchArticleById } from "@/api/article";
import { searchUser } from "@/api/remoteSearch";
import Warning from "./Warning";
import {
  CommentDropdown,
  PlatformDropdown,
  SourceUrlDropdown
} from "./Dropdown";
import { createArticle } from "@/api/article";
import dateFormat from "@/utils/dateFormat";

const defaultForm = {
  title: "", // 文章题目
  content: "", // 文章内容
  subtitle: "", // 文章摘要
  imgUrl: "", // 文章图片
  id: undefined,
  type: ""
};

export default {
  name: "ArticleDetail",
  components: {
    Tinymce,
    MDinput,
    Sticky,
    Warning,
    CommentDropdown,
    PlatformDropdown,
    SourceUrlDropdown
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error"
        });
        callback(new Error(rule.field + "为必传项"));
      } else {
        callback();
      }
    };
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback();
        } else {
          this.$message({
            message: "外链url填写不正确",
            type: "error"
          });
          callback(new Error("外链url填写不正确"));
        }
      } else {
        callback();
      }
    };
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        imgUrl: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: "blur" }]
      },
      tempRoute: {},
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      headers: {
          methods: 'post'
      }
    };
  },
  computed: {
    contentShortLength() {
      return this.postForm.subtitle.length;
    },
    lang() {
      return this.$store.getters.language;
    },
    projectShow() {
      if(this.$route.path.includes("project")) {
        return true
      } else if(this.$route.query.type) {
        if(this.$route.query.type.includes('精品')) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  watch: {
    $route(newVal) {
      this.postForm = Object.assign({}, defaultForm);
      // if (this.$route.path.includes("project") || this.$route.query.type.includes('精品')) {
      //   this.projectShow = true;
      // }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.query.id
      this.fetchData(id);
    } else {
      this.postForm = Object.assign({}, defaultForm);
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route);
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
    uploadSuccess(response, file, fileList) {
        this.fileList.push(response)
    },
    fetchData(id) {
      fetchArticleById(id)
        .then(response => {
          this.postForm = response.data;
          this.postForm.subtitle = response.data.subtitle || ''
          this.setTagsViewTitle();
        })
        .catch(err => {
          console.log(err);
        });
    },
    setTagsViewTitle() {
      const title = this.lang === "zh" ? "编辑文章" : "Edit Article";
      // const route = Object.assign({}, this.tempRoute, {
      //   title: `${title}-${this.postForm.id}`
      // });
      // this.$store.dispatch("tagsView/updateVisitedView", route);
    },
    submitForm() {
      // this.postForm.display_time = parseInt(this.display_time / 1000)
      if(!this.isEdit) {
        this.postForm.type = this.$route.name;
      }
      // this.postForm.type = this.$route.name;
      this.postForm.time = "";
      this.postForm.imgUrl = this.fileList[0]
      // this.postForm.time = dateFormat(new Date())
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true;
          createArticle(this.postForm).then(res => {
            if (res.status == 1) {
              this.$notify({
                title: "成功",
                message: "发布文章成功",
                type: "success",
                duration: 2000
              });
            } else {
              this.$message({
                message: res.message,
                type: "warning"
              });
            }
          });

          this.loading = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    draftForm() {
      if (
        this.postForm.content.length === 0 ||
        this.postForm.title.length === 0
      ) {
        this.$message({
          message: "请填写必要的标题和内容",
          type: "warning"
        });
        return;
      }
      this.$message({
        message: "保存成功",
        type: "success",
        showClose: true,
        duration: 1000
      });
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return;
        this.userListOptions = response.data.items.map(v => v.name);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
