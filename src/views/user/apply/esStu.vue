<template>
    <div class="app-container">
        <apply-detail :apply-type="applyType" v-if="canEnter" >

        </apply-detail>
        <el-alert
                v-else
                title="您的身份类型不支持此种报销"
                type="warning">
        </el-alert>
    </div>
</template>

<script>
    import applyDetail from "./components/applyDetail";
    import {STU} from '@/value/applyType'
    import {getInfo} from '@/api/login'


    export default {
        name: "esStu",
        components: {applyDetail},
        data() {
            return {
                applyType: STU,
                canEnter:false
            }
        },
        created(){
            this.isUserCanEnter()
        },
        methods:{
            isUserCanEnter() {
                getInfo().then(response => {
                    let userType=response.data.type
                    if(userType===0) this.canEnter=true
                })
            },
        }
    }
</script>

<style scoped>

</style>
