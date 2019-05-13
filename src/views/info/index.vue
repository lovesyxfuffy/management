<template>
<el-main>
    <el-row>
        <el-col :span="15">
            <el-form ref="form" :model="form" label-width="120px" :rules="rules"> 
                <el-form-item label="企业动态视频" prop="headVideo">
                    <el-input v-model="form.headVideo"></el-input>
                </el-form-item>
                <el-form-item label="公司地址" prop="address">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="telephone">
                    <el-input v-model="form.telephone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="传真" prop="fax">
                    <el-input v-model="form.fax"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</el-main>
</template>

<script>
import {setInfo, getInfo} from '@/api/info'
export default {
    data() {
      return {
        form: {
            headVideo: '',
            address: '',
            telephone: '',
            email: '',
            fax: ''
        },
        rules: {
            address: [{ required: true, message: '地址不能为空',  trigger: 'blur'}],
            telephone: [
                { required: true, message: '联系电话不能为空',  trigger: 'blur'}
            ],
            email: [
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ],
            fax: [
                { required: true, message: '传真不能为空',  trigger: 'blur'}
            ],
            headVideo: [{ required: true, message: '不能为空',  trigger: 'blur'}]
        }
      }
    },
    created() {
        this.getInfo()
    },
    methods: {
        getInfo() {
            getInfo().then(res => {
                if(res.status == 1) {
                    this.form = {
                        headVideo: res.data.headVideo[0],
                        address: res.data.address[0],
                        telephone: res.data.telephone[0],
                        email: res.data.email[0],
                        fax: res.data.fax[0]
                    }
                }
            })
        },
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
              setInfo(this.form).then(res => {
                    if(res.status == 1) {
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        })
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'warning'
                        })
                    }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>

<style>

</style>
