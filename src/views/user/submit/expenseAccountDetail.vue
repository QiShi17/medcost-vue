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
                    </el-row>

                    <el-row>
                        <el-col :span=8>
                            <el-form-item label="转诊单照片" >
                                <el-image :src="this.expenseAccountDetail.referralImg"></el-image>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span=8>
                            <el-form-item label="转诊前医院" >
                                <el-tag>{{this.expenseAccountDetail.lhospitalName}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span=8>
                            <el-form-item label="科室" >
                                <el-tag>{{this.expenseAccountDetail.room}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span=8>
                            <el-form-item label="报销日期" >
                                <el-tag>{{renderTime(this.expenseAccountDetail.deadline)}}</el-tag>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span=8>
                            <el-form-item label="挂号单照片" >
                                <el-image :src="this.expenseAccountDetail.prescriptionImg"></el-image>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <div v-for="item in expenseAccountDetail.reviewRecordList">
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
                                    <el-tag >{{item.creatTime}}</el-tag>
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
</template>

<script>
    import {getExpenseAccountDetailById} from'@/api/expenseAccount'
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
        fhospitalName: '',
        referralImg: '',
        lhospitalName: '',
        room: '',
        deadline: '',
        registTime: '',
        registFee: '',
        registImg: '',
        disease: '',
        prescriptionImg: '',
        invoiceImg: '',
        invoiceTime: '',
        invoiceFee: '',
        reviewRecordList:
        [
            {
                creatTime: '',
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
            }
        },
        data() {
            return {
                expenseAccountDetail: Object.assign({}, defaultExpenseAccountDetail),
                test:'000'
            };
        },
        methods: {
            getExpenseAccountDetail(id) {
                getExpenseAccountDetailById(id).then(response => {
                    this.expenseAccountDetail = response.data
                    console.info(this.expenseAccountDetail)
                })
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
