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
                            <el-form-item label="状态" >
                                <el-tag >{{this.expenseAccountDetail.status}}</el-tag>
                            </el-form-item>
                        </el-col>
                    </el-row>
                <el-row>
                    <el-col :span=8>
                        <el-form-item label="流水号" >
                            <el-tag>{{this.expenseAccountDetail.serialNum}}</el-tag>
                        </el-form-item>
                    </el-col>
                </el-row>
                    <el-col :span=8>
                        <el-form-item label="报销类型" >
                            <el-tag v-if="expenseAccountDetail.expenseTypeId===1">报销类型1</el-tag>
                            <el-tag v-if="expenseAccountDetail.expenseTypeId===2">报销类型2</el-tag>
                            <el-tag v-if="expenseAccountDetail.expenseTypeId===3">报销类型3</el-tag>
                            <el-tag v-if="expenseAccountDetail.expenseTypeId===4">报销类型4</el-tag>
                            <el-tag v-if="expenseAccountDetail.expenseTypeId===5">报销类型5</el-tag>
                            <el-tag v-if="expenseAccountDetail.expenseTypeId===6">报销类型6</el-tag>
                            <el-tag v-if="expenseAccountDetail.expenseTypeId===7">报销类型7</el-tag>
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
                        <el-form-item label="图片" >
                            <el-tag>{{this.expenseAccountDetail.referralImg}}</el-tag>
                            <el-image :src="this.expenseAccountDetail.referralImg"></el-image>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-card>

            <el-card class="box-card" style="margin-top: 20px">
                <div slot="header" class="clearfix">
                    <span>审核历史</span>
                </div>
                <el-form :model="expenseAccountDetail" label-width="100px"  size="mini">
                    <div v-for="item in expenseAccountDetail.reviewRecordList">
                        <el-col :span=8>
                            <el-form-item label="审核通过与否">
                                <el-tag >{{item.status}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span=8>
                            <el-form-item label="修改意见" >
                                <el-tag >{{item.comment}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span=8>
                            <el-form-item label="审核时间" >
                                <el-tag >{{item.creatTime}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span=8>
                            <el-form-item label="审核人姓名" >
                                <el-tag >{{item.reviewerRealname}}</el-tag>
                            </el-form-item>
                        </el-col>
                        <el-col :span=8>
                            <el-form-item label="审核人id" >
                                <el-tag >{{item.reviewerIdNum}}</el-tag>
                            </el-form-item>
                        </el-col>
                    </div>
                </el-form>
            </el-card>
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
            }
        }
    }
</script>

<style scoped>

</style>
