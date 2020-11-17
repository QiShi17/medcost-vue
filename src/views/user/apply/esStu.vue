<template>
    <div class="app-container">
        <apply-detail :apply-type="applyType">

        </apply-detail>
    </div>
</template>

<script>
    import applyDetail from "./components/applyDetail";
    import {STU} from '@/value/applyType'


    export default {
        name: "esStu",
        components: {applyDetail},
        data() {
            return {
                applyType: STU
            }
        }
    }
</script>

<style scoped>

</style>
