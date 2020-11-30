<template>
    <div>
        <div>
            <el-card >
                <div slot="header" class="clearfix">
                    <span>基本信息</span>
                </div>
                <el-form :model="expenseAccount" label-width="100px"  size="mini">
                    <el-row>
                        <el-col :span=8>
                            <el-form-item label="姓名" >
                                <el-tag >{{user.realname}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span=8>
                            <el-form-item label="学工号" >
                                <el-tag>{{expenseAccount.username}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span=8>
                            <el-form-item label="性别" >

                                <el-tag v-if="user.gender==='0'">男</el-tag>
                                <el-tag v-if="user.gender==='1'">女</el-tag>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="年龄">
                                <el-tag>{{user.age}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item v-if="user.type===1" label="部门" >
                                <el-tag>{{user.department}}</el-tag>
                            </el-form-item>
                            <el-form-item v-if="user.type===0" label="学院" >
                                <el-tag>{{user.school}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="年度报销金额" >
                                <el-tag>
                                    ￥{{Number(user.annualExpense)}}
                                </el-tag>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item v-if="user.type===0" label="专业" >
                                <el-tag>{{user.major}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item v-if="user.type===0" label="年级" >
                                <el-tag>{{user.grade}}</el-tag>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <el-card class="box-card" style="margin-top: 20px">
                <div slot="header" class="clearfix">
                    <span>报销信息</span>
                </div>
                <el-form ref="form" :model="expenseAccount" label-width="150px" :rules="rule">
                    <template
                            v-if="applyType===APPLY_TYPE.STU||applyType===APPLY_TYPE.ONDUTY||applyType===APPLY_TYPE.OTHER">
                        <template v-if="applyType!==APPLY_TYPE.STU">
                            <el-form-item label="指定医院" prop="fhospitalId">
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
                            <el-form-item label="转诊单照片" prop="referralImg">
                                <single-upload v-model="expenseAccount.referralImg"></single-upload>
                            </el-form-item>
                            <el-form-item label="指定转诊限期" prop="deadline">
                                <el-date-picker
                                        v-model="expenseAccount.deadline"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="就诊医院" prop="lhospitalName">
                                <el-input v-model="expenseAccount.lhospitalName"></el-input>
                            </el-form-item>
                        </template>
                    </template>
                    <el-form-item label="就医科室" prop="room">
                        <el-input v-model="expenseAccount.room"></el-input>
                    </el-form-item>
                    <el-form-item label="病因" prop="disease">
                        <el-input v-model="expenseAccount.disease"></el-input>
                    </el-form-item>
                    <el-form-item label="挂号单照片" prop="registImg">
                        <single-upload v-model="expenseAccount.registImg"></single-upload>
                    </el-form-item>
                    <el-form-item label="挂号时间" prop="registTime">
                        <el-date-picker
                                v-model="expenseAccount.registTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="挂号费用" prop="registFee">
                        <el-input v-model="expenseAccount.registFee"></el-input>
                    </el-form-item>
                    <el-form-item label="处方照片" prop="prescriptionImg">
                        <single-upload v-model="expenseAccount.prescriptionImg"></single-upload>
                    </el-form-item>
                    <el-form-item label="发票照片" prop="invoiceImg">
                        <single-upload v-model="expenseAccount.invoiceImg"></single-upload>
                    </el-form-item>
                    <el-form-item label="发票时间" style="margin-right: 5px" prop="invoiceTime">
                        <el-date-picker
                                v-model="expenseAccount.invoiceTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="发票费用" prop="invoiceFee">
                        <el-input v-model="expenseAccount.invoiceFee"></el-input>
                    </el-form-item>
                    <el-form-item label="总计金额">
                        <el-tag>￥{{Number(expenseAccount.registFee)+Number(expenseAccount.invoiceFee)}}</el-tag>
                    </el-form-item>
                    <el-form-item label="预计报销比例">
                        <el-tag type="warning">{{rate}}%</el-tag>
                    </el-form-item>
                    <el-form-item label="预计报销金额">
                        <el-tag type="success">
                            ￥{{(Number(expenseAccount.registFee)+Number(expenseAccount.invoiceFee))*rate*0.01}}
                        </el-tag>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSave">保存草稿</el-button>
                        <el-button type="success" @click="onSubmit('form')">立即提交</el-button>
                        <el-button type="danger">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    import {apply, getExpenseAccountPureById} from '@/api/expenseAccount';
    import {getInfo} from '@/api/login'
    import {getHospitalList} from "@/api/hospital";
    import {STU, ONDUTY, RETIRE, OFF, OTHER} from '@/value/applyType'
    import {NEW, DRAFT, IN_REVIEW, PASSED, UNPASSED, DELIVER, REJECT} from '@/value/accountStatus'
    import SingleUpload from '@/components/Upload/singleUpload'


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
        updateTime: '',
    };

    export default {
        name: "applyDetail",
        components: {SingleUpload},
        props: {
            applyType: {
                type: Object,
                default: () => STU
            }
        },
        created() {
            this.getUser()
            // if (this.type === ONDUTY.id || this.type === OTHER.id) {
            this.getAllHospital()
            // }
            //如果时编辑状态，需要通过path传递expenseAccountId，查询对应的epenseAccount信息
            if (this.$route.query.expense_account_id != null) {
                this.getCurExpenseAccount(this.$route.query.expense_account_id)
            }
            this.getRate()
        },
        data() {
            return {
                rule: {
                    fhospitalId: [
                        {required: true, message: "请选择指定医院", trigger: 'blur'}
                    ],
                    lhospitalName: [
                        {required: true, message: "请输入就医医院", trigger: 'blur'},
                        {min: 1, max: 40, message: "长度在1到40个字符", trigger: 'blur'}
                    ],
                    referralImg: [
                        {required: true, message: "请上传转诊单", trigger: 'blur'}
                    ],
                    deadline: [
                        {required: true, message: "请选择指定转诊限期", trigger: 'blur'},
                    ],
                    room: [
                        {required: true, message: "请输入就医科室", trigger: 'blur'},
                        {min: 1, max: 40, message: "长度在1到40个字符", trigger: 'blur'}
                    ],
                    disease: [
                        {required: true, message: "请输入病因", trigger: 'blur'},
                        {min: 1, max: 40, message: "长度在1到40个字符", trigger: 'blur'}
                    ],
                    registImg: [
                        {required: true, message: "请上传挂号单", trigger: 'blur'}
                    ],
                    registTime: [
                        {required: true, message: "请选择挂号时间", trigger: 'blur'}
                    ],
                    registFee: [
                        {required: true, message: "请输入挂号费用", trigger: 'blur'},
                        {
                            pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/,
                            message: "请输入合法的金额数字，最多两位小数",
                            trigger: "blur"
                        }
                    ],
                    prescriptionImg: [
                        {required: true, message: "请上传处方", trigger: 'blur'}
                    ],
                    invoiceImg: [
                        {required: true, message: "请上传发票", trigger: 'blur'}
                    ],
                    invoiceTime: [
                        {required: true, message: "请选择发票时间", trigger: 'blur'}
                    ],
                    invoiceFee: [
                        {required: true, message: "请输入发票费用", trigger: 'blur'}
                    ]
                },
                APPLY_TYPE: {
                    STU, ONDUTY, OFF, RETIRE, OTHER
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
                rate: 0,
                dengmiQueryForm:Object
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
            getRate() {
                if (this.user.annualExpense != null && this.user.annualExpense >= 1300) {
                    this.rate = this.applyType.lrate
                } else {
                    this.rate = this.applyType.frate
                }
            },
            getCurExpenseAccount(id) {
                getExpenseAccountPureById(id).then(reponse => {
                    this.expenseAccount = reponse.data
                })
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否提交数据', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: "warning"
                        }).then(() => {
                                this.expenseAccount.expenseTypeId = this.applyType.id

                                //点击提交，单据状态设置为审核中
                                this.expenseAccount.status = IN_REVIEW.id

                                apply(this.expenseAccount).then(response => {
                                    this.$message({
                                        message: '提交成功！',
                                        type: 'success'
                                    });
                                })
                            }
                        )
                    } else {
                        this.$message({
                            message: '填报信息有误，请检查',
                            type: 'error',
                            duration: 1000
                        });
                        return false;
                    }
                })
            },
            onSave() {
                this.expenseAccount.expenseTypeId = this.applyType.id

                //点击保存草稿，单据状态设置为草稿（未提交）
                //考虑审核拒绝的单据，设置为草稿状态，删除会有问题
                //可以增加一个字段，代表此单据是否审核过至少一次
                //如果审核过至少一次，审核拒绝的单据，设置为草稿状态，删除时逻辑删除。但是这样做，批量删除会有问题。
                //所以现在先不考虑做单据的删除/审核拒绝的单据不能保存草稿
                this.expenseAccount.status = DRAFT.id

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
