<template>
    <div class="app-container">
        <el-row>
<!--            <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">-->
            <el-col :span="5" :offset="2">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="https://medcost-oss.oss-cn-beijing.aliyuncs.com/medcost/icon/%E5%AD%A6%E7%94%9F.png" class="image">
                    <div style="padding: 14px;">
                        <div class="bottom clearfix">
                            <el-button type="text" class="button" @click="toStu">学生报销</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="5" :offset="2">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="https://medcost-oss.oss-cn-beijing.aliyuncs.com/medcost/icon/%E5%9C%A8%E8%81%8C%E5%91%98%E5%B7%A5.png" class="image">
                    <div style="padding: 14px;">
                        <div class="bottom clearfix">
                            <el-button type="text" class="button" @click="toOnduty">在职员工报销</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="5" :offset="2">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="https://medcost-oss.oss-cn-beijing.aliyuncs.com/medcost/icon/%E7%A6%BB%E4%BC%91.png" class="image">
                    <div style="padding: 14px;">
                        <div class="bottom clearfix">
                            <el-button type="text" class="button" @click="toOff">离休人员报销</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
            <!--            <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">-->
            <el-col :span="5" :offset="2">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="https://medcost-oss.oss-cn-beijing.aliyuncs.com/medcost/icon/%E9%80%80%E4%BC%91.png" class="image">
                    <div style="padding: 14px;">
                        <div class="bottom clearfix">
                            <el-button type="text" class="button" @click="toRetire">退休人员报销</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="5" :offset="2">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="https://medcost-oss.oss-cn-beijing.aliyuncs.com/medcost/icon/%E5%85%B6%E4%BB%96.png" class="image">
                    <div style="padding: 14px;">
                        <div class="bottom clearfix">
                            <el-button type="text" class="button" @click="toOther">其他报销</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "index",
        methods:{
            //提交单据
            toStu(){
                this.$router.push({name:"stu"});
            },
            toOnduty(){
                this.$router.push({name:"onduty"});
            },
            toOff(){
                this.$router.push({name:"off"});
            },
            toRetire(){
                this.$router.push({name:"retire"});
            },
            toOther(){
                this.$router.push({name:"other"});
            },
        }
    }


</script>

<style scoped>
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        margin: auto;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
