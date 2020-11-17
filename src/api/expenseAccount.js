import request from '@/utils/request'

const expenseAccountUrl="/expense_account"

export function apply(data) {
    return request({
        url: '/expense_account/create',
        method: 'post',
        data: data
    })
}

export function getExpenseAccountPureById(id) {
    return request({
        url: expenseAccountUrl+'/pure/'+id,
        method: 'get',
    })
}

export function fetchAccountListWithUserInfo(params) {
    return request({
        url: expenseAccountUrl+'/with_user_info/list/',
        method: 'get',
        params:params
    })
}
