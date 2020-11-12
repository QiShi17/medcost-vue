<template>
    <div>
        <div class="app-container">
            <apply-detail  :is-edit="false"  :type="2">

            </apply-detail>

        </div>
    </div>
</template>

<script>
    import applyDetail from "./components/applyDetail";
    export default {
        name: "esOnduty",
        components:{applyDetail}
    }
</script>

<style scoped>

</style>
