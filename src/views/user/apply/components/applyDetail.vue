<template>
    <div>
        <div>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>基本信息</span>
                </div>
                <el-form ref="form" :model="expenseAccount" label-width="100px">
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
                    <el-form-item label="年龄">
                        <el-input v-model="user.age" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item v-if="user.type===1" label="部门">
                        <el-select v-model="user.department" placeholder="请选择部门" :disabled="true">
                            <el-option label="部门1" value="0"></el-option>
                            <el-option label="部门2" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <template v-if="user.type===0">
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
                    <el-form-item label="年度报销金额">
                        <el-tag>
                            ￥{{user.annualExpense}}
                        </el-tag>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card class="box-card" style="margin-top: 20px">
                <div slot="header" class="clearfix">
                    <span>报销信息</span>
                </div>
                <el-form ref="form" :model="expenseAccount" label-width="150px">
                    <template v-if="applyType===APPLY_TYPE.STU||applyType===APPLY_TYPE.ONDUTY||applyType===APPLY_TYPE.OTHER">
                        <template v-if="applyType!==APPLY_TYPE.STU">
                            <el-form-item label="指定医院">
                                <el-select v-model="expenseAccount.fhospitalId" placeholder="请选择" size="small"
                                           style="width: 80%">
                                    <el-option
                                            v-for="item in hospitals"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="applyType !==APPLY_TYPE.STU" label="未在指定医院就医">
                                <el-switch v-model="isChangeHospital"></el-switch>
                            </el-form-item>
                        </template>

                        <template v-if="isChangeHospital||applyType===APPLY_TYPE.STU">
                            <el-form-item label="转诊单照片">
                                <el-input v-model="expenseAccount.referralImg"></el-input>
                            </el-form-item>
                            <el-form-item label="指定转诊限期">
                                <el-date-picker
                                        v-model="expenseAccount.deadline"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                </el-date-picker>
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
                    <el-form-item label="总计金额">
                        <el-tag>￥{{Number(expenseAccount.registFee)+Number(expenseAccount.invoiceFee)}}</el-tag>
                    </el-form-item>
                    <el-form-item label="预计报销比例">
                        <el-tag type="warning">{{rate}}%</el-tag>
                    </el-form-item>
                    <el-form-item label="预计报销金额">
                        <el-tag type="success">￥{{(Number(expenseAccount.registFee)+Number(expenseAccount.invoiceFee))*rate*0.01}}</el-tag>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSave">保存草稿</el-button>
                        <el-button type="success" @click="onSubmit">立即提交</el-button>
                        <el-button type="danger">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    import {apply,getExpenseAccountPureById} from '@/api/expenseAccount';
    import {getInfo} from '@/api/login'
    import {getHospitalList} from "@/api/hospital";
    import {STU,ONDUTY,RETIRE,OFF,OTHER} from '@/value/applyType'
    import {NEW,DRAFT,REVIEW,PASSED,UNPASSED,DELIVER,REJECT} from '@/value/accountStatus'



    const defaultExpenseAccount = {
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
            applyType:{
                    type:Object,
                    default:()=>STU
            }
        },
        created() {
            this.getUser()
            if (this.type === ONDUTY.id || this.type === OTHER.id) {
                this.getAllHospital()
            }
            //如果时编辑状态，需要通过path传递expenseAccountId，查询对应的epenseAccount信息
            if(this.$route.query.expense_account_id !=null){
                this.getCurExpenseAccount(this.$route.query.expense_account_id)
            }
            this.getRate()
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
                APPLY_TYPE:{
                    STU,ONDUTY,OFF,RETIRE,OTHER
                },
                hospitals: [Object],
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
                expenseAccount: Object.assign({}, defaultExpenseAccount),
                isChangeHospital: false,
                rate:0,
            };
        },
        methods: {
            getUser() {
                getInfo().then(response => {
                    this.user = response.data
                    this.expenseAccount.username = response.data.username
                    this.user.gender = response.data.gender.toString()
                    this.$message({
                        message: '获取成功！',
                        type: 'success'
                    });
                })
            },
            getAllHospital() {
                getHospitalList().then(response => {
                    this.hospitals = response.data
                })
            },
            getRate(){
                if(this.user.annualExpense!=null&&this.user.annualExpense>=1300){
                    this.rate=this.applyType.lrate
                }else{
                    this.rate=this.applyType.frate
                }
            },
            getCurExpenseAccount(id){
                getExpenseAccountPureById(id).then(reponse=>{
                    this.expenseAccount=reponse.data
                })
            },
            onSubmit() {
                this.expenseAccount.expenseTypeId=this.applyType.id

                //点击提交，单据状态设置为审核中
                this.expenseAccount.status=REVIEW.id

                apply(this.expenseAccount).then(response => {
                    this.$message({
                        message: '提交成功！',
                        type: 'success'
                    });
                })
            },
            onSave(){
                this.expenseAccount.expenseTypeId=this.applyType.id

                //点击保存草稿，单据状态设置为草稿（未提交）
                //考虑审核拒绝的单据，设置为草稿状态，删除会有问题
                //可以增加一个字段，代表此单据是否审核过至少一次
                //如果审核过至少一次，审核拒绝的单据，设置为草稿状态，删除时逻辑删除。但是这样做，批量删除会有问题。
                //所以现在先不考虑做单据的删除/审核拒绝的单据不能保存草稿
                this.expenseAccount.status=DRAFT.id

                apply(this.expenseAccount).then(response => {
                    this.$message({
                        message: '提交成功！',
                        type: 'success'
                    });
                })
            }
        }
    }
</script>

<style scoped>

</style>
