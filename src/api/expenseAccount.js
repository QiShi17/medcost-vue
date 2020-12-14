import request from '@/utils/request'

const expenseAccountUrl = "/expense_account"

export function apply(data) {
    return request({
        url: '/expense_account/create',
        method: 'post',
        data: data
    })
}

export function getExpenseAccountPureById(id) {
    return request({
        url: expenseAccountUrl + '/pure/' + id,
        method: 'get',
    })
}

export function fetchAccountListWithUserInfo(params) {
    return request({
        url: expenseAccountUrl + '/with_user_info/list',
        method: 'get',
        params: params
    })
}

export function fetchAccountList(params) {
    return request({
        url: expenseAccountUrl + '/list',
        method: 'get',
        params: params
    })
}

export function fetchMySubmitAccountList(params) {
    return request({
        url: expenseAccountUrl + '/my_submit/list',
        method: 'get',
        params: params
    })
}

export function fetchMyReviewAccountList(params) {
    return request({
        url: expenseAccountUrl + '/my_review/list',
        method: 'get',
        params: params
    })
}

export function fetchMyDeliverAccountList(params) {
    return request({
        url: expenseAccountUrl + '/my_deliver/list',
        method: 'get',
        params: params
    })
}

export function fetchMyMasterAccountList(params) {
    return request({
        url: expenseAccountUrl + '/my_master/list',
        method: 'get',
        params: params
    })
}

export function deliver(id) {
    return request({
        url: expenseAccountUrl + '/deliver/' + id,
        method: 'post'
    })
}


export function getExpenseAccountDetailById(id) {
    return request({
        url: expenseAccountUrl + '/detail/' + id,
        method: 'get',
    })
}

//修改一个单据的状态，并改变reviewerexpenseaccountrelation中的审核人信息
export function agreeExpenseAccountById(expenseAccountId,data) {
    return request({
        url: expenseAccountUrl + '/agree/'+ expenseAccountId,
        method: 'post',
        data: data
    })
}

//修改一个单据的状态，并添加一条reviewerexpenseaccountrelation中的审核人信息的记录
export function rejectExpenseAccountById(expenseAccountId,data) {
    return request({
        url: expenseAccountUrl + '/reject/'+ expenseAccountId,
        method: 'post',
        data: data
    })
}

export function revokeExpenseAccountById(expenseAccountId,data) {
    return request({
        url: expenseAccountUrl + '/revoke/'+ expenseAccountId,
        method: 'post',
        data: data
    })
}

export function fetchAccount2printById(expenseAccountId) {
    return request({
        url: expenseAccountUrl + '/print/'+ expenseAccountId,
        method: 'get',
    })
}

export function fetchAccountResultStatistic() {
    return request({
        url: expenseAccountUrl + '/statistic',
        method: 'get',
    })
}