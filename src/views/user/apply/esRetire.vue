<template>
    <div>
        <div class="app-container">

            <apply-detail :apply-type="applyType" >

            </apply-detail>

        </div>
    </div>
</template>

<script>
    import applyDetail from "./components/applyDetail";
    import {RETIRE} from '@/value/applyType'
    export default {
        name: "esRetire",
        components:{applyDetail},
        data(){
            return{
                applyType:RETIRE
            }
        }
    }
</script>

<style scoped>

</style>
