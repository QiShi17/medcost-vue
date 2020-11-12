<template>
    <div class="app-container">
        <account-list>
            <el-card class="filter-container" shadow="never">
                <div>
                    <i class="el-icon-search"></i>
                    <span>筛选搜索</span>
                    <el-button
                            style="float:right"
                            type="primary"
                            @click="handleSearchList()"
                            size="small">
                        查询搜索
                    </el-button>
                    <el-button
                            style="float:right;margin-right: 15px"
                            @click="handleResetSearch()"
                            size="small">
                        重置
                    </el-button>
                </div>
                <div style="margin-top: 15px">
                    <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                        <el-form-item label="输入搜索：">
                            <el-input v-model="listQuery.keyword" class="input-width" placeholder="帐号/姓名" clearable></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
            <el-card class="operate-container" shadow="never">
                <i class="el-icon-tickets"></i>
                <span>数据列表</span>
                <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
            </el-card>
            <div class="table-container">
                <el-table ref="userTable"
                          :data="list"
                          style="width: 100%;"
                          v-loading="listLoading" border>
                    <el-table-column label="编号" width="100" align="center">
                        <template slot-scope="scope">{{scope.row.id}}</template>
                    </el-table-column>
                    <el-table-column label="类型" align="center">
                        <template slot-scope="scope">{{scope.row.type | formatUserTypeThis}}</template>
                    </el-table-column>
                    <el-table-column label="帐号" align="center">
                        <template slot-scope="scope">{{scope.row.username}}</template>
                    </el-table-column>
                    <el-table-column label="姓名" align="center">
                        <template slot-scope="scope">{{scope.row.realname}}</template>
                    </el-table-column>
                    <el-table-column label="性别" align="center">
                        <template slot-scope="scope">{{scope.row.gender | formatGenderThis}}</template>
                    </el-table-column>
                    <el-table-column label="学院" align="center">
                        <template slot-scope="scope">{{scope.row.school}}</template>
                    </el-table-column>
                    <el-table-column label="专业" align="center">
                        <template slot-scope="scope">{{scope.row.major}}</template>
                    </el-table-column>
                    <el-table-column label="年级" align="center">
                        <template slot-scope="scope">{{scope.row.grade}}</template>
                    </el-table-column>
                    <el-table-column label="部门" align="center">
                        <template slot-scope="scope">{{scope.row.department}}</template>
                    </el-table-column>
                    <el-table-column label="添加时间" width="160" align="center">
                        <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
                    </el-table-column>
                    <el-table-column label="最后登录" width="160" align="center">
                        <template slot-scope="scope">{{scope.row.loginTime | formatDateTime}}</template>
                    </el-table-column>
                    <el-table-column label="修改时间" width="160" align="center">
                        <template slot-scope="scope">{{scope.row.updateTime | formatDateTime}}</template>
                    </el-table-column>
                    <el-table-column label="是否启用" width="140" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    @change="handleStatusChange(scope.$index, scope.row)"
                                    :active-value="1"
                                    :inactive-value="0"
                                    v-model="scope.row.status">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini"
                                       type="text"
                                       @click="handleSelectRole(scope.$index, scope.row)">分配角色
                            </el-button>
                            <el-button size="mini"
                                       type="text"
                                       @click="handleUpdate(scope.$index, scope.row)">
                                编辑
                            </el-button>
                            <el-button size="mini"
                                       type="text"
                                       @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
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
        </account-list>
    </div>

</template>

<script>
    import accountList from "../../../components/accountList";
    export default {
        name: "esDraftAccount",
        components:{accountList},
        list:null,
    }
</script>

<style scoped>

</style>
