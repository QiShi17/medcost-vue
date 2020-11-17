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
    import {OFF} from '@/value/applyType'
    export default {
        name: "esOff",
        components:{applyDetail},
        data(){
            return{
                applyType:OFF
            }
        }
    }
</script>

<style scoped>

</style>
