import request from "@/utils/request";

export function deliver(id) {
    return request({
        url: '/reviewer_expense_account_relation/deliver' ,
        method: 'post',
        data: id
    })
}
