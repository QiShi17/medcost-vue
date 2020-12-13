import request from "@/utils/request";

export function FetchReviewResultStatisticList(params) {
    return request({
        url: '/reviewer_expense_account_relation/ReviewResultStatistic',
        method: 'get',
        params: params
    })
}
