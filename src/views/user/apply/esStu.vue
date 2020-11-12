<template>
    <div class="app-container">
        <apply-detail  :is-edit="false"  :type="1">

        </apply-detail>
    </div>
</template>

<script>
    import applyDetail from "./components/applyDetail";


    export default {
        name: "esStu",
        components:{applyDetail}
    }
</script>

<style scoped>

</style>
