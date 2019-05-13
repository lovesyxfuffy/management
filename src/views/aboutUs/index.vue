<template>
    <el-main>
        <el-select v-model="value" placeholder="请选择" v-show="$route.path.includes('about')" @change="handleChangeType">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <div style="margin-top: 10px" >
            <article-detail :is-edit="false" :isEdit="true" />
        </div>
    </el-main>
</template>

<script>
import ArticleDetail from './components/ArticleDetail'

export default {
    components: { ArticleDetail },
    data() {
        return {
            editor: false,
            content:'',
            options: [
                {
                    value: 'profile',
                    label: '公司简介'
                },
                {
                    value: 'title',
                    label: '企业资质'
                },
                {
                    value: 'culture',
                    label: '企业文化'
                },
                {
                    value: 'speech',
                    label: '公司致辞'
                }
            ],
            value: 'profile'
        }
    },
    watch: {
        $route(newVal) {
            if(this.$route.path.includes('about') && !this.$route.query.type) {
                this.value = 'profile'
            }
        }
    },
    created() {
        if(this.$route.path.includes('about')) {
            this.$router.push({
                query: {
                    type: this.value
                }
            })
        }
    },
    methods: {
        handleChangeType(item) {
            this.value = item
            this.$router.push({
            query: {
                type: this.value
            }
        })
        }
    }
}
</script>

<style>

</style>
