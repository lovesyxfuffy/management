<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column> -->

      <el-table-column  align="center" label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="副标题">
        <template slot-scope="scope">
          <span>{{ scope.row.subtitle }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.creator }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column min-width="300px" label="title">
        <template slot-scope="{row}">
          <router-link :to="'/example/edit/'+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column> -->

      <el-table-column  align="center" label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time  }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="toEdit(scope.row.type, scope.row.id)">
            编辑
          </el-button>
          <el-button  size="small" icon="el-icon-delete" @click="handleDel(scope.row.type, scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList, delArticle } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        model:  this.$route.name.split('List')[0]
      }
    }
  },
  watch: {
    $route() {
      this.getList()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listQuery.model = this.$route.name.split('List')[0]
      this.listLoading = true
      this.list = []
      fetchList(this.listQuery).then(response => {
        for(let item of response.data.body) {
          this.list.push(item)
        }
        this.total = response.data.page.total
        this.listLoading = false
      })
    },
    toEdit(type, id) {
      this.$router.push({
        name: 'Edit',
        query: {
          type: type,
          id: id
        }
      })
    },
    handleDel(type, id) {
      delArticle(id).then(response => {
        if(response.status === 1) {
          this.$message.success('删除成功！')
          this.getList()
        }
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
