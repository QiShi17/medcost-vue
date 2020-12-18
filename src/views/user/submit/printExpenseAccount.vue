<template>
    <div>
            <div id="pdfCentent">
<!-- 在此处编写需要下载的东西              -->
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span>打印单据</span>
                        </div>



                        <el-form :model="this.account2Print" label-width="100px"  size="mini">
                                <el-col :span=8>
                                    <el-form-item label="流水号" >
                                        <el-tag type="info">{{this.account2Print.serialNum}}</el-tag>
                                    </el-form-item>
                                </el-col>
                                <el-col :span=8>
                                    <el-form-item label="报销类型" >
                                        <el-tag type="info" v-if="account2Print.expenseTypeId===1">学生报销</el-tag>
                                        <el-tag type="info" v-if="account2Print.expenseTypeId===2">在职职工报销</el-tag>
                                        <el-tag type="info" v-if="account2Print.expenseTypeId===3">退休职工报销</el-tag>
                                        <el-tag type="info" v-if="account2Print.expenseTypeId===4">离休职工报销</el-tag>
                                        <el-tag type="info" v-if="account2Print.expenseTypeId===5">其他报销类型</el-tag>
                                    </el-form-item>
                                </el-col>
                            <el-col :span=8>
                                <el-form-item label="用户类型" >
                                    <el-tag type="info" v-if="this.account2Print.type===1">学生</el-tag>
                                    <el-tag type="info" v-if="this.account2Print.type===0">职工</el-tag>
                                </el-form-item>
                            </el-col>
                            <el-row>
                                <el-col :span=8>
                                    <el-form-item label="姓名" >
                                        <el-tag type="success">{{this.account2Print.realname}}</el-tag>
                                    </el-form-item>
                                </el-col>
                                <el-col :span=8>
                                    <el-form-item label="用户名" >
                                        <el-tag type="success">{{this.account2Print.username}}</el-tag>
                                    </el-form-item>
                                </el-col>
                                <el-col :span=8>
                                    <el-form-item label="性别" >
                                        <el-tag type="success" v-if="account2Print.gender===0 ">男</el-tag>
                                        <el-tag type="success" v-if="account2Print.gender===1">女</el-tag>
                                    </el-form-item>
                                </el-col>
                                <el-col :span=8>
                                    <el-form-item label="年龄" >
                                        <el-tag type="success">{{this.account2Print.age}}</el-tag>
                                    </el-form-item>
                                </el-col>
                                <el-col :span=8 v-if="this.account2Print.type===0">
                                    <el-form-item label="部门" >
                                        <el-tag type="success">{{this.account2Print.department}}</el-tag>
                                    </el-form-item>
                                </el-col>
                                <el-col :span=8 v-if="this.account2Print.type===1">
                                    <el-form-item label="学院" >
                                        <el-tag type="success">{{this.account2Print.school}}</el-tag>
                                    </el-form-item>
                                </el-col>
                            </el-row>


                            <el-row>
                                <el-col :span=8>
                                    <el-form-item label="转诊前医院" >
                                        <el-tag>{{this.account2Print.lhospitalName}}</el-tag>
                                    </el-form-item>
                                </el-col>
                                <el-col :span=8>
                                    <el-form-item label="就诊医院" >
                                        <el-tag>{{this.account2Print.fhospitalName}}</el-tag>
                                    </el-form-item>
                                </el-col>
                                <el-col :span=8>
                                    <el-form-item label="科室" >
                                        <el-tag>{{this.account2Print.room}}</el-tag>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span=8>
                                    <el-form-item label="挂号时间" >
                                        <el-tag>{{renderTime(this.account2Print.registTime)}}</el-tag>
                                    </el-form-item>
                                </el-col>
                                <el-col :span=8>
                                    <el-form-item label="挂号费用" >
                                        <el-tag>{{this.account2Print.registFee}}</el-tag>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span=8>
                                    <el-form-item label="发票时间" >
                                        <el-tag>{{renderTime(this.account2Print.invoiceTime)}}</el-tag>
                                    </el-form-item>
                                </el-col>
                                <el-col :span=8>
                                    <el-form-item label="发票费用" >
                                        <el-tag>{{this.account2Print.invoiceFee}}</el-tag>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span=8>
                                    <el-form-item label="审核人" >
                                        <el-tag type="danger">{{this.account2Print.reviewerRealName}}</el-tag>
                                    </el-form-item>
                                </el-col>
                                <el-col :span=8>
                                    <el-form-item label="审核时间" >
                                        <el-tag type="danger">{{renderTime(this.account2Print.reviewerAgreeTime)}}</el-tag>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span=8>
                                    <el-form-item label="总报销额" >
                                        <el-tag type="danger">{{this.account2Print.total}}</el-tag>
                                    </el-form-item>
                                </el-col>
                                <el-col :span=8>
                                    <el-form-item label="报销比例" >
                                        <el-tag type="danger">{{this.account2Print.rate}}</el-tag>
                                    </el-form-item>
                                </el-col>
                                <vue-qr :text="downloadData.url"
                                        :margin="10" colorDark="#000" colorLight="#fff"
                                        :dotScale="1"
                                        :logoSrc="downloadData.icon"
                                        :logoScale="0.2"
                                        :size="66">
                                </vue-qr>
                            </el-row>
                        </el-form>
                    </el-card>
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>报销人签字确认</span>
                    </div>
                    <vue-esign ref="esign" :width="800" :height="150" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor" />
                </el-card>
<!--                在此处编写要下载的东西-->
            </div>
            <el-button type="danger" icon="el-icon-delete" round @click="handleReset">清空签字板</el-button>
            <el-button type="primary" round @click="ExportSavePdf(htmlTitle,nowTime)">导出PDF</el-button>
    </div>

</template>

<script>
    import vueQr from 'vue-qr'
    import {fetchAccount2printById} from '@/api/expenseAccount'

    const defaultAccount2Print = {
        realname: '',
        gender: '',
        age: '',
        username: '',
        type: '',
        department: '',
        school: '',
        serialNum: '',
        expenseTypeId: '',
        fHospitalName: '',
        lhospitalName: '',
        room: '',
        registTime: '',
        registFee: '',
        invoiceTime: '',
        invoiceFee: '',
        disease:'',
        total: '',
        rate: '',
        reviewerRealName: '',
        reviewerAgreeTime: ''
    };

    export default {
        components: {
            vueQr
        },
        created() {
            if (this.$route.params.id != null) {
                this.getAccount2PrintById(this.$route.params.id)
            }
        },
        data() {
            return {
                downloadData: {
                    //以下是二维码
                    info:Object.assign({}, defaultAccount2Print),
                    url: '47.111.130.83:8080/user/submit/print',  //需要转化成二维码的网址
                    //以下是画板
                },
                lineWidth: 6,
                lineColor: '#000000',
                bgColor: '',
                resultImg: '',
                isCrop: false,
                account2Print: Object.assign({}, defaultAccount2Print),
                htmlTitle: "PDF名称",
                nowTime: "",
            }
            //data里面的东西

        },//data右括号
        methods: {
            handleReset () {
                this.$refs.esign.reset()
            },
            handleGenerate () {
                this.$refs.esign.generate().then(res => {
                    this.resultImg = res
                }).catch(err => {
                    alert(err) // 画布没有签字时会执行这里 'Not Signned'
                })
            },
            getAccount2PrintById(id)
            {
                fetchAccount2printById(id).then(response=>{
                    this.account2Print=response.data
                    console.info(this.account2Print)
                })
            },
            renderTime(date) {//转换日期格式
                var dateee = new Date(date).toJSON();
                return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            },
        }
    }
</script>