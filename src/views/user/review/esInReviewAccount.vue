<template>
    <div>
        <account-list :cur-operations="myOperations" v-bind:my-list="list"
                      v-bind:my-list-loading="listLoading">
        </account-list>
        <div class="pagination-container">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes,prev, pager, next,jumper"
                    :current-page.sync="listQuery.pageNum"
                    :page-size="listQuery.pageSize"
                    :page-sizes="[10,15,20]"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import AccountList from "../../../components/AccountList";
    import {fetchMyReviewAccountList} from '@/api/expenseAccount';
    import {IN_REVIEW} from "../../../value/accountStatus";

    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        status:IN_REVIEW.id
    };
    export default {
        name: "esInReviewAccount",
        components: {AccountList},
        data() {
            return {
                listQuery: Object.assign({}, defaultListQuery),
                myOperations: ["查看详情","同意","拒绝"],
                list: null,
                total: null,
                listLoading: false
            }
        },
        created() {
            this.getMyReviewList()
        },
        methods: {
            getMyReviewList(){
                this.listLoading=true;
                fetchMyReviewAccountList(this.listQuery).then(response=>{
                    this.listLoading = false;
                    this.list = response.data.list;
                    this.total = response.data.total;
                })

            },
            handleSizeChange(val) {
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getList();
            },
        }
    }
</script>

<style scoped>

</style>
