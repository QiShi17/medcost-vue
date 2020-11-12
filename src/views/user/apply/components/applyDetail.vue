<template>
    <div>
        <div>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>基本信息</span>
                </div>
                <el-form ref="form" :model="expenseAccount" label-width="80px">
                    <el-form-item label="姓名">
                        <el-input v-model="user.realname" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="学工号">
                        <el-input v-model="expenseAccount.username" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="user.gender" placeholder="请选择性别" :disabled="true">
                            <el-option label="男" value="0"></el-option>
                            <el-option label="女" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年龄" >
                        <el-input v-model="user.age" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item v-if="type===5" label="类型" >
                        <el-select v-model="user.type" placeholder="请选择类型" :disabled="true">
                            <el-option label="学生" value="0"></el-option>
                            <el-option label="员工" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="type===2||type===3||type===4||user.type===1" label="部门" >
                        <el-select v-model="user.department" placeholder="请选择部门" :disabled="true">
                            <el-option label="部门1" value="0"></el-option>
                            <el-option label="部门2" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <template v-if="type===1||user.type===0">
                        <el-form-item label="学院">
                            <el-input v-model="user.school" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="专业">
                            <el-input v-model="user.major" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="年级">
                            <el-input v-model="user.grade" :disabled="true"></el-input>
                        </el-form-item>
                    </template>
                </el-form>
            </el-card>
            <el-card class="box-card" style="margin-top: 20px">
                <div slot="header" class="clearfix">
                    <span>报销信息</span>
                </div>
                <el-form ref="form" :model="expenseAccount" label-width="150px">
                    <template v-if="type===1||type===2||type===5">
                        <template v-if="type!==1">
                            <el-form-item label="指定医院">
                                <el-select v-model="expenseAccount.fhospitalId" placeholder="请选择医院">
                                    <el-option label="医院1" value="0"></el-option>
                                    <el-option label="医院2" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="type !==1" label="未在指定医院就医">
                                <el-switch v-model="isChangeHospital"></el-switch>
                            </el-form-item>
                        </template>

                        <template v-if="isChangeHospital||type===1">
                            <el-form-item label="转诊单照片">
                                <el-input v-model="expenseAccount.referralImg"></el-input>
                            </el-form-item>
                            <el-form-item label="指定转诊限期">
                                <el-date-picker
                                        v-model="expenseAccount.deadline"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                </el-date-picker>
<!--                                <el-col :span="11">-->
<!--                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"-->
<!--                                                    style="width: 100%;"></el-date-picker>-->
<!--                                </el-col>-->
                            </el-form-item>
                            <el-form-item label="就诊医院">
                                <el-input v-model="expenseAccount.lhospitalName"></el-input>
                            </el-form-item>
                        </template>
                    </template>
                    <el-form-item label="就医科室">
                        <el-input v-model="expenseAccount.room"></el-input>
                    </el-form-item>
                    <el-form-item label="病因">
                        <el-input v-model="expenseAccount.disease"></el-input>
                    </el-form-item>
                    <el-form-item label="挂号单照片">
                        <el-input v-model="expenseAccount.registImg"></el-input>
                    </el-form-item>
                    <el-form-item label="挂号时间">
                        <el-date-picker
                                v-model="expenseAccount.registTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="挂号费用">
                        <el-input v-model="expenseAccount.registFee"></el-input>
                    </el-form-item>
                    <el-form-item label="处方照片">
                        <el-input v-model="expenseAccount.prescriptionImg"></el-input>
                    </el-form-item>
                    <el-form-item label="发票照片">
                        <el-input v-model="expenseAccount.invoiceImg"></el-input>
                    </el-form-item>
                    <el-form-item label="发票时间" style="margin-right: 5px">
                        <el-date-picker
                                v-model="expenseAccount.invoiceTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="发票费用">
                        <el-input v-model="expenseAccount.invoiceFee"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    import {apply} from '@/api/expenseAccount';
    import {getInfo} from '@/api/login'
    import {APPLY_TYPE} from '@/value/consts'

    const defaultExpenseAccount={
        serialNum: '',
        fhospitalId: '',
        referralImg: '',
        lhospitalName: '',
        room: '',
        deadline: '',
        expenseTypeId: '',
        username: '',
        registImg: '',
        registTime: '',
        registFee: '',
        disease: '',
        prescriptionImg: '',
        invoiceImg: '',
        invoiceTime: '',
        invoiceFee: '',
        status: '',
        createTime: '',
        updateTime: ''
    };

    export default {
        name: "applyDetail",
        props: {
            curStatus: {
                type: Number,
                default: 0,
            },
            type: {
                type: Number,
                default: 1,
            }
        },
        created(){
            this.getUser()
            if(this.type === APPLY_TYPE.ONDUTY){
                console.info("onduty")
            }else{
                console.info("not")
            }
        },
        data() {
            const validateMoney = (rule, value, callback) => {
                    if (!validateValidity(value)) {
                        callback(new Error('请输入整数或两位小数'))
                    } else {
                        callback();
                    }
                }
            ;
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                user: {
                    username: '',
                    realname: '',
                    gender: 0,
                    age: '',
                    type: 0,
                    school: '',
                    major: '',
                    grade: '',
                    department: '',
                    annualExpense: '',
                },
                expenseAccount:Object.assign({},defaultExpenseAccount),
                isChangeHospital: false,
            };
        },
        methods: {
            getUser(){
                getInfo().then(response => {
                    this.user=response.data
                    this.expenseAccount.username=response.data.username
                    this.user.gender=response.data.gender.toString()
                    this.$message({
                        message: '获取成功！',
                        type: 'success'
                    });
                })
            },
            onSubmit() {
                this.expenseAccount.status
                apply(this.expenseAccount).then(response => {
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                    // this.dialogVisible = false;
                    // this.getList();
                })
            }
        }
    }
</script>

<style scoped>

</style>
