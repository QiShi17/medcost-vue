<template>
    <div>
        <div>
            <el-card >
                <div slot="header" class="clearfix">
                    <span>单据详情</span>
                </div>
                <el-form :model="expenseAccountDetail" label-width="100px"  size="mini">
                    <el-row>
                        <el-col :span=8>
                            <el-form-item label="报销状态" >
                                <el-tag v-if="expenseAccountDetail.status===0">新建未保存草稿</el-tag>
                                <el-tag v-if="expenseAccountDetail.status===1">草稿(未提交)</el-tag>
                                <el-tag v-if="expenseAccountDetail.status===2">审核中(已提交未审核)</el-tag>
                                <el-tag v-if="expenseAccountDetail.status===3">审核通过</el-tag>
                                <el-tag v-if="expenseAccountDetail.status===4">审核不通过</el-tag>
                                <el-tag v-if="expenseAccountDetail.status===5">已收单</el-tag>
                                <el-tag v-if="expenseAccountDetail.status===6">已拒绝(被审核负责人拒绝)</el-tag>
                            </el-form-item>
                        </el-col>
                    <el-col :span=8>
                        <el-form-item label="流水号" >
                            <el-tag>{{this.expenseAccountDetail.serialNum}}</el-tag>
                        </el-form-item>
                    </el-col>
                    <el-col :span=8>
                        <el-form-item label="报销类型" >
                            <el-tag v-if="expenseAccountDetail.expenseTypeId===1">学生报销</el-tag>
                            <el-tag v-if="expenseAccountDetail.expenseTypeId===2">在职职工报销</el-tag>
                            <el-tag v-if="expenseAccountDetail.expenseTypeId===3">退休职工报销</el-tag>
                            <el-tag v-if="expenseAccountDetail.expenseTypeId===4">离休职工报销</el-tag>
                            <el-tag v-if="expenseAccountDetail.expenseTypeId===5">其他报销类型</el-tag>
                        </el-form-item>
                    </el-col>
                    <el-col :span=8>
                        <el-form-item label="姓名" >
                            <el-tag>{{this.expenseAccountDetail.realname}}</el-tag>
                        </el-form-item>
                    </el-col>
                    <el-col :span=8>
                        <el-form-item label="用户名" >
                            <el-tag>{{this.expenseAccountDetail.username}}</el-tag>
                        </el-form-item>
                    </el-col>
                        <el-col :span=8>
                            <el-form-item label="年龄" >
                                <el-tag>{{this.expenseAccountDetail.age}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span=8>
                            <el-form-item label="性别" >
                                <el-tag v-if="this.expenseAccountDetail.gender===0">男</el-tag>
                                <el-tag v-if="this.expenseAccountDetail.gender===1">女</el-tag>
                            </el-form-item>
                        </el-col>
                    <el-col :span=8 v-if="this.expenseAccountDetail.school!==''">
                        <el-form-item label="学院" >
                            <el-tag>{{this.expenseAccountDetail.school}}</el-tag>
                        </el-form-item>
                    </el-col>
                        <el-col :span=8 v-if="this.expenseAccountDetail.school!==''">
                            <el-form-item label="专业" >
                                <el-tag>{{this.expenseAccountDetail.major}}</el-tag>
                            </el-form-item>
                        </el-col>
                    <el-col :span=8 v-if="this.expenseAccountDetail.department!==''">
                        <el-form-item label="部门" >
                            <el-tag>{{this.expenseAccountDetail.department}}</el-tag>
                        </el-form-item>
                    </el-col>
                    </el-row>

                    <el-row v-if="this.expenseAccountDetail.referralImg!==''">
                        <el-col :span=8>
                            <el-form-item label="转诊单照片" >
                                <el-image :src="this.expenseAccountDetail.referralImg"></el-image>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span=8 v-if="this.expenseAccountDetail.referralImg!==''">
                            <el-form-item label="转诊时间" >
                                <el-tag>{{renderTime(this.expenseAccountDetail.deadline)}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col  :span=8 v-if="this.expenseAccountDetail.referralImg!==''">
                            <el-form-item label="转诊前医院" >
                                <el-tag>{{this.expenseAccountDetail.lhospitalName}}</el-tag>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span=8>
                            <el-form-item label="就诊医院" >
                                <el-tag>{{this.expenseAccountDetail.fhospitalName}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span=8>
                            <el-form-item label="科室" >
                                <el-tag>{{this.expenseAccountDetail.room}}</el-tag>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span=8>
                            <el-form-item label="处方照片" >
                                <el-image :src="this.expenseAccountDetail.prescriptionImg"></el-image>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span=8>
                            <el-form-item label="挂号单照片" >
                                <el-image :src="this.expenseAccountDetail.registImg"></el-image>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span=8>
                            <el-form-item label="挂号时间" >
                                <el-tag>{{renderTime(this.expenseAccountDetail.registTime)}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span=8>
                            <el-form-item label="挂号费用" >
                                <el-tag>{{this.expenseAccountDetail.registFee}}</el-tag>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span=8>
                            <el-form-item label="发票照片" >
                                <el-image :src="this.expenseAccountDetail.invoiceImg"></el-image>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span=8>
                            <el-form-item label="发票时间" >
                                <el-tag>{{renderTime(this.expenseAccountDetail.invoiceTime)}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span=8>
                            <el-form-item label="发票费用" >
                                <el-tag>{{this.expenseAccountDetail.invoiceFee}}</el-tag>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span=8>
                            <el-form-item label="总额" >
                                <el-tag>{{this.expenseAccountDetail.invoiceFee+this.expenseAccountDetail.registFee}}</el-tag>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
            </el-card>
<div v-if="this.expenseAccountStatus!==2">
            <div  v-for="item in expenseAccountDetail.reviewRecordList">
            <el-card class="box-card" style="margin-top: 20px">
                <div slot="header" class="clearfix">
                    <span>审核历史</span>
                </div>

                <div>
                    <el-form :model="expenseAccountDetail" label-width="100px"  size="mini">
                        <el-col :span=8>
                            <el-form-item label="审核通过与否">
                                <el-tag v-if="item.status===0">审核未通过</el-tag>
                                <el-tag v-if="item.status===1">审核通过</el-tag>
                            </el-form-item>
                        </el-col>

                          <div v-if="item.status===0">   <!--审核未通过才显示修改意见-->
                                <el-col :span=8>
                                    <el-form-item label="修改意见" >
                                        <el-tag >{{item.comment}}</el-tag>
                                    </el-form-item>
                                </el-col>
                            </div>

                            <el-col :span=8>
                                <el-form-item label="审核时间" >
                                    <el-tag >{{renderTime(item.updateTime)}}</el-tag>
                                </el-form-item>
                            </el-col>

                            <el-col :span=8>
                                <el-form-item label="审核人" >
                                    <el-tag >{{item.reviewerRealname}}({{item.reviewerIdNum}})</el-tag>
                                </el-form-item>
                            </el-col>

                        </el-form>
                    </div>
            </el-card>
            </div>
</div>
        </div>
    </div>
</template>

<script>
    import {getExpenseAccountDetailById,getInReviewExpenseAccountDetailById} from'@/api/expenseAccount'
    const defaultExpenseAccountDetail = {
        status: '',
        serialNum: '',
        expenseTypeId: '',
        realname: '',
        username: '',
        gender: '',
        age: '',
        type: '',
        department: '',
        major: '',
        school:'',
        fhospitalName: '',
        referralImg: '',
        deadline: '',
        lhospitalName: '',
        room: '',
        registTime: '',
        registFee: '',
        registImg: '',
        disease: '',
        prescriptionImg: '',
        invoiceImg: '',
        invoiceTime: '',
        invoiceFee: '',
        preceptionImg:'',
        reviewRecordList:
        [
            {
                updateTime: '',
                reviewerRealname: '',
                reviewerIdNum: '',
                status: '',
                comment: ''
            }
        ]
    };//缺少一个发票图片

    export default {
        name: "ExpenseAccountDetail",
        props: {
            applyType: {
                type: Object,
            }
        },
        created() {
            if (this.$route.params.id != null) {
                this.getExpenseAccountDetail(this.$route.params.id)
            this.expenseAccountStatus=this.$route.params.status    //该单据的状态，根据状态来展示相关页面
            }
        },
        data() {
            return {
                expenseAccountDetail: Object.assign({}, defaultExpenseAccountDetail),
                expenseAccountStatus:'',
            };
        },
        methods: {
            getExpenseAccountDetail(id) {
                if(this.$route.params.status!==2)
                {
                    getExpenseAccountDetailById(id).then(response => {
                        this.expenseAccountDetail = response.data
                        console.info(this.expenseAccountDetail)
                    })
                }
                else
                {
                    getInReviewExpenseAccountDetailById(id).then(response=>{
                        this.expenseAccountDetail = response.data
                        console.info(this.expenseAccountDetail)
                    })
                }
            },
            //转换日期格式
            renderTime(date) {
                var dateee = new Date(date).toJSON();
                return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            },
        }
    }
</script>

<style scoped>

</style>
