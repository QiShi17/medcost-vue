<template> 
    <div class="app-container">
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
            <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
        </el-card>
        <div class="table-container">
            <el-table ref="userTable"
                      :data="myList"
                      style="width: 100%;"
                      v-loading="myListLoading" border>
                <el-table-column label="流水号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.serialNum}}</template>
                </el-table-column>
                <el-table-column label="报销类型" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="学工号" align="center">
                    <template slot-scope="scope">{{scope.row.username}}</template>
                </el-table-column>
                <el-table-column label="姓名" align="center">
                    <template slot-scope="scope">{{scope.row.realname}}</template>
                </el-table-column>
                <el-table-column label="病症" align="center">
                    <template slot-scope="scope">{{scope.row.disease}}</template>
                </el-table-column>
                <el-table-column label="挂号金额" align="center">
                    <template slot-scope="scope">￥{{scope.row.registFee}}</template>
                </el-table-column>
                <el-table-column label="发票金额" align="center">
                    <template slot-scope="scope">￥{{scope.row.invoiceFee}}</template>
                </el-table-column>
                <el-table-column label="总金额" align="center">
                    <template slot-scope="scope">￥{{Number(scope.row.invoiceFee)+Number(scope.row.registFee)}}</template>
                </el-table-column>
                <el-table-column label="审核历史" align="center" label-width="300px">
                    <template slot-scope="scope">
                        <template v-for="item in scope.row.reviewHistoryList">
                           {{item.createTime}}:审核人：{{item.reviewerName}} {{item.reviewerIdNum}}/审核意见：{{item.comment}}
                        </template>
                    </template>
                </el-table-column>

                <el-table-column label="提交时间" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                        <template  slot-scope="scope">
                            <el-button size="mini"
                                       type="text"
                                       @click="showId(scope.$index, scope.row)">
                                查看id
                            </el-button>
                            <el-button v-if="curOperations.indexOf('查看详情')>=0"
                                       size="mini"
                                       type="text"
                                       @click="handleShowDetails(scope.$index, scope.row)">
                                查看详情
                            </el-button>
                            <el-button v-if="curOperations.indexOf('收单')>=0"
                                       size="mini"
                                       type="text"
                                       @click="handleDeliver(scope.$index, scope.row)">
                                收单
                            </el-button>
                            <el-button v-if="curOperations.indexOf('编辑')>=0"
                                       size="mini"
                                       type="text"
                                       @click="handleUpdate(scope.$index, scope.row)">
                                编辑
                            </el-button>
                            <el-button v-if="curOperations.indexOf('提交')>=0"
                                       size="mini"
                                       type="text"
                                       @click="handleSubmit(scope.$index, scope.row)">
                                提交
                            </el-button>
                            <el-button v-if="curOperations.indexOf('撤销')>=0"
                                       size="mini"
                                       type="text"
                                       @click="handleRevoke(scope.$index, scope.row)">
                                撤销
                            </el-button>
                            <el-button v-if="curOperations.indexOf('拒绝')>=0"
                                       size="mini"
                                       type="text"
                                       @click="handleReject(scope.$index, scope.row)">
                                拒绝
                            </el-button>
                            <el-button v-if="curOperations.indexOf('同意')>=0"
                                       size="mini"
                                       type="text"
                                       @click="handleAgree(scope.$index, scope.row)">
                                同意
                            </el-button>
                        </template>
                </el-table-column>
            </el-table>
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
    import {createUser,updateUser,allocRole,getInfo} from '@/api/login';
    import {formatDate} from '@/utils/date';
    import {formatGender,getAllGenders} from '@/utils/gender';
    import {formatUserType,getAllUserTypes} from '@/utils/userType';
    import {deliver} from "@/api/expenseAccount";
    import {agreeExpenseAccountById,rejectExpenseAccountById,revokeExpenseAccountById} from '@/api/expenseAccount';

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
        name: "AccountList",
        props: {
            curOperations:{
                type:Array,
                default:()=>[]
            },
            myList:{
                type:Array,
                default:()=>[]
            },
            myListLoading:{
                type:Boolean,
                default:false,
            },
            myDialogVisible:{
                type:Boolean,
                default:false,
            }
        },
        created() {
            //获取当前页面的user属性
            this.getUser()
        },
        data() {
            return {
                user: Object.assign({}, defaultUser),
                isEdit: false,
                allocDialogVisible: false,
                allocRoleIds: [],
                allRoleList: [],
                allocUserId: null,
                userTypeList: getAllUserTypes(),
                genderList: getAllGenders(),
                dialogVisible:false,
                usernameTest:'',
                comment:''
            }
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
            }
        },
        methods: {
            //编辑
            showId(index, row){
                console.info(row.id)
            },
            //编辑
            handleUpdate(index, row){

            },
            //查看详情
            handleShowDetails(index, row){
                this.$router.push({name:"expenseAccountDetail",params:{id:row.id}});
            },
            //收单
            handleDeliver(index, row){
                this.$confirm('是否确认收单', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  //huangxiaohou：这里写确认收单后方法
                  console.log(row.id);
                  debugger;
                   deliver(row.id).then(response => {
                    this.$message({
                      message: '收单成功！',
                      type: 'success'
                    });
                    // this.getList();
                  })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '取消收单'
                  });
                  // this.getList();
                });

            },
            //提交单据
            handleSubmit(index, row){
                this.$router.push({name:"printExpenseAccount",params:{id:row.id}});
            },
            //撤销(审核负责人撤销审核员审核通过的单据)
            handleRevoke(index, row){
                this.$confirm('是否撤销该审核人已经审核通过的单据?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    let params = new URLSearchParams();
                    params.append("masterUsername", this.usernameTest);
                    revokeExpenseAccountById(row.id,params).then(()=> {
                        this.$message({
                            message: '已撤销该被通过的单据',
                            type: 'success'
                        });
                    })
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '取消撤销行为'
                    });
                })
            },
            //审核员同意
            handleAgree(index,row){
                this.$confirm('是否同意报销人的申请?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    let params = new URLSearchParams();
                    params.append("reviewerUsername", this.usernameTest);
                    agreeExpenseAccountById(row.id,params).then(()=> {
                        this.$message({
                            message: '审核通过该单据',
                            type: 'success'
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消审核通过行为'
                    });
                })
            },
            //审核员拒绝(拒绝)
            handleReject(index ,row) {
                this.$prompt('请修改意见', '拒绝', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputErrorMessage: '格式不正确'
                }).then(({ value }) => {
                    let params = new URLSearchParams();
                    params.append("comment", value);
                    params.append("reviewerUsername",this.usernameTest);
                    rejectExpenseAccountById(row.id,params).then(()=>{
                        this.$message({
                            type: 'success',
                            message: '已拒绝该单据'
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消拒绝该单据的行为'
                    });
                });
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
            getUser() {
                getInfo().then(response => {
                    this.usernameTest = response.data.username
                })
            },
        }
    }
</script>
<style lang="less" scoped>
    //
</style>






