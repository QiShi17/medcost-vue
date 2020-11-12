<template> 
    <div class="app-container">
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
        <el-dialog
                :title="isEdit?'编辑用户':'添加用户'"
                :visible.sync="dialogVisible"
                width="40%">
            <el-form :model="user"
                     ref="userForm"
                     label-width="150px" size="small">
                <el-form-item label="类型：">
                    <el-select v-model="user.type" placeholder="请选择" size="small" style="width: 80%">
                        <el-option
                                v-for="item in userTypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="帐号：">
                    <el-input v-model="user.username" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item label="姓名：">
                    <el-input v-model="user.realname" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input v-model="user.password"  type="password" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item label="性别：">
                    <el-select v-model="user.gender" placeholder="请选择" size="small" style="width: 80%">
                        <el-option
                                v-for="item in genderList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <template v-if="user.type===1">
                    <el-form-item label="学院：">
                        <el-input v-model="user.school" style="width: 250px"></el-input>
                    </el-form-item>
                    <el-form-item label="专业：">
                        <el-input v-model="user.major" style="width: 250px"></el-input>
                    </el-form-item>
                    <el-form-item label="年级：">
                        <el-input v-model="user.grade" style="width: 250px"></el-input>
                    </el-form-item>
                </template>
                <template v-if="user.type===0">
                    <el-form-item label="部门：">
                        <el-input v-model="user.department" style="width: 250px"></el-input>
                    </el-form-item>
                </template>

            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
        </el-dialog>
        <el-dialog
                title="分配角色"
                :visible.sync="allocDialogVisible"
                width="30%">
            <el-select v-model="allocRoleIds" multiple placeholder="请选择" size="small" style="width: 80%">
                <el-option
                        v-for="item in allRoleList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
        <el-button @click="allocDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleAllocDialogConfirm()" size="small">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script>
    import {fetchList,createUser,updateUser,updateStatus,deleteUser,getRoleByUser,allocRole} from '@/api/login';
    import {fetchAllRoleList} from '@/api/role';
    import {formatDate} from '@/utils/date';
    import {formatGender,getAllGenders} from '@/utils/gender';
    import {formatUserType,getAllUserTypes} from '@/utils/userType';

    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        keyword: null
    };
    const defaultUser = {
        id: null,
        username: null,
        password: null,
        realname: null,
        email: null,
        note: null,
        status: 1
    };
    export default {
        name: 'userList',
        data() {
            return {
                listQuery: Object.assign({}, defaultListQuery),
                list: null,
                total: null,
                listLoading: false,
                dialogVisible: false,
                user: Object.assign({}, defaultUser),
                isEdit: false,
                allocDialogVisible: false,
                allocRoleIds: [],
                allRoleList: [],
                allocUserId: null,
                userTypeList: getAllUserTypes(),
                genderList: getAllGenders()
            }
        },
        created() {
            this.getList();
            this.getAllRoleList();
        },
        filters: {
            formatDateTime(time) {
                if (time == null || time === '') {
                    return 'N/A';
                }
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            },
            formatGenderThis(gender) {
                if (gender == null || gender === '') {
                    return 'N/A';
                }
                return formatGender(gender)
            },
            formatUserTypeThis(type) {
                if (type == null || type === '') {
                    return 'N/A';
                }
                return formatUserType(type)
            },

        },
        methods: {
            handleResetSearch() {
                this.listQuery = Object.assign({}, defaultListQuery);
            },
            handleSearchList() {
                this.listQuery.pageNum = 1;
                this.getList();
            },
            handleSizeChange(val) {
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getList();
            },
            handleAdd() {
                this.dialogVisible = true;
                this.isEdit = false;
                this.user = Object.assign({}, defaultUser);
            },
            handleStatusChange(index, row) {
                this.$confirm('是否要修改该状态?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // updateStatus(row.id, {status: row.status}).then(response => {
                    //     this.$message({
                    //         type: 'success',
                    //         message: '修改成功!'
                    //     });
                    // });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消修改'
                    });
                    this.getList();
                });
            },
            handleDelete(index, row) {
                this.$confirm('是否要删除该用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // deleteUser(row.id).then(response => {
                    //     this.$message({
                    //         type: 'success',
                    //         message: '删除成功!'
                    //     });
                    //     this.getList();
                    // });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });
                    this.getList();
                });
            },
            handleUpdate(index, row) {
                this.dialogVisible = true;
                this.isEdit = true;
                this.user = Object.assign({}, row);
            },
            handleDialogConfirm() {
                this.$confirm('是否要确认?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (this.isEdit) {
                        updateUser(this.user.id, this.user).then(response => {
                            this.$message({
                                message: '修改成功！',
                                type: 'success'
                            });
                            this.dialogVisible = false;
                            this.getList();
                        })
                    } else {
                        createUser(this.user).then(response => {
                            this.$message({
                                message: '添加成功！',
                                type: 'success'
                            });
                            this.dialogVisible = false;
                            this.getList();
                        })
                    }
                })
            },
            handleAllocDialogConfirm() {
                this.$confirm('是否要确认?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = new URLSearchParams();
                    params.append("userId", this.allocUserId);
                    params.append("roleIds", this.allocRoleIds);
                    allocRole(params).then(response => {
                        this.$message({
                            message: '分配成功！',
                            type: 'success'
                        });
                        this.allocDialogVisible = false;
                    })
                })
            },
            handleSelectRole(index, row) {
                this.allocUserId = row.id;
                this.allocDialogVisible = true;
                this.getRoleListByUser(row.id);
            },
            getList() {
                this.listLoading = true;
                fetchList(this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.data.list;
                    this.total = response.data.total;
                });
            },
            getAllRoleList() {
                fetchAllRoleList().then(response => {
                    this.allRoleList = response.data;
                });
            },
            getRoleListByUser(userId) {
                getRoleByUser(userId).then(response => {
                    let allocRoleList = response.data;
                    this.allocRoleIds = [];
                    if (allocRoleList != null && allocRoleList.length > 0) {
                        for (let i = 0; i < allocRoleList.length; i++) {
                            this.allocRoleIds.push(allocRoleList[i].id);
                        }
                    }
                });
            }
        }
    }
</script>
<style></style>
