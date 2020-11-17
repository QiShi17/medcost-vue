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
    import {OTHER} from '@/value/applyType'
    export default {
        name: "esOther",
        components:{applyDetail},
        data(){
            return{
                applyType:OTHER
            }
        }
    }
</script>

<style scoped>

</style>
