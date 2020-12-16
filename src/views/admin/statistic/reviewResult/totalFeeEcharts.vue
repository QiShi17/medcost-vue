
<style scoped>
    h2{
        text-align: center;
        padding: 30px;
        font-size: 18px;
    }
    #chart_example{
        width: 100%;
        height: 800px;
        border: 1px solid rgb(12, 0, 7);
        margin: 0 auto;
    }
</style>

<template>
    <div>
        <h2>vue中插入Echarts示例</h2>
        <!--        <el-button type="primary" round @click="draw1">画图</el-button>-->
        <div id="chart_example"></div>
    </div>

</template>

<script>
    import {fetchAccountResultStatistic} from'@/api/expenseAccount'
    var echarts = require('echarts');
    const defaultAccountResultStatistic = {
        departmentAndSchoolList:[],
        departmentAndSchoolNumList:[],

    };//缺少一个发票图片
    export default {

        data() {
            return {
                accountResultStatistic: Object.assign({}, defaultAccountResultStatistic),
            }
        },
        mounted() {


        },
        methods: {
            // draw1() {
            //     fetchAccountResultStatistic().then(response=>{
            //         //this.accountResultStatistic.departmentAndSchoolList=response.data.accountResultStatistic.departmentAndSchoolList
            //         //this.accountResultStatistic.departmentAndSchoolNumList=response.data.accountResultStatistic.departmentAndSchoolNumList
            //         this.accountResultStatistic=response.data
            //         console.info(this.accountResultStatistic)
            //     })
            // }
        },
        watch: {},
        created() {
            fetchAccountResultStatistic().then(response=>{
                //this.accountResultStatistic.departmentAndSchoolList=response.data.accountResultStatistic.departmentAndSchoolList
                //this.accountResultStatistic.departmentAndSchoolNumList=response.data.accountResultStatistic.departmentAndSchoolNumList
                this.accountResultStatistic=response.data
                console.info(this.accountResultStatistic)

                let this_ = this;
                let myChart = echarts.init(document.getElementById('chart_example'));

                let option = {
                    color: ['#ff7900'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {
                            type : 'shadow'
                        }
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : this.accountResultStatistic.departmentAndSchoolList,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'部门/学院总报销额',
                            type:'bar',
                            barWidth: '40%',
                            data:[13000,2000,5000,16000,4800,5600,3200,4800,1200,8500,7600,9600],
                            color: ['#ff9800'],
                        },
                    ],
                    toolbox: {
                        feature: {
                            saveAsImage: {
                                show: true,                         //是否显示该工具。
                                type:"png",                         //保存的图片格式。支持 'png' 和 'jpeg'。
                                name:"pic1",                        //保存的文件名称，默认使用 title.text 作为名称
                                backgroundColor:"#ffffff",        //保存的图片背景色，默认使用 backgroundColor，如果backgroundColor不存在的话会取白色
                                title:"保存为图片",
                                pixelRatio:1
                            }
                        },
                        iconStyle:{
                            color:'#fff',
                            normal:{
                                color:'#fff',//背景颜色
                                borderColor: 'red'//边框颜色

                            }
                        }
                    },
                };

                myChart.setOption(option);
                //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
                window.addEventListener('resize',function() {myChart.resize()});

            })
        }
    }
</script>