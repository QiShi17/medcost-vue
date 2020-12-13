<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="userTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="审核人编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.reviewerIdNum}}</template>
        </el-table-column>
        <el-table-column label="审核人姓名" align="center">
          <template slot-scope="scope">{{scope.row.reviewerRealName}}</template>
        </el-table-column>
        <el-table-column label="审核数" width="160" align="center">
          <template slot-scope="scope">{{scope.row.tcount}}</template>
        </el-table-column>
        <el-table-column label="审核错误数" width="160" align="center">
          <template slot-scope="scope">{{scope.row.mcount}}</template>
        </el-table-column>
        <el-table-column label="错误率" width="160" align="center">
          <template slot-scope="scope">{{scope.row.percent}}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :current-page.sync="listQuery.pageNum"
          :page-size="listQuery.pageSize"
          :page-sizes="[10,15,20]"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import {FetchReviewResultStatisticList} from '@/api/reviewerExpenseAccountRelation';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null
};

export default {
  name: "reviewResultStatistic",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false
    }
  },
  created() {
    this.FetchReviewResultStatisticList();
  },
  methods: {
    FetchReviewResultStatisticList(){
      this.listLoading=true;
      FetchReviewResultStatisticList(this.listQuery).then(response=>{
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    }
  }
}

</script>

<style scoped>

</style>