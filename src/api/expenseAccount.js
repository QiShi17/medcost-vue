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
        url: expenseAccountUrl+'/with_user_info/list',
        method: 'get',
        params:params
    })
}

export function fetchAccountList(params) {
    return request({
        url: expenseAccountUrl+'/list',
        method: 'get',
        params:params
    })
}

export function fetchMySubmitAccountList(params) {
    return request({
        url: expenseAccountUrl+'/my_submit/list',
        method: 'get',
        params:params
    })
}

export function fetchMyReviewAccountList(params) {
    return request({
        url: expenseAccountUrl+'/my_review/list',
        method: 'get',
        params:params
    })
}

export function fetchMyDeliverAccountList(params) {
    return request({
        url: expenseAccountUrl+'/my_deliver/list',
        method: 'get',
        params:params
    })
}

export function fetchMyMasterAccountList(params) {
            return request({
        url: expenseAccountUrl+'/my_master/list',
        method: 'get',
        params:params
    })
}
